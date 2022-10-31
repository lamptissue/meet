import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  test("renders the summary (title)", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });

  test("renders the summary (title) correctly", () => {
    expect(EventWrapper.find(".summary").text()).toBe(event.summary);
  });

  test("renders the start date of the event", () => {
    expect(EventWrapper.find(".date")).toHaveLength(1);
  });

  test("renders the start date of the event correctly", () => {
    expect(EventWrapper.find(".date").text()).toBe(event.start.dateTime);
  });

  test("renders the location of the event", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });

  test("renders the location of the event correctly", () => {
    expect(EventWrapper.find(".location").text()).toBe(event.location);
  });

  test("renders button to show details", () => {
    expect(EventWrapper.find(".show-details")).toHaveLength(1);
  });

  test("Does not show details when rendered", () => {
    expect(EventWrapper.find(".details")).toHaveLength(0);
  });

  test("Render details when show details button is clicked", () => {
    EventWrapper.find(".show-details").at(0).simulate("click");
    expect(EventWrapper.find(".details")).toHaveLength(1);
  });

  test("renders title, link, and description when details are visible", () => {
    EventWrapper.setState({ detailsVisible: true });
    expect(EventWrapper.find(".details-title")).toHaveLength(1);
    expect(EventWrapper.find(".details-link")).toHaveLength(1);
    expect(EventWrapper.find(".details-description")).toHaveLength(1);
  });

  test("renders button to hide details when details are visible", () => {
    EventWrapper.setState({ detailsVisible: true });
    expect(EventWrapper.find(".hide-details")).toHaveLength(1);
  });

  test("Does not render details when the hide details button is clicked", () => {
    EventWrapper.setState({ detailsVisible: true });
    EventWrapper.find(".hide-details").at(0).simulate("click");
    expect(EventWrapper.find(".details")).toHaveLength(0);
  });
});
