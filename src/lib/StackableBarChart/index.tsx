import React from "react";
import type { BarProps, ChartProps } from "../__types";
import Bar from "../Bar";
import "./index.css";
import Label from "../Label";

const mockData: BarProps[] = [
  {
    value: 100,
    label: "test",
  },
  {
    value: 1,
    label: "test med",
  },
  {
    value: 421,
    label: "test longer",
  },
  {
    value: 1000,
    label: "test longer",
  },
  {
    value: 876,
    label: "test longer",
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

/**
 * Calculates the actual portion and render portion
 * @param data
 * @returns BarProps[] with portion calculations
 */
const calcPortionsForData = (data: BarProps[]): BarProps[] => {
  const calcPortion = (value: number, total: number) => (value / total) * 100;
  const calcRenderPortion = (value: number, largest: number) =>
    (value / largest) * 100;
  // largest used as base of 100% of container
  const largest = data[data.length - 1];
  const sum = data.reduce((t, o) => {
    return t + o.value;
  }, 0);
  const updated = data.map((d) => ({
    ...d,
    portion: calcPortion(d.value, sum),
    renderPortion: calcRenderPortion(d.value, largest.value),
  }));
  return updated;
};

// TODO: Sort optional on linear?
const StackableBarChart: React.FC<Props> = ({
  data = mockData,
  sortLinear = true,
  mode = "linear",
  colorBackground = "#fff",
}) => {
  // Get background of app for knockout bar value text
  const background =
    colorBackground === "transparent" ? "#fff" : colorBackground;
  // Process data collection
  const sortedData = sortLinear ? sortDataSmallBig(data) : data;
  const sortedDataWithPortion = calcPortionsForData(sortedData);
  // Create the columns
  let chart;
  if (mode === "linear") {
    chart = sortedDataWithPortion.map((d, i) => (
      <React.Fragment key={`${d.label}${i}`}>
        <div className="data-label" style={{ color: d.color }}>
          <Label>{d.label}</Label>
        </div>
        <div className="data-bar">
          <Bar {...d} background={background} />
        </div>
      </React.Fragment>
    ));
  } else {
    null;
  }

  return (
    <figure
      className={`${NAME_COMPONENT} ${mode}`}
      data-testid={NAME_COMPONENT}
    >
      {chart}
    </figure>
  );
};

export default StackableBarChart;
