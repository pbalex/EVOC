import keyboard
import time
import boto3
import win32gui
import webbrowser
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
	time.sleep(0.2)
	select_callback()

def find_callback(term):
	send_input('ctrl+f')
	time.sleep(.05)
	keyboard.write(term)

def search_callback(term):
	send_input('ctrl+l')
	time.sleep(.05)
	send_input('delete')
	time.sleep(.05)
	keyboard.write(term)
	send_input('enter')


def select_callback():
	send_input('esc')
	time.sleep(.05)
	send_input('enter')

def open_bookmarks_callback():
	send_input('ctrl+shift+o')
	time.sleep(.5)
	send_input('tab')
	send_input('tab')
	send_input('tab')

def type_callback(term):
	keyboard.write(term)

def save_as_callback(term):
	print (term)
	send_input('f12')
	time.sleep(1)
	keyboard.write(term)
	time.sleep(0.05)
	send_input('enter')

def scroll_right_callback():
	for i in range(0,10):
		keyboard.press_and_release("right")
		time.sleep(0.1)
	

def scroll_left_callback():
	for i in range(0,10):
		keyboard.press_and_release("left")
		time.sleep(0.1)



def switch_to_window(switch):
	switch = switch.lower()
	if (switch == "reference card" or switch == "reference"):
		webbrowser.open_new_tab('EVOCreferencecard.html')
		return
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
			win32gui.SetWindowPos(window,HWND_NOTOPMOST,0,0,0,0, SWP_NOMOVE | SWP_NOSIZE)
			win32gui.SetWindowPos(window,HWND_TOPMOST,0,0,0,0,SWP_NOMOVE | SWP_NOSIZE)
			win32gui.SetWindowPos(window,HWND_NOTOPMOST,0,0,0,0,SWP_SHOWWINDOW | SWP_NOMOVE | SWP_NOSIZE)
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

def delete_all_items(table_name):
    # Deletes all items from a DynamoDB table.
    client = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)
    response = client.describe_table(TableName=table_name)
    keys = [k['AttributeName'] for k in response['Table']['KeySchema']]
    response = table.scan()
    items = response['Items']
    number_of_items = len(items)
    if number_of_items == 0:  # no items to delete
        print("Table '{}' is empty.".format(table_name))
        return
    with table.batch_writer() as batch:
        for item in items:
            key_dict = {k: item[k] for k in keys}
            print("Deleting " + str(item) + "...")
            batch.delete_item(Key=key_dict)


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
					webbrowser.open_new_tab('EVOCreferencecard.html')
					# subprocess.run("python run_gui.py", shell=False)
				elif (i['COMMAND'] == "SWITCH TO"):
					switch_to_window(i['CUSTOM'])
				elif (i['COMMAND'] == "CONTROL FIND"):
					find_callback(i['CUSTOM'])
				elif (i['COMMAND'] == "SEARCH"):
					search_callback(i['CUSTOM'])
				elif (i['COMMAND'] == "GOTO"):
					goto_callback(i['CUSTOM'])
				elif (i['COMMAND'] == "OPEN BOOKMARKS"):
					open_bookmarks_callback()
				elif (i['COMMAND'] == "TYPE"):
					type_callback(i['CUSTOM'])
				elif (i['COMMAND'] == "SAVE AS"):
					save_as_callback(i['CUSTOM'])
				elif (i['COMMAND'] == "SCROLL RIGHT"):
					scroll_right_callback()
				elif (i['COMMAND'] == "SCROLL LEFT"):
					scroll_left_callback()
				#all other basic commands
				else:
					#looking up command shortcut
					shortcuts = dynamodb.Table('Commands').query(
						KeyConditionExpression=Key('NAME').eq(i['COMMAND'])
					)
					print (shortcuts['Items'])
					input_keys = shortcuts['Items'][0]['CMD_KEYS']
					send_input(input_keys)
				delete_one_from_table(i['TIMESTAMP'])
			counter = i['TIMESTAMP']

		time.sleep(.25)


delete_all_items("TEST")
query_db()