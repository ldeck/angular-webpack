Feature: Visiting the home page
  As a user
  I should be able to visit the homepage
  to reap the benefits of angularjs!

  Scenario: See the homepage
    Given I go on "index.html"
    Then the title should equal "BDD AngularJS App"
    And there should be a favicon
