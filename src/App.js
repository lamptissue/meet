import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { WarningAlert } from "./Alert";
import "./nprogress.css";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EventGenre from "./EventGenre";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberEvents: 32,
    numberEventsFilter: [],
    showWelcomeScreen: undefined,
  };
  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
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
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const { events } = this.state;
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />;
    return (
      <div className='App'>
        <div className='warningAlert'>
          {!navigator.onLine && (
            <WarningAlert text='You are currently offline. The results you see may not be up to date' />
          )}
        </div>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberEvents={this.state.numberEvents}
          updateEventNum={this.updateEventNum}
        />
        <div className='data-vis-wrapper'>
          <EventGenre events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type='category' dataKey='city' name='City' />
              <YAxis
                allowDecimals={false}
                type='number'
                dataKey='number'
                name='Number of events'
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill='#8884d8' />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.numberEventsFilter} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
