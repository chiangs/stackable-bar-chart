// React
import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Vitest
import { vi, describe, expect, test, afterEach } from "vitest";
// App
import type { BarData, BarProps, ChartProps, Mode } from "./__types";
import StackableBarChart from "./StackableBarChart";

const TEST_TITLE = `Test Chart`;
const mockData: BarProps[] = [
  {
    value: 10.6,
    label: "test 1",
    color: "#F7A355",
  },
  {
    value: 50,
    label: "test 2",
    color: "#4D93E5",
  },
  {
    value: 1000,
    label: "test 3",
    color: "#37C6A8",
  },
  {
    value: -100,
    label: "test 4 negative",
    color: "#439090",
  },
];
const DEFAULT_PROPS = {};
const TEST_PROPS: ChartProps = {
  ...DEFAULT_PROPS,
  data: [...mockData],
};

describe("Integration test", () => {
  afterEach(cleanup);
  const TEST_ID_CONTAINER = "stackable-container";
  const TEST_ID_CHART_CONTAINER = "chart-container";
  const TEST_ID_CHART_TITLE = "chart-title";
  const TEST_ID_BAR = "stackable-bar";
  const TEST_ID_LABEL = "stackable-bar-label";
  const TEST_ID_TOOLTIP = "tooltip-container";

  test("Minimal render display", () => {
    const { rerender, getByTestId } = render(
      <StackableBarChart {...DEFAULT_PROPS} />
    );
    // Semantic role
    const chart = screen.getByRole("figure");
    expect(chart).toBeTruthy();
    // container testId
    expect(TEST_ID_CONTAINER).toBeTruthy();
    // title
    expect(TEST_ID_CHART_TITLE).toBeTruthy();
    // chart container testId
    expect(TEST_ID_CHART_CONTAINER).toBeTruthy();
    // Add title as child
    rerender(
      <StackableBarChart {...DEFAULT_PROPS}>{TEST_TITLE}</StackableBarChart>
    );
    const titleElementText = getByTestId(TEST_ID_CHART_TITLE).innerHTML;
    expect(titleElementText).toBe(TEST_TITLE);
  });

  test("With data in Linear mode", () => {
    const mode: Mode = "linear";
    const props: ChartProps = { ...TEST_PROPS, mode };
    const { getByTestId, getAllByTestId, getByText, getAllByText, rerender } =
      render(<StackableBarChart {...props} showPercentage={false} />);
    // Has mode in container classes
    const containerElClasses = getByTestId(TEST_ID_CONTAINER).className;
    expect(containerElClasses).toContain(mode);
    // Has length of bars
    const bars = getAllByTestId(TEST_ID_BAR);
    expect(bars.length).toEqual(mockData.length);
    // Displaying labels and values
    getByText(/test 1/i);
    getByText(/50/i);
    const ps = screen.queryAllByText(/%/i);
    expect(ps.length).toBe(0);
    // Check rounding
    const withPercentage = { ...props, showPercentage: true };
    rerender(<StackableBarChart {...withPercentage} />);
    getByText(/1%/i);
    const props_with_rounding_up: ChartProps = {
      ...withPercentage,
      roundTo: "up",
    };
    rerender(<StackableBarChart {...props_with_rounding_up} />);
    getByText(/2%/i);
    const props_with_rounding_down: ChartProps = {
      ...withPercentage,
      roundTo: "down",
    };
    rerender(<StackableBarChart {...props_with_rounding_down} />);
    getAllByText(/1%/i);
    // Title position
    const props_with_top_title: ChartProps = { ...props, titlePosition: "top" };
    rerender(<StackableBarChart {...props_with_top_title} />);
    const titleElClasses = getByTestId(TEST_ID_CONTAINER).className;
    expect(titleElClasses).toContain("title-top");
    // Show percentages
    const props_with_percentages: ChartProps = {
      ...props,
      showPercentage: true,
    };
    rerender(<StackableBarChart {...props_with_percentages} />);
    screen.getByText(mockData[0].label);
    screen.getByText(/- 10.6/i);
    const percentages = screen.getAllByText(/%/i);
    expect(percentages.length).toBe(4);
  });

  test("With data in Stacked mode", () => {
    const mode: Mode = "stacked";
    const props: ChartProps = { ...TEST_PROPS, mode };
    const { getByTestId, getAllByTestId, getByText, getAllByRole, rerender } =
      render(<StackableBarChart {...props} />);
    // Has mode in container classes
    const containerElClasses = getByTestId(TEST_ID_CONTAINER).className;
    expect(containerElClasses).toContain(mode);
    // Has length of bars
    const bars = getAllByTestId(TEST_ID_BAR);
    expect(bars.length).toEqual(mockData.length);
    // Has labels
    const labels = getAllByTestId(TEST_ID_LABEL);
    expect(labels.length).toEqual(mockData.length);
    // Displaying labels and values
    getByText(/test 1/i);
    getByText(/50/i);
    // Check sorting
    const headings = getAllByRole("heading");
    expect(headings.length).toEqual(4);
    expect(headings[0].innerHTML).toContain("test 1");
    const props_with_sorting: ChartProps = {
      ...props,
      sortBy: "largest",
    };
    rerender(<StackableBarChart {...props_with_sorting} />);
    const headingsSorted = getAllByRole("heading");
    expect(headingsSorted.length).toEqual(4);
    expect(headingsSorted[0].innerHTML).toContain("test 3");
    const props_with_sorting2: ChartProps = {
      ...props,
      sortBy: "smallest",
    };
    rerender(<StackableBarChart {...props_with_sorting2} />);
    const headingsSorted2 = getAllByRole("heading");
    expect(headingsSorted2.length).toEqual(4);
    expect(headingsSorted2[0].innerHTML).toContain(mockData[3].label);
  });

  test("User interaction and tooltip", async () => {
    const expectedTooltip = {
      label: mockData[3].label,
      value: mockData[3].value,
      percentage: -10,
    };
    const expectedTooltip2 = {
      label: mockData[0].label,
      value: mockData[0].value,
      percentage: 5,
    };
    const user = userEvent.setup();
    const mock = vi.fn().mockImplementation((props: Partial<BarData>) => props);
    const props: ChartProps = {
      ...TEST_PROPS,
      sortBy: "smallest",
      mode: "stacked",
      clickHandler: mock,
    };
    // Show tooltip
    const { getAllByTestId, getByTestId, rerender } = render(
      <StackableBarChart {...props} />
    );
    // Has tooltip class
    const bars = getAllByTestId(TEST_ID_BAR);
    const bar = bars[0];
    const barClasses = bar.className;
    expect(barClasses).toContain("tooltip");
    expect(barClasses).toContain("stacked");
    // Click handlers
    const spy = vi.spyOn(bar, "click");
    await user.click(bar);
    expect(spy.getMockName()).toEqual("click");
    expect(mock).toHaveBeenCalledOnce();
    expect(mock).toHaveBeenCalledWith(expectedTooltip);
    // Hover
    await user.hover(bar);
    let tooltip = getByTestId(TEST_ID_TOOLTIP);
    expect(tooltip.innerHTML).toContain(expectedTooltip.percentage);
    await user.unhover(bar);
    // Key other than Tab
    await user.keyboard("test{Enter}");
    let tooltipContent = screen.queryByText(expectedTooltip.percentage);
    expect(tooltipContent).toBeNull();
    // Tab
    await user.tab();
    tooltip = getByTestId(TEST_ID_TOOLTIP);
    expect(tooltip.innerHTML).toContain(expectedTooltip2.label);
    // Show tooltip off
    rerender(<StackableBarChart {...props} showTooltip={false} />);
    const bars2 = getAllByTestId(TEST_ID_BAR);
    const bar2 = bars2[0];
    await user.hover(bar2);
    tooltipContent = screen.queryByText(expectedTooltip.percentage);
    expect(tooltipContent).toBeNull();
    await user.unhover(bar2);
  });

  test("Handle negative values", () => {});

  test("Accessibility", () => {
    // bar aria label
    screen.logTestingPlaygroundURL();
  });
});
