import keyboard
import time
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button


def send_input(command):
	keyboard.press_and_release('alt+tab')
	time.sleep(.25)
	keyboard.press(command)
	time.sleep(.05)
	keyboard.release(command)
	keyboard.press_and_release('alt+tab')

def new_tab_callback(instance):
	send_input('ctrl+t')

def close_tab_callback(instance):
	send_input('ctrl+w')

class Menu(GridLayout):

	def __init__(self, **kwargs):
		super(Menu, self).__init__(**kwargs)
		self.cols = 2
		btn1 = Button(text='Open a new Tab')
		btn1.bind(on_press=new_tab_callback)
		self.add_widget(btn1)
		btn2 = Button(text='Close Current Tab')
		btn2.bind(on_press=close_tab_callback)
		self.add_widget(btn2)

		btn_reference = Button(text='Reference card')	


class MyApp(App):

    def build(self):
        return Menu()




if __name__ == '__main__':
    MyApp().run()














#keyboard.write('The quick brown fox jumps over the lazy dog.')

# Press PAGE UP then PAGE DOWN to type "foobar".
#keyboard.add_hotkey('page up, page down', lambda: keyboard.write('foobar'))

