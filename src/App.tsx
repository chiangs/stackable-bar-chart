import type { BarData, BarProps } from "./lib/__types";
import StackableBarChart from "./lib/StackableBarChart";

const getRandom = () => Math.floor(Math.random() * (1000 - 0) + 0);
// const background = "#08111B";
const background = "#fff";
const style = {
  padding: "50px",
  background,
};

const mockData: BarProps[] = [
  {
    value: getRandom(),
    label: "test 1",
    color: "#F7A355",
  },
  {
    value: getRandom(),
    label: "test 2",
    color: "#4D93E5",
  },
  {
    value: getRandom(),
    label: "test 3 really",
    color: "#37C6A8",
  },
  {
    value: getRandom(),
    label: "test 4 really long label",
    color: "#439090",
  },
];

const onBarClick = (d: Partial<BarData>) => console.log(d);

const title = <h2>Chart title</h2>;

const App = () => (
  <article style={style}>
    <StackableBarChart
      colorBackground={background}
      data={mockData}
      clickHandler={onBarClick}
    >
      {title}
    </StackableBarChart>
  </article>
);

export default App;
