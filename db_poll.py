import keyboard
import time
import boto3
import json
import threading
import ctypes
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

import win32gui


def send_input(command):
	# keyboard.press_and_release('alt+tab')
	keyboard.press(command)
	time.sleep(.05)
	keyboard.release(command)
	# keyboard.press_and_release('alt+tab')

#SPECIAL CASE CALLBACK FUNCTIONS

def select_callback():
	send_input('esc')
	time.sleep(.05)
	send_input('enter')


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
					subprocess.run("python run_gui.py")
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