Feature: User Management and Data Interaction

Background:
  Given the application is running

@req_1
Scenario: Create a new user account
  Given the user navigates to the registration page
  When the user enters a valid email and password
  And clicks the "Register" button
  Then the system should create a new account
  And display a confirmation message

@req_2
Scenario: Secure login using authentication tokens
  Given the user has a registered account
  When the user navigates to the login page
  And enters valid credentials
  And clicks the "Login" button
  Then the system should authenticate the user
  And provide an authentication token
  And redirect to the dashboard

@req_3
Scenario: View user statistics on dashboard
  Given the user is logged in
  When the user navigates to the dashboard
  Then the dashboard should display key user statistics

@req_4
Scenario: Export data in CSV format
  Given the user is on the dashboard
  When the user clicks the "Export CSV" button
  Then the system should generate a CSV file
  And prompt the user to download the file

@req_5
Scenario: Send notification emails for important user actions
  Given the user performs an important action (e.g., password change)
  When the action is completed
  Then the system should send a notification email to the user