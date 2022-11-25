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
    locationFilteredEvents: [],
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

  numFilter = (events, num) => {
    if (num === 0) {
      return events.slice(0, 32);
    }
    return events.slice(0, num);
  };

  updateEvents = (location) => {
    const locationEvents =
      location === "all"
        ? this.state.events
        : this.state.events.filter((event) => event.location === location);
    this.setState({
      locationFilteredEvents: locationEvents,
      numberEventsFilter: this.numFilter(
        locationEvents,
        this.state.numberEvents
      ),
    });
  };
  updateEventNum = (num) => {
    if (this.state.locationFilteredEvents.length !== 0) {
      this.setState({
        numberEvents: num,
        numberEventsFilter: this.numFilter(
          this.state.locationFilteredEvents,
          num
        ),
      });
    } else {
      this.setState({
        numberEvents: num,
        numberEventsFilter: this.numFilter(this.state.events, num),
      });
    }
  };

  getData = () => {
    const { locations, numberEventsFilter } = this.state;
    const data = locations.map((location) => {
      const number = numberEventsFilter.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const { locations, numberEvents, numberEventsFilter } = this.state;
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />;
    return (
      <div className='App'>
        <div className='warningAlert'>
          {!navigator.onLine && (
            <WarningAlert text='You are currently offline. The results you see may not be up to date' />
          )}
        </div>
        <h1>Meet App</h1>
        <h3 className='nearCity'>Choose your nearest city</h3>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents
          numberEvents={numberEvents}
          updateEventNum={this.updateEventNum}
        />
        <h4 className='cityevents'>Events in each city</h4>

        <div className='data-vis-wrapper'>
          <EventGenre events={numberEventsFilter} />
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
        <EventList events={numberEventsFilter} />

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
