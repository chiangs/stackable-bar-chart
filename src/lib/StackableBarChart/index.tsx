import React, { useState } from "react";
import "./index.css";
import type {
  BarData,
  BarProps,
  ChartProps,
  Rounding,
  SortProperty,
} from "../__types";
import Bar from "../Bar";
import Label from "../Label";
import Tooltip from "../Tooltip";
import ChartContainer from "../ChartContainer";
type Props = ChartProps;

const NAME_COMPONENT = "stackable-container";

/**
 * Sorts collection
 * @param data
 * @param sortedBy
 * @returns sorted collection from largest or smallest
 */
const sortDataSmallBig = (
  data: BarProps[],
  sortedBy: SortProperty = "none"
): BarProps[] =>
  data.sort((a, b) =>
    sortedBy === "smallest" ? a.value - b.value : b.value - a.value
  );

/**
 * Rounding helper
 * @param value
 * @param method
 * @returns value rounded
 */
const roundPortion = (value: number, method: Rounding): number => {
  if (method === "up") {
    return Math.ceil(value);
  }
  if (method === "down") {
    return Math.floor(value);
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
  method: Rounding,
  sortedBy: SortProperty = "none"
): BarProps[] => {
  // CB - actual percentage
  const calcPortion = (value: number, total: number, method: Rounding) => {
    const portion = (value / total) * 100;
    return roundPortion(portion, method);
  };
  // CB - percentage for rendering visual size
  const calcRenderPortion = (value: number, largest: number) =>
    (value / largest) * 100;
  // CB - Identifies largest value in collection
  const findLargest = (collection: BarProps[]) => {
    let temp = 0;
    let largest = collection[0];
    collection.forEach((d) => {
      if (temp < d.value) {
        temp = d.value;
        largest = d;
      }
    });
    return largest;
  };
  // largest used as base of 100% of container
  const largest =
    sortedBy === "none"
      ? findLargest(data)
      : sortedBy === "smallest"
      ? data[data.length - 1]
      : data[0];
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

// TODO: Optimize CSS file
// TODO: Integration tests
const StackableBarChart: React.FC<Props> = ({
  data = [],
  sortLinear = "none",
  mode = "linear",
  rounding = "nearest",
  colorBackground = "#fff",
  showPercentage = false,
  showTooltip = true,
  titlePosition = "default",
  children,
  clickHandler = () => null,
}) => {
  const [tooltipContent, setTooltipContent] = useState<BarData | null>();

  // Events
  const onHoverBar = (data: any | null) => setTooltipContent(data);
  const onClickBar = (data: Partial<BarData>) => clickHandler(data);
  const onBlurFigure = () => setTooltipContent(null);

  // Get background of app for knockout bar value text
  const background =
    colorBackground === "transparent" ? "#fff" : colorBackground;

  // Process data collection
  const sortedData =
    sortLinear === "none" ? data : sortDataSmallBig(data, sortLinear);
  const sortedDataWithPortion = calcPortionsForData(
    sortedData,
    rounding,
    sortLinear
  );

  // Bars
  let bars;
  if (mode === "stacked") {
    bars = sortedDataWithPortion.map((d, i) => (
      <React.Fragment key={`${d.label}${i}`}>
        <div className="data-label" style={{ color: d.color }}>
          <Label>{d.label}</Label>
        </div>
        <div className="data-bar">
          <Bar
            {...d}
            background={background}
            mode={mode}
            showTooltip={showTooltip}
            revealTooltipHandler={onHoverBar}
            barClickHandler={onClickBar}
          />
        </div>
      </React.Fragment>
    ));
  } else {
    bars = sortedDataWithPortion.map((d, i) => (
      <React.Fragment key={`${d.label}${i}`}>
        <Bar
          {...d}
          background={background}
          mode={mode}
          showPercentage={showPercentage}
          showTooltip={showTooltip}
          revealTooltipHandler={onHoverBar}
          barClickHandler={onClickBar}
        />
      </React.Fragment>
    ));
  }

  // Title
  let title = null;
  if (titlePosition !== "none") {
    title = children;
  }

  // Tooltip
  const tooltip = showTooltip && tooltipContent && (
    <Tooltip {...tooltipContent} />
  );

  // Title
  const chartTitle = <figcaption className="chart-title">{title}</figcaption>;

  // ChartContents
  const contents =
    mode === "stacked" ? (
      <>
        {bars}
        {tooltip}
      </>
    ) : (
      <>
        {" "}
        <div className="chart-bars">{bars}</div>
        {tooltip}
      </>
    );

  //  Chart
  const chart = <ChartContainer>{contents}</ChartContainer>;

  return (
    <figure
      className={`${NAME_COMPONENT} ${mode} title-${titlePosition}`}
      onBlur={onBlurFigure}
      data-testid={NAME_COMPONENT}
    >
      {chart}
      {chartTitle}
    </figure>
  );
};

export default StackableBarChart;
