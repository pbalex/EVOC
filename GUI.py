import keyboard
import time
import boto3
import json
import threading
import ctypes
import sys
import subprocess
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError


def send_input(command):
	# keyboard.press_and_release('alt+tab')
	keyboard.press(command)
	time.sleep(.05)
	keyboard.release(command)
	# keyboard.press_and_release('alt+tab')

#FILE HEADER INSTANCES
def new_tab_callback():
	send_input('ctrl+t')

def close_tab_callback():
	send_input('ctrl+w')
	
def new_window_callback():
	send_input('ctrl+n')

def reopen_closed_tab_callback():
	send_input('ctrl+shift+t')

def close_window_callback():
	send_input('ctrl+shift+w')
	
def address_bar_callback():
	send_input('ctrl+l')
	
def print_page_callback():
	send_input('ctrl+p')

def scroll_down_callback():
	send_input('page down')

def scroll_up_callback():
	send_input('page up')

def zoom_in_callback():
	send_input('ctrl+plus')

def zoom_out_callback():
	send_input('ctrl+minus')

def refresh_callback():
	send_input('ctrl+r')
	
def full_screen_callback():
	send_input('F11')
	
def show_bookmarks_callback():
	send_input('ctrl+shift+b')

#FIND UTILITY
def tab_callback():
	send_input('tab')

def find_callback():
	send_input('ctrl+f')

def enter_callback():
	send_input('enter')

def escape_callback():
	send_input('esc')

def undo_callback():
	send_input('ctrl+z')

def select_callback():
	send_input('esc')
	time.sleep(.05)
	send_input('enter')

def run_app():
	print("running reference card")
	app = ReferenceCard()
	app.run()

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
	table = dynamodb.Table('TEST')

	has_been_started = False
	print(table.key_schema)
	counter = 0

	ref_thread = threading.Thread(target = run_app)

	while 1:
		response = table.query(
			Limit=1,
			ScanIndexForward=False,
			KeyConditionExpression=Key('NUM').eq(1)
		)
		for i in response['Items']:
			print(i['COMMAND'])
			if (i['TIMESTAMP'] > counter):
				if (i['COMMAND'] == "EXIT"):
					delete_one_from_table(i['TIMESTAMP'])
					sys.exit(0)
				elif (i['COMMAND'] == "OPEN TAB"):
					new_tab_callback()
				elif (i['COMMAND'] == "CLOSE TAB"):
					close_tab_callback()
				elif (i['COMMAND'] == "OPEN NEW WINDOW"):
					new_window_callback()
				elif (i['COMMAND'] == "CLOSE ALL TABS"):
					close_window_callback()
				elif (i['COMMAND'] == "REOPEN CLOSED TAB"):
					reopen_closed_tab_callback()
				elif (i['COMMAND'] == "JUMP TO ADDRESS BAR"):
					address_bar_callback()
				elif (i['COMMAND'] == "PRINT PAGE"):
					print_page_callback()
				elif (i['COMMAND'] == "SCROLL DOWN"):
					scroll_down_callback()
				elif (i['COMMAND'] == "SCROLL UP"):
					scroll_up_callback()
				elif (i['COMMAND'] == "TAB"):
					tab_callback()
				elif (i['COMMAND'] == "CONTROL FIND"):
					find_callback()
				elif (i['COMMAND'] == "ENTER"):
					enter_callback()
				elif (i['COMMAND'] == "SELECT"):
					select_callback()
				elif (i['COMMAND'] == "UNDO"):
					undo_callback()
				elif (i['COMMAND'] == "ESCAPE"):
					escape_callback()
				elif (i['COMMAND'] == "ZOOM IN"):
					zoom_in_callback()
				elif (i['COMMAND'] == "ZOOM OUT"):
					zoom_out_callback()
				elif (i['COMMAND'] == "REOPEN CLOSED TAB"):
					reopen_closed_tab_callback()
				elif (i['COMMAND'] == "REFRESH"):
					refresh_callback()
				elif (i['COMMAND'] == "FULLSCREEN"):
					full_screen_callback()
				elif (i['COMMAND'] == "SHOW BOOKMARKS"):
					show_bookmarks_callback()
				elif (i['COMMAND'] == "OPEN REFERENCE"):
					subprocess.run("python run_gui.py")
				delete_one_from_table(i['TIMESTAMP'])
			counter = i['TIMESTAMP']

		time.sleep(0.25)

query_db()


