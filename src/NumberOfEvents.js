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
    this.props.updateEventNum(value);
  };

  render() {
    const { numberEvents } = this.state;
    return (
      <div className='numberOfEvents'>
        <input
          type='number'
          className='number-events'
          min='1'
          value={numberEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}
export default NumberOfEvents;
