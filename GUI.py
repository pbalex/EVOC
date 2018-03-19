import keyboard
import time
import boto3
import json
import threading
import ctypes
import sys
import multiprocessing
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.popup import Popup
from kivy.config import Config
# from kivy.core.window import Window
import kivy

class ReferenceCard(App):

	def build(self):
		layout = GridLayout(cols=3)
		kivy.core.window.Window.size = (1800, 1000)
		kivy.core.window.Window.top = 0
		kivy.core.window.Window.left = 0
		#kivy.core.window.Window.toggle_fullscreen()

		layout.add_widget(Label(text='Command', size_hint_x=None, width = 300, font_size='24sp', bold = True))
		layout.add_widget(Label(text='Description', size_hint_x=None, width = 500, font_size='24sp', bold = True))
		layout.add_widget(Label(text='Phrases (begin with “Echo, ask EVOC”)', font_size='24sp', bold = True))

		layout.add_widget(Button(text='Close all tabs', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Closes all tabs in current window', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='”Close all”,  “close all tabs”', font_size='24sp'))

		layout.add_widget(Button(text='Close tab', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Closes current browser tab', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='”Close tab”', font_size='24sp'))

		layout.add_widget(Button(text='Close window', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Closes current window', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='”Close window”', font_size='24sp'))

		layout.add_widget(Button(text='Enter', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Presses enter', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='”Enter”', font_size='24sp'))

		layout.add_widget(Button(text='Select', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Selects current link', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='”Select”', font_size='24sp'))

		layout.add_widget(Button(text='Find', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Opens find window', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='”Find”,  “Control F”', font_size='24sp'))

		layout.add_widget(Button(text='Fullscreen', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Makes current window fullscreen', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='”Fullscreen”,  “Show fullscreen”', font_size='24sp'))

		layout.add_widget(Button(text='Open New Window', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Opens a new window in browser', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“open new window”, “new window”', font_size='24sp'))

		layout.add_widget(Button(text='Open Reference Card', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Opens the reference card', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“open reference card”, “Open reference”, “Open card”, “Open help card”, “help”', font_size='24sp'))

		layout.add_widget(Button(text='Open Tab', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Opens a new tab in browser', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Open tab”, “Open new tab”, “New tab”', font_size='24sp'))

		# layout.add_widget(Button(text='Open Web Browser', size_hint_x=None, width = 300, font_size='24sp'))
		# layout.add_widget(Button(text='Opens a web browser (Chrome)', size_hint_x=None, width = 500, font_size='24sp'))
		# layout.add_widget(Button(text='“open chrome”, “open internet”, “open internet browser”, “open Google”', font_size='24sp'))

		layout.add_widget(Button(text='Print', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Open print window for current document', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Print”, “Print page”, “Print document”, “Print doc”', font_size='24sp'))

		# layout.add_widget(Button(text='Redo', size_hint_x=None, width = 300, font_size='24sp'))
		# layout.add_widget(Button(text='Redoes previous action', size_hint_x=None, width = 500, font_size='24sp'))
		# layout.add_widget(Button(text='“Redo”', font_size='24sp'))

		layout.add_widget(Button(text='Refresh', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Refreshes current page', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Refresh”, “Refresh page”, “Refresh tab”', font_size='24sp'))

		layout.add_widget(Button(text='Reopen tab', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Reopens the most recent closed tab', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Reopen”, “Reopen closed tab”, “Reopen tab”, “Reopen last tab”, “Reopen last”', font_size='24sp'))

		# layout.add_widget(Button(text='Save', size_hint_x=None, width = 300, font_size='24sp'))
		# layout.add_widget(Button(text='Saves current document', size_hint_x=None, width = 500, font_size='24sp'))
		# layout.add_widget(Button(text='Save”, “Save doc”, “Save word doc”, “Save word document”, “Save document”, “Save page”', font_size='24sp'))

		layout.add_widget(Button(text='Scroll Down', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Scrolls page down', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Scroll down”, “down”', font_size='24sp'))

		layout.add_widget(Button(text='Scroll Up', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Scrolls page up', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Scroll up”, “Up”', font_size='24sp'))

		layout.add_widget(Button(text='Search', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Jumps to address bar in browser', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Search”, “Type url”, “Search google”, “Jump to address bar”', font_size='24sp'))

		# layout.add_widget(Button(text='Switch Applications', size_hint_x=None, width = 300, font_size='24sp'))
		# layout.add_widget(Button(text='TODO', size_hint_x=None, width = 500, font_size='24sp'))
		# layout.add_widget(Button(text='“Control tab”, “Search other applications”, “Search other apps”, “Search apps”, “Switch apps”, “Switch applications” ', font_size='24sp'))

		layout.add_widget(Button(text='Show Bookmarks', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Opens saved bookmarks', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Show bookmarks”, “Bookmarks”', font_size='24sp'))

		layout.add_widget(Button(text='Tab', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Tabs', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Press tab”, “Tab”', font_size='24sp'))

		# layout.add_widget(Button(text='Undo', size_hint_x=None, width = 300, font_size='24sp'))
		# layout.add_widget(Button(text='Undoes previous action', size_hint_x=None, width = 500, font_size='24sp'))
		# layout.add_widget(Button(text='“Undo”', font_size='24sp'))

		layout.add_widget(Button(text='Zoom In', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Zooms screen in', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Zoom in”, “Bigger”, “Zoom”', font_size='24sp'))

		layout.add_widget(Button(text='Zoom Out', size_hint_x=None, width = 300, font_size='24sp'))
		layout.add_widget(Button(text='Zooms screen out', size_hint_x=None, width = 500, font_size='24sp'))
		layout.add_widget(Button(text='“Zoom out”, “Smaller”', font_size='24sp'))
		return layout

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
					threading.Thread(target = run_app,daemon = True).start()
					# ref_thread.daemon = True
					# ref_thread.start()
				# elif (i['COMMAND'] == "CLOSE REFERENCE"):
				#  	# x = get_running_app()
				#  	kivy.core.window.Window.hide()
				delete_one_from_table(i['TIMESTAMP'])
			counter = i['TIMESTAMP']

		time.sleep(0.25)

query_db()


