Feature: User Account Management and Data Interaction

Background:
  Given the system is available

Scenario: Create a new user account
  @req_1
  Given a user navigates to the registration page
  When the user submits an email "newuser@example.com" and password "SecurePass!"
  Then the account should be created successfully
  And the user should receive a confirmation message

Scenario: Secure user login with authentication token
  @req_2
  Given a registered user with email "newuser@example.com" and password "SecurePass!"
  When the user logs in
  Then the system should return a valid authentication token
  And the user should be redirected to the dashboard

Scenario: View user statistics dashboard
  @req_3
  Given a logged-in user
  When the user navigates to the dashboard
  Then the dashboard should display key user statistics such as total logins, last login date, and activity summary

Scenario: Export user data to CSV
  @req_4
  Given a logged-in user
  When the user requests to export data
  Then the system should generate a CSV file
  And the CSV file should contain the user's data records

Scenario: Receive notification email on important action
  @req_5
  Given a logged-in user performs an important action (e.g., password change)
  When the action is completed
  Then the system should send a notification email to the user's registered email address
  And the email should contain the action details and a confirmation message