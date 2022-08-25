import React, { useState } from "react";
import "./index.css";
import type { BarData, BarProps, ChartProps, Rounding } from "../__types";
import Bar from "../Bar";
import Label from "../Label";
import Tooltip from "../Tooltip";

const getRandom = () => Math.floor(Math.random() * (1000 - 0) + 0);

const mockData: BarProps[] = [
  {
    value: getRandom(),
    label: "test",
    color: "red",
  },
  {
    value: getRandom(),
    label: "test med",
    color: "yellow",
  },
  {
    value: getRandom(),
    label: "test longer",
    color: "green",
  },
  {
    value: getRandom(),
    label: "test longer",
    color: "blue",
  },
  {
    value: getRandom(),
    label: "test longer",
    color: "purple",
  },
];

type Props = ChartProps;

const NAME_COMPONENT = "stackable-container";

/**
 * Sort the data from smallest to biggest
 * @param data
 * @returns sorted BarProps[]
 */
const sortDataSmallBig = (data: BarProps[]): BarProps[] =>
  data.sort((a, b) => a.value - b.value);

const roundPortion = (value: number, method: Rounding): number => {
  if (method === "up") {
  }
  if (method === "down") {
  }
  return Math.round(value);
};

/**
 * Calculates the actual portion and render portion
 * @param data
 * @returns BarProps[] with portion calculations
 */
const calcPortionsForData = (
  data: BarProps[],
  method: Rounding
): BarProps[] => {
  const calcPortion = (value: number, total: number, method: Rounding) => {
    const portion = (value / total) * 100;
    return roundPortion(portion, method);
  };
  const calcRenderPortion = (value: number, largest: number) =>
    (value / largest) * 100;
  // largest used as base of 100% of container
  const largest = data[data.length - 1];
  const sum = data.reduce((t, o) => {
    return t + o.value;
  }, 0);
  const updated = data.map((d) => ({
    ...d,
    portion: calcPortion(d.value, sum, method),
    renderPortion: calcRenderPortion(d.value, largest.value),
  }));
  return updated;
};

// TODO: Sort optional on linear?
// TODO: Rounding options
// TODO: canHover for hidden
const StackableBarChart: React.FC<Props> = ({
  data = mockData,
  sortLinear = true,
  mode = "stacked",
  rounding = "nearest",
  colorBackground = "#fff",
  showPercentage = true,
  showTooltip = true,
  titlePosition = "bottom",
  legendPosition = "none",
  children,
}) => {
  const [tooltipContent, setTooltipContent] = useState<BarData | null>();

  // Events
  const onHoverBar = (data: BarData | null) => setTooltipContent(data);

  // Get background of app for knockout bar value text
  const background =
    colorBackground === "transparent" ? "#fff" : colorBackground;
  // Process data collection
  const sortedData = sortLinear ? sortDataSmallBig(data) : data;
  const sortedDataWithPortion = calcPortionsForData(sortedData, rounding);
  // Bars
  let bars;
  if (mode === "linear") {
    bars = sortedDataWithPortion.map((d, i) => (
      <React.Fragment key={`${d.label}${i}`}>
        <div className="data-label" style={{ color: d.color }}>
          <Label>{d.label}</Label>
        </div>
        <div className="data-bar">
          <Bar {...d} background={background} mode={mode} />
        </div>
      </React.Fragment>
    ));
  } else {
    bars = sortedDataWithPortion.map((d, i) => (
      <Bar
        {...d}
        background={background}
        mode={mode}
        showPercentage={showPercentage}
        showTooltip={showTooltip}
        revealTooltipHandler={onHoverBar}
      />
    ));
  }

  // Title
  let title = null;
  if (titlePosition !== "none") {
    title = children;
  }

  // Legend
  let legend = null;
  if (legendPosition !== "none") {
  }

  // Tooltip
  const tooltip = showTooltip && tooltipContent && (
    <Tooltip {...tooltipContent} />
  );

  // Combined chart elements
  let chart;
  if (mode === "linear") {
    chart = (
      <>
        <div className="chart-container">{bars}</div>
        <div className="chart-title">{title}</div>
      </>
    );
  } else {
    chart = (
      <div className="chart-container">
        <div className="chart-bars">
          {bars}
          {tooltip}
        </div>

        <div className="chart-title">{title}</div>
      </div>
    );
  }

  return (
    <figure
      className={`${NAME_COMPONENT} ${mode} title-${titlePosition}`}
      data-testid={NAME_COMPONENT}
    >
      {chart}
    </figure>
  );
};

export default StackableBarChart;
