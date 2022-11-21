import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents.js";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents updateEventNum={() => {}} />
    );
  });

  test("render text input", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEvents")).toHaveLength(1);
  });

  test("render default number of events - 32", () => {
    expect(NumberOfEventsWrapper.find(".number-events")).toHaveLength(1);
    expect(NumberOfEventsWrapper.state("numberEvents")).toBe(32);
  });

  test("user input to change number of events", () => {
    NumberOfEventsWrapper.find(".number-events").simulate("change", {
      target: { value: 6 },
    });
    expect(NumberOfEventsWrapper.state("numberEvents")).toBe(6);
  });
});
