import StackableBarChart from "./lib/StackableBarChart";

const title = <h2>Chart title</h2>;

const style = {
  padding: "50px",
  background: "#08111B",
};

const App = () => (
  <article style={style}>
    <StackableBarChart colorBackground={"#08111B"}>{title}</StackableBarChart>;
  </article>
);

export default App;
