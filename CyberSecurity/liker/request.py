import click
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
   


def request():

    ###browser setting

    options=webdriver.FirefoxOptions()
    options.headless=False

    #json file
    with open("acc.json","r") as acc:
        data=json.load(acc)

    #file open for every acc
    for i in data['acc']:

        usr=i["email"]
        pass_=i["pass"]
    
        browser = webdriver.Firefox(options=options)

        browser.get('http://facebook.com/')
        
        time.sleep(3)
        browser.find_element(By.ID,'email').send_keys(usr)
        browser.find_element(By.ID,'pass').send_keys(pass_)
        btn=browser.find_element(By.CSS_SELECTOR,'button').click()
        time.sleep(3)
        print(f"${i['id']} log in...")
        
        browser.quit()

request()