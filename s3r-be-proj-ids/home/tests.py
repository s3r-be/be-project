from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import os
import subprocess
import time
import random

# setting path for geckodriver (firefox driver for selenium)
CUR_DIR = os.path.dirname(os.path.abspath(__file__))
os.environ["PATH"] += os.pathsep + os.path.join(CUR_DIR, 'geckodriver')
# adding geckodriver to /usr/bin if not present
subprocess.call([os.path.join(CUR_DIR, 'addGeckoToUsrBin.sh')])
print('.')


class IDSTestCase(LiveServerTestCase):

    login_credentials = {}

    # set up code for every test
    def setUp(self):
        print('.\nstarting test.')
        # creating selenium test object
        self.selenium = webdriver.Firefox()
        super(IDSTestCase, self).setUp()
        self.vars = {}
        self.open_browser()

    # tear down code for every test
    def tearDown(self):
        self.selenium.quit()
        print('ending test.')
        super(IDSTestCase, self).tearDown()

    def wait_for_window(self, timeout=2):
        time.sleep(round(timeout / 1000))
        wh_now = self.selenium.window_handles
        wh_then = self.vars["window_handles"]
        if len(wh_now) > len(wh_then):
            return set(wh_now).difference(set(wh_then)).pop()

    # function to open browser, maximise it and connect to ids website
    def open_browser(self):
        selenium = self.selenium
        print('maximising browser window.')
        selenium.maximize_window()
        print('opening browser to url - http://127.0.0.1:8000.')
        selenium.get('http://127.0.0.1:8000')
        # check if page is loaded
        delay = 5  # seconds
        try:
            myElem = WebDriverWait(selenium, delay).until(
                EC.presence_of_element_located((By.ID, 'menu_item_home')))
            # print "Page is ready!"
        except TimeoutException:
            print("Loading took too much time!")

    def get_random_string(self, userOrPass='pass'):
        length = 16
        random_string = ''
        alphabets = 'abcdefghijklmnopqrstuvwxyz'
        cap_alpha = alphabets.upper()
        numbers = '1234567890'
        sp_chars = '`~!#$%^&*()<>?:"-=+_'
        for i in range(length // 4):
            random_string += alphabets[random.randint(0, len(alphabets) - 1)] + cap_alpha[random.randint(
                0, len(cap_alpha) - 1)] + numbers[random.randint(0, len(numbers) - 1)]
            if (userOrPass == 'pass'):
                random_string += sp_chars[random.randint(0, len(sp_chars) - 1)]
            else:
                pass
        random.shuffle(list(random_string))
        return str(random_string)

    def test_0_home_page(self):
        selenium = self.selenium
        print('testing home page.')
        print('moved to signup page.')
        selenium.find_element(By.ID, "menu_item_signup").click()
        print('moved to login page.')
        selenium.find_element(By.ID, "menu_item_login").click()
        print('moved to home page.')
        selenium.find_element(By.ID, "menu_item_home").click()
        assert ("intrusion" in selenium.page_source)

    def test_1_signup(self):
        selenium = self.selenium
        self.login_credentials = {
            'user': self.get_random_string('user'),
            'email': self.get_random_string('user') + "@" + self.get_random_string('user') + ".com",
            'password': self.get_random_string()
        }
        print('signing up using credentials: ' + str(self.login_credentials))
        selenium.find_element(By.ID, "menu_item_home").click()
        selenium.find_element(By.ID, "menu_item_signup").click()
        selenium.find_element(By.NAME, "username").click()
        selenium.find_element(By.NAME, "username").send_keys(
            self.login_credentials['user'])
        selenium.find_element(By.NAME, "email").click()
        selenium.find_element(By.NAME, "email").send_keys(
            self.login_credentials['email'])
        selenium.find_element(By.NAME, "password1").send_keys(
            self.login_credentials['password'])
        selenium.find_element(By.NAME, "password2").send_keys(
            self.login_credentials['password'])
        selenium.find_element(By.ID, "signup_button").click()
        # check if page is loaded
        delay = 10  # seconds
        try:
            myElem = WebDriverWait(selenium, delay).until(
                EC.presence_of_element_located((By.ID, 'menu_item_logout')))
            # print "Page is ready!"
        except TimeoutException:
            print("Loading took too much time!")
        selenium.find_element(By.ID, "menu_item_logout").click()
