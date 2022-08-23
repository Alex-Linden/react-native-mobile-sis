# sis-mobile

React-Native Mobile App for Rithm School Student Information System

Makes API calls to Django backend to get cohort data
Requires login by user
![simulator_screenshot_B0DF9886-256E-4518-9D8A-99BB92B30E2C] <img src="https://user-images.githubusercontent.com/728518/186285927-857f20e9-fd80-496f-818f-323e8151c5a7.png" width="100" />

Homepage displays upcoming items for cohort. Items include lectures, exercises, assessments, and events.
![simulator_screenshot_E1EE8C6B-1A67-4E20-B85C-DE903D5E8C1C](https://user-images.githubusercontent.com/728518/186285838-a276f7b8-59a1-4a17-b228-9ebd0cd80eab.png)

User can use tab navigation to display only lectures, exercises, assessments and events.
User can click on an item in a list to view additional information abbout the item.
![simulator_screenshot_E0D4EE63-CA8D-4D7F-90E8-CA1D6A7910EF](https://user-images.githubusercontent.com/728518/186285880-2c7bf028-8825-4707-9b8d-07375ed5910d.png)

User can logout using logout button at top right.

In order to run simulator:
- Must have a dev environment of SIS running (start venv, python3 manage.py runserver)
- Run app using "expo start" command in project folder
