import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberEvents: value,
    });
    this.props.updateEvents(undefined, value);
  };

  render() {
    const { numberEvents } = this.state;
    return (
      <div className='numberOfEvents'>
        <input
          type='number'
          className='number-events'
          value={numberEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}
export default NumberOfEvents;
