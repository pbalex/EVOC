import keyboard
import time
import boto3
import json
import threading
import ctypes
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.popup import Popup
from kivy.config import Config
from kivy.core.window import Window



def send_input(command):
	# keyboard.press_and_release('alt+tab')
	keyboard.press(command)
	time.sleep(.05)
	keyboard.release(command)
	# keyboard.press_and_release('alt+tab')

#REFERENCE INSTANCE
def reference_callback(instance):
	popup = Popup(title='Reference',
		content=Label(text='Open a new tab: "Ask EVOC open tab"\n' +
		'Close current tab: "Ask EVOC close tab"\n' + 
		'Close all tabs: "Ask EVOC close all tabs"\n' +
		'Close Word doc: "Ask EVOC close doc"\n' +
		'Open a new window: "Ask EVOC new window"\n' +
		'Open reference card: "Ask EVOC open reference"\n'+
		'Close current window: "Ask EVOC close window"\n' +
		'Reopen last closed tab: "Ask EVOC open closed tab"\n' + 
		'Go to search bar: "Ask EVOC go to search bar"\n' +
		'Print page: "Ask EVOC print page"\n' + 
		'Zoom in/out: "Ask EVOC zoom in/out"\n' + 
		'Refresh page: "Ask EVOC refresh"\n' + 
		'Fullscreen mode: "Ask EVOC fullscreen"\n' +
		'Toggle bookmarks bar: "Ask EVOC toggle bookmarks"\n'),
	size_hint=(None, None), size=(400, 400))
	popup.open()

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

def reference_callback():
	##TODO
	print('Add reference implementation')

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

def select_callback():
	send_input('esc')
	time.sleep(.05)
	send_input('enter')


def query_db():
	dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
	table = dynamodb.Table('TEST')

	print(table.key_schema)
	counter = 1
	while 1:
		response = table.query(
			Limit=1,
			ScanIndexForward=False,
			KeyConditionExpression=Key('NUM').eq(1)
		)

		for i in response['Items']:
			print(i['COMMAND'])
			if (i['TIMESTAMP'] > counter):
				if (i['COMMAND'] == "OPEN TAB"):
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
					reference_callback()
				table.delete_item(
					Key={ 'NUM':1,
						'TIMESTAMP':i['TIMESTAMP']	}
				)
			print(i)
			counter = i['TIMESTAMP']
			#Add Deleting here


		time.sleep(0.25)


class MyApp(App):

	def build(self):
		user32 = ctypes.windll.user32
		Window.size = (100,100)
		Window.left = user32.GetSystemMetrics(0) - Window.width
		Window.top = 0
		l = Label(text="listening...", font_size=18)
		query_db()
		return l

	# def on_start(self):

if __name__ == '__main__':
	MyApp().run()
