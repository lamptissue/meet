import React, { Component } from "react";
import { InfoAlert } from "./Alert";
import PropTypes from "prop-types";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: false,
    infoText: "",
  };

  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showSuggestions: false });
    }
  }
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      suggestions: [],
      infoText: "",
    });
    this.props.updateEvents(suggestion);
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          "We can not find the city you are looking for. Please try another city",
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: "",
      });
    }
  };
  render() {
    return (
      <div ref={this.setWrapperRef}>
        {this.props.children}
        <div className='CitySearch'>
          <InfoAlert text={this.state.infoText} />
          <input
            type='text'
            className='city'
            placeholder='City'
            value={this.state.query}
            onChange={this.handleInputChanged}
            onFocus={() => {
              this.setState({ showSuggestions: true });
            }}
          />
          <ul
            className='suggestions'
            style={this.state.showSuggestions ? {} : { display: "none" }}
          >
            {this.state.suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}
              >
                {suggestion}
              </li>
            ))}
            <li onClick={() => this.handleItemClicked("all")}>
              <b>See all cities</b>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
CitySearch.propTypes = {
  children: PropTypes.element.isRequired,
};
export default CitySearch;
