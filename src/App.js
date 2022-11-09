import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import "./nprogress.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberEvents: 32,
    numberEventsFilter: [],
  };

  // load events when the app loads
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
          numberEventsFilter: events.slice(0, 32),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = events.filter(
        (event) => event.location === location
      );
      this.setState({
        events: eventCount ? events : locationEvents,
        numberEventsFilter:
          this.state.numberEvents === 0
            ? events.slice(0, 32)
            : events.slice(0, this.state.numberEvents),
      });
    });
  };

  updateEventNum = (num) => {
    //  Add an if statement to update state based on location or number here
    if (num > 0) {
      this.setState({
        eventsToShow: num,
        numberEventsFilter:
          this.state.numberEvents === 0
            ? this.state.events.slice(0, 32)
            : this.state.events.slice(0, num),
      });
    }
  };

  render() {
    return (
      <div className='App'>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <p> Number of Events:</p>
        <NumberOfEvents
          numberEvents={this.state.numberEvents}
          // updateEvents={this.updateEvents}
          updateEventNum={this.updateEventNum}
        />
        <EventList events={this.state.numberEventsFilter} />
      </div>
    );
  }
}

export default App;
