Feature: User Management, Dashboard, Data Export and Notification Features

Background:
  Given the system is available

@REQ-1
Scenario: User can create an account with email and password
  Given the user navigates to the registration page
  When the user enters a valid email "newuser@example.com" and password "StrongPass1!"
  And the user submits the registration form
  Then the system creates a new user account
  And the system displays a confirmation message

@REQ-2
Scenario: User can log in securely using authentication tokens
  Given the user has registered with email "newuser@example.com" and password "StrongPass1!"
  When the user navigates to the login page
  And the user enters the email and password
  And the user submits the login form
  Then the system authenticates the user
  And the system issues an authentication token
  And the token is stored securely in the client

@REQ-3
Scenario: User can view dashboard with key statistics
  Given the user is logged in
  When the user navigates to the dashboard
  Then the dashboard displays key user statistics
  And the statistics include "Total Logins", "Data Exported", "Last Activity"

@REQ-4
Scenario: User can export data in CSV format
  Given the user is on the dashboard
  When the user clicks the "Export CSV" button
  Then the system generates a CSV file
  And the file contains the user's data
  And the file is downloadable

@REQ-5
Scenario: System sends notification emails for important user actions
  Given the user has performed an important action (e.g., exported data)
  When the system processes the action
  Then the system sends an email notification to the user
  And the email contains a subject "Action Completed"
  And the email body includes details of the action