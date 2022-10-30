# Meet - App

# App overview
This app provides information for upcoming events in any given city chosen by the user. The user can specify how many events are shown and the app is available both online and offline.

# Technical requirements
- React
- Google API
- Javascript

# Feature 1: 
# Filter Events by City

As a user, I should be able to 'filter events by city' so that I can see the list of events that take place in that city.

## Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.

- **Given** user hasn’t searched for any city
- **When** the user opens the app
- **Then** the user should see a list of all upcoming events

## Scenario 2: User should see a list of suggestions when they search for a city.

- **Given** the main page is open
- **When** user starts typing in the city textbox
- **Then** the user should see a list of cities (suggestions) that match what they’ve typed

## Scenario 3: User can select a city from the suggested list.

- **Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
- **When** the user selects a city (e.g., “Berlin, Germany”) from the list
- **Then** their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

# Feature 2: 
# Show/hide an event's details

As a user, I should be able to show and hide events so that I can see more or less information about an event.

## Scenario 1: An event element is collapsed by default

- **Given** a city has been chosen
- **When** events have loaded
- **Then** the event should show basic details

# Scenario 2: User can expand an event to see its details

- **Given** the user has chosen a city
- **When** the user taps the event
- **Then** the event will expand showing more details

# Scenario 3: User can collapse an event to hide its details

- **Given** the event details have been expanded
- **When** the user taps the event
- **Then** the event will collapse hiding the details

# Feature 3: 
# Specify number of events
 
As a user, I should be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

## Scenario 1: When user hasn’t specified a number, 32 is the default number

- **Given** unspecified amount of events shown
- **When** user selected a city
- **Then** maximum of 32 events should be shown

## Scenario 2: User can change the number of events they want to see

- **Given** events are shown
- **When** user changed the amount of events shown
- **Then** required number of events should be shown

# Feature 4: 
# Use the app when offline

As a user, I should be able to use the app when offline so that I can see the events I viewed the last time I was online.

## Scenario 1: Show cached data when there’s no internet connection

- **Given** the user has been online
- **When** the user has no interent connection
- **Then** previous data should be displayed

## Scenario 2: Show error when user changes the settings (city, time range)

- **Given** user wanted to change settings while offline
- **When** the user has changed the location/time settings
- **Then** an error message should be shown

 # Feature 5: 
 # Data visualization
 
As a user, I should be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

## Scenario 1: Show a chart with the number of upcoming events in each city

- **Given** a city has been chosen
- **When** user wants to see more information
- **Then** a chart showing upcoming events should be displayed


