Feature: User Account Management and Data Export

Background:
  Given the application is running

@req_1
Scenario: User creates an account with email and password
  Given the user is on the registration page
  When the user enters a valid email address
  And the user enters a valid password
  And the user clicks the register button
  Then the system should create the account
  And the user should see a confirmation message

@req_2
Scenario: User logs in securely using authentication tokens
  Given the user has an existing account
  When the user enters a valid email address
  And the user enters the correct password
  And the user clicks the login button
  Then the system should generate an authentication token
  And the user should be redirected to the dashboard

@req_3
Scenario: User accesses dashboard displaying key statistics
  Given the user is logged in
  When the user navigates to the dashboard
  Then the dashboard should display key user statistics

@req_4
Scenario: User exports data in CSV format
  Given the user is on the dashboard
  When the user clicks the export data button
  Then a CSV file should be downloaded
  And the CSV should contain the exported data

@req_5
Scenario: System sends notification email for important actions
  Given the user performs an important action
  When the action is completed
  Then the system should send a notification email to the user