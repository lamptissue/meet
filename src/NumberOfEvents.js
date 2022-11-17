import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberEvents: value,
    });
    this.props.updateEventNum(value);
    if (value < 1 || value > 32) {
      this.setState({
        query: value,
        infoText: "Select number from 1 to 32",
      });
    } else {
      return this.setState({
        query: value,
        infoText: "",
      });
    }
  };

  render() {
    const { numberEvents } = this.state;
    return (
      <div className='numberOfEvents'>
        <label>Number of Events: </label>
        <input
          type='number'
          className='number-events'
          min='1'
          value={numberEvents}
          onChange={this.handleInputChanged}
        />
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
}
export default NumberOfEvents;
