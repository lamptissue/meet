import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";
import EventList from "../EventList";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  // Scenario 1
  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("unspecified amount of events shown", () => {});

    when("user selected a city", () => {
      AppWrapper = mount(<App />);
    });

    then("maximum of 32 events should be shown", () => {
      AppWrapper.update();
      expect(AppWrapper.state("numberEvents")).toEqual(32);
    });
  });

  // Scenario 2

  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("events are shown", async () => {
      AppWrapper = await mount(<App />);
    });

    when("user changed the amount of events shown", () => {
      AppWrapper.update();
      AppWrapper.find(".number-events").simulate("change", {
        target: { value: 1 },
      });
    });

    then("required number of events should be shown", () => {
      AppWrapper.update();
      expect(AppWrapper.find(EventList).props().events).toHaveLength(1);
    });
  });
});
