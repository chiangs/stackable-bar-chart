import React from "react";
import type { BarProps, ChartProps } from "../__types";
import Bar from "../Bar";
import "./index.css";

const mockData: BarProps[] = [
  {
    value: 2,
    label: "test",
  },
  {
    value: 7,
    label: "test longer",
  },
];

type Props = ChartProps;

const NAME_COMPONENT = "stackable-container";

const sortDataSmallBig = (data: BarProps[]): BarProps[] =>
  data.sort((a, b) => a.value - b.value);

const calcPortionsForData = (data: BarProps[]): BarProps[] => {
  const calcPortion = (value: number, total: number) => (value / total) * 100;
  const sum = data.reduce((t, o) => {
    return t + o.value;
  }, 0);
  const updated = data.map((d) => ({
    ...d,
    portion: calcPortion(d.value, sum),
  }));
  return updated;
};

// TODO: Sort optional on linear?
const StackableBarChart: React.FC<Props> = ({
  data = mockData,
  mode = "linear",
}) => {
  const sortedData = sortDataSmallBig(data);
  const sortedDataWithPortion = calcPortionsForData(sortedData);
  const chart = sortedDataWithPortion.map((d) => (
    <React.Fragment key={d.label}>
      <div className="data-label">
        <h3>{d.label}</h3>
      </div>
      <div className="data-bar">
        <Bar {...d} />
      </div>
    </React.Fragment>
  ));

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
