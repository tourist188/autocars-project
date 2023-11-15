import pyautogui 
import time
pyautogui.FAILSAFE = False
while True:
    time.sleep(30)
    #for i in range(0, 100):
        #pyautogui.moveTo(200, i * 5)
    for i in range(0,10):
        pyautogui.press('shift')
