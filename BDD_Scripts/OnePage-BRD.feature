Feature: User Account and Data Management

Background:
  Given the system is up and running

@req_1
Scenario: Create a new user account with email and password
  Given the user navigates to the registration page
  When the user enters a valid email address "user@example.com" and a password "Password123!"
  And the user submits the registration form
  Then the system should create a new account for the user
  And the system should display a success message

@req_2
Scenario: Secure user login using authentication tokens
  Given the user has an existing account with email "user@example.com" and password "Password123!"
  When the user navigates to the login page
  And the user enters the email "user@example.com" and password "Password123!"
  And the user submits the login form
  Then the system should authenticate the user
  And the system should issue an authentication token
  And the system should redirect the user to the dashboard

@req_3
Scenario: Display key user statistics on the dashboard
  Given the user is logged in
  When the user navigates to the dashboard
  Then the system should display user statistics such as "Total Logins", "Data Exports", and "Last Active"

@req_4
Scenario: Export user data in CSV format
  Given the user is logged in
  And the user has data available for export
  When the user clicks the "Export CSV" button
  Then the system should generate a CSV file
  And the system should prompt the user to download the file

@req_5
Scenario: Send notification emails for important user actions
  Given the user performs an important action such as "Password Change"
  When the system processes the action
  Then the system should send a notification email to the user’s registered email address
  And the email should contain a confirmation of the action