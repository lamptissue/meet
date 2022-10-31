import React, { Component } from "react";

class Event extends Component {
  state = {
    detailsVisible: false,
  };

  handleDetailsToggled = () => {
    if (!this.state.detailsVisible) {
      this.setState({
        detailsVisible: true,
      });
    } else {
      this.setState({
        detailsVisible: false,
      });
    }
  };
  render() {
    const { event } = this.props;
    return (
      <div>
        <h1 className='summary'>{event.summary}</h1>
        <p className='date'>{event.start.dateTime}</p>
        <p className='location'>{event.location}</p>
        {this.state.detailsVisible ? (
          <>
            <div className='details'>
              <h3 className='details-title'>About event:</h3>
              <a href={event.htmlLink} className='details-link'>
                See details on Google Calendar
              </a>
              <p className='details-description'>{event.description}</p>
            </div>
            <button
              className='hide-details'
              onClick={this.handleDetailsToggled}
            >
              Hide details
            </button>
          </>
        ) : (
          <button className='show-details' onClick={this.handleDetailsToggled}>
            Show details
          </button>
        )}
      </div>
    );
  }
}
export default Event;
