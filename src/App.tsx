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

const onBarClick = (d: Partial<BarData>) => console.log(d);

const title = <h2>Chart title</h2>;

const App = () => (
  <article style={style}>
    <StackableBarChart
      mode={"linear"}
      colorBackground={background}
      data={mockData}
      clickHandler={onBarClick}
    >
      {title}
    </StackableBarChart>
    {/* <StackableBarChart>default</StackableBarChart> */}
  </article>
);

export default App;
