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

def reference_callback(instance):
		popup = Popup(title='Test popup',
		content=Label(text='Hello world'),
		size_hint=(None, None), size=(400, 400))
		popup.open()

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

class Menu(GridLayout):

	def __init__(self, **kwargs):
		super(Menu, self).__init__(**kwargs)
		self.cols = 2
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

		btn_reference = Button(text='Reference')
		btn_reference.bind(on_press=reference_callback)
		self.add_widget(btn_reference)


class MyApp(App):

    def build(self):
        return Menu()




if __name__ == '__main__':
    MyApp().run()




#keyboard.write('The quick brown fox jumps over the lazy dog.')

# Press PAGE UP then PAGE DOWN to type "foobar".
#keyboard.add_hotkey('page up, page down', lambda: keyboard.write('foobar'))

