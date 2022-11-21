import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  //scenario 1
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppWrapper;
    given("a city has been chosen", () => {});

    when("events have loaded", () => {
      AppWrapper = mount(<App />);
    });

    then("the event should show basic details", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event").hostNodes()).toHaveLength(
        mockData.length
      );
    });
  });

  //scenario 2

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the user has chosen a city", async () => {
      AppWrapper = await mount(<App />);
      expect(AppWrapper.find(".event").hostNodes()).toHaveLength[
        mockData.length
      ];
    });

    when("the user taps the event", () => {
      AppWrapper.update();
      AppWrapper.find(".details-btn").at(0).simulate("click");
    });

    then("the event will expand showing more details", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".details-title").hostNodes()).toHaveLength(1);
    });
  });

  //scenario 3
  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the event details have been expanded", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      // console.log("button-- -- --", AppWrapper.debug());
      AppWrapper.find(".show-details").at(0).simulate("click");
    });

    when("the user taps the event", () => {
      AppWrapper.update();
      AppWrapper.find(".hide-details").at(0).simulate("click");
    });

    then("the event will collapse hiding the details", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event .details")).toHaveLength(0);
    });
  });
});
