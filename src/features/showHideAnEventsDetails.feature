Feature: Show/hide an event's details

    Scenario: An event element is collapsed by default
        Given a city has been chosen
        When events have loaded
        Then the event should show basic details

    Scenario: User can expand an event to see its details
        Given the user has chosen a city
        When the user taps the event
        Then the event will expand showing more details

    Scenario: User can collapse an event to hide its details
        Given the event details have been expanded
        When the user taps the event
        Then the event will collapse hiding the details