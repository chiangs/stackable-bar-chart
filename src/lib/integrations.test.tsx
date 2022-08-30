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
  const TEST_ID_CHART_CONTAINER = "chart-container";
  const TEST_ID_LABEL = "stackable-bar-label";
  const TEST_ID_BAR = "stackable-bar";
  const TEST_ID_TOOLTIP = "tooltip-container";

  test("Minimal render display", () => {
    // title
    // container testId
    // chart container testId
  });

  test("With data in Linear mode", () => {
    // has class
    // has length of bars and labels
    // Check sorting
    // Check rounding
  });

  test("With data in Stacked mode", () => {
    // has class
    // has length of bars and labels
    // Check sorting
    // Check rounding
  });

  test("User interaction and tooltip", () => {
    // tooltip testid
    // Click handlers
  });

  test("Accessibility", () => {
    // bar aria label
  });
});
