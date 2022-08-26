import * as React from "react";
import renderer from "react-test-renderer";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, expect, test, afterEach } from "vitest";
import StackableBarChart from "./StackableBarChart";

describe("Integration test", () => {
  afterEach(cleanup);
  const DEFAULT_PROPS = {};
  const TEST_ID_CONTAINER = "stackable-container";
  const TEST_ID_LABEL = "stackable-bar-label";
  const TEST_ID_BAR = "stackable-bar";
  const TEST_ID_TOOLTIP = "tooltip-container";

  test("Minimal render display", () => {
    // const component = renderer.create(<StackableBarChart />);
    // const tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
  });
});
