import keyboard
import time
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.popup import Popup

def send_input(command):
	keyboard.press_and_release('alt+tab')
	time.sleep(.25)
	keyboard.press(command)
	time.sleep(.05)
	keyboard.release(command)
	keyboard.press_and_release('alt+tab')

#REFERENCE INSTANCE
def reference_callback(instance):
		popup = Popup(title='Reference',
			content=TextInput(text='Open a new tab: "Ask EVOC open tab"\n' +
			'Close current tab: "Ask EVOC close tab"\n' + 
			'Open a new window: "Ask EVOC new window"\n' +
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
def new_tab_callback(instance):
	send_input('ctrl+t')

def close_tab_callback(instance):
	send_input('ctrl+w')
	
def new_window_callback(instance):
	send_input('ctrl+n')

def reopen_closed_tab_callback(instance):
	send_input('ctrl+shift+t')

def close_window_callback(instance):
	send_input('ctrl+shift+w')
	
def address_bar_callback(instance):
	send_input('ctrl+l')
	
def print_page_callback(instance):
	send_input('ctrl+p')
	
#VIEW HEADER INSTANCES
def zoom_in_callback(instance):
	send_input('ctrl+plus')

def zoom_out_tab_callback(instance):
	send_input('ctrl+minus')

def refresh_callback(instance):
	send_input('ctrl+r')
	
def full_screen_callback(instance):
	send_input('F11')
	
def show_bookmarks_callback(instance):
	send_input('ctrl+shift+b')

class Menu(GridLayout):

	def __init__(self, **kwargs):
		super(Menu, self).__init__(**kwargs)
		self.cols = 2
		
		#FILE HEADER BUTTONS
		btn1 = Button(text='Open a new tab')
		btn1.bind(on_press=new_tab_callback)
		self.add_widget(btn1)

		btn2 = Button(text='Close current tab')
		btn2.bind(on_press=close_tab_callback)
		self.add_widget(btn2)
		
		btn3 = Button(text='Open new window')
		btn3.bind(on_press=new_window_callback)
		self.add_widget(btn3)
		
		btn4 = Button(text='Reopen closed tab')
		btn4.bind(on_press=reopen_closed_tab_callback)
		self.add_widget(btn4)
		
		btn5 = Button(text='Close current window')
		btn5.bind(on_press=close_window_callback)
		self.add_widget(btn5)
		
		btn6 = Button(text='Go to address bar')
		btn6.bind(on_press=address_bar_callback)
		self.add_widget(btn6)
		
		btn7 = Button(text='Print current page')
		btn7.bind(on_press=print_page_callback)
		self.add_widget(btn7)
		
		#VIEW HEADER BUTTONS
		btn8 = Button(text='Zoom in')
		btn8.bind(on_press=zoom_in_callback)
		self.add_widget(btn8)
		
		btn9 = Button(text='Zoom out')
		btn9.bind(on_press=zoom_out_callback)
		self.add_widget(btn9)
		
		btn10 = Button(text='Refresh page')
		btn10.bind(on_press=refresh_callback)
		self.add_widget(btn10)
		
		btn11 = Button(text='Full screen')
		btn11.bind(on_press=full_screen_callback)
		self.add_widget(btn11)
		
		btn12 = Button(text='Show/hide bookmarks')
		btn12.bind(on_press=show_bookmarks_callback)
		self.add_widget(btn12)

		#REFERENCE BUTTON
		btn_reference = Button(text='Reference')
		btn_reference.bind(on_press=reference_callback)
		self.add_widget(btn_reference)


class MyApp(App):

    def build(self):
        return Menu()




if __name__ == '__main__':
    MyApp().run()

