import keyboard
import time
import boto3
import json
import threading
import ctypes
import sys
import subprocess
import win32gui
from win32con import SW_SHOW, SW_HIDE, HWND_NOTOPMOST, HWND_TOPMOST, SWP_NOMOVE, SWP_NOSIZE, SWP_SHOWWINDOW
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError



def send_input(command):
	# keyboard.press_and_release('alt+tab')
	keyboard.press(command)
	time.sleep(.05)
	keyboard.release(command)
	# keyboard.press_and_release('alt+tab')

#SPECIAL CASE CALLBACK FUNCTIONS

def goto_callback(term):
	find_callback(term)
	select_callback()

def find_callback(term):
	send_input('ctrl+f')
	time.sleep(.05)
	keyboard.write(term)

def search_callback(term):
	send_input('ctrl+t')
	time.sleep(.05)
	keyboard.write(term)
	send_input('enter')


def select_callback():
	send_input('esc')
	time.sleep(.05)
	send_input('enter')

def switch_to_window(switch):
	switch = switch.lower()
	if (switch == "reference card" or switch == "reference"):
		switch = "referencecard"
	#Generates list of the hwnd of all 'real' windows.
	def call(hwnd, param):
		"""
		The callback function to be used by EnumWindows.
		Appends all hwnds to param list
		"""
		param.append(hwnd)

	winds = []
	win32gui.EnumWindows(call, winds)

	for window in winds:
		print (win32gui.GetWindowText(window))
		if switch in win32gui.GetWindowText(window).lower():
			print ("found window")
			win32gui.ShowWindow(window, SW_SHOW)
			win32gui.BringWindowToTop(window)
			send_input("alt")
			win32gui.SetForegroundWindow(window)
			break

#DynamoDB utility
def delete_one_from_table(timestamp):
	dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
	table = dynamodb.Table('TEST')
	table.delete_item(
		Key={ 
			'NUM':1,
			'TIMESTAMP':timestamp
		}
	)
def query_db():
	dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
	request_table = dynamodb.Table('TEST')

	print(request_table.key_schema)
	counter = 1
	while 1:
		response = request_table.query(
			Limit=1,
			ScanIndexForward=False,
			KeyConditionExpression=Key('NUM').eq(1)
		)
		for i in response['Items']:
			print(i['COMMAND'])
			if (i['TIMESTAMP'] > counter):
				#special commands not in database (e.g. find feature, reference card)
				if (i['COMMAND'] == "SELECT"):
					select_callback()
				elif (i['COMMAND'] == "OPEN REFERENCE"):
					subprocess.run("python run_gui.py", shell=False)
				elif (i['COMMAND'] == "SWITCH TO"):
					switch_to_window(i['CUSTOM'])
				elif (i['COMMAND'] == "CONTROL FIND"):
					find_callback(i['CUSTOM'])
				elif (i['COMMAND'] == "SEARCH"):
					search_callback(i['CUSTOM'])
				elif (i['COMMAND'] == "GOTO"):
					goto_callback(i['CUSTOM'])
				#all other basic commands
				else:
					try:
						#looking up command shortcut
						shortcuts = dynamodb.Table('Commands').query(
							KeyConditionExpression=Key('NAME').eq(i['COMMAND'])
						)
						print (shortcuts['Items'])
					except ClientError as e:
						print("Invalid Command")
					else:
						input_keys = shortcuts['Items'][0]['CMD_KEYS']
						send_input(input_keys)
				delete_one_from_table(i['TIMESTAMP'])
			counter = i['TIMESTAMP']

		time.sleep(.25)



query_db()