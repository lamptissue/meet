Feature: Specify number of events

    Scenario: When user hasn’t specified a number, 32 is the default number
        Given unspecified amount of events shown
        When user selected a city
        Then maximum of 32 events should be shown

    Scenario: User should see a list of suggestions when they search for a city
        Given events are shown
        When user changed the amount of events shown
        Then required number of events should be shown