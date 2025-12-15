Feature: User Account and Data Management

  @req_1
  Scenario: User creates an account using email and password
    Given a unique email address "user@example.com"
    When the user submits the registration form with email "user@example.com" and password "Password123"
    Then the system should create a new account
    And the user should receive a confirmation email

  @req_2
  Scenario: User logs in securely using authentication tokens
    Given a user account exists with email "user@example.com" and password "Password123"
    When the user submits login credentials with email "user@example.com" and password "Password123"
    Then the system should return an authentication token
    And the user should be redirected to the dashboard

  @req_3
  Scenario: Dashboard displays key user statistics
    Given a logged-in user with a valid authentication token
    When the user navigates to the dashboard
    Then the dashboard should display user statistics such as "Total Logins", "Data Exported", and "Notifications Received"

  @req_4
  Scenario: User exports data in CSV format
    Given a logged-in user with a valid authentication token
    When the user requests to export data
    Then the system should generate a CSV file
    And the CSV file should be downloadable

  @req_5
  Scenario: Notification emails are sent for important user actions
    Given a user performs an important action (e.g., data export)
    When the action is completed
    Then the system should send a notification email to the user's registered email address