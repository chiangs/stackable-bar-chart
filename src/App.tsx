import type { BarData, BarProps } from './lib/__types';
import StackableBarChart from './lib/StackableBarChart';

const getRandom = () => Math.floor(Math.random() * (1000 - 0) + 0);
// const background = "#08111B";
const background = '#fff';
const style = {
    padding: '50px',
    background,
};

const mockData: BarProps[] = [
    {
        value: 100.61232131,
        label: 'Coffee',
        color: '#F7A355',
    },
    {
        value: 50,
        label: 'Beer',
        color: '#4D93E5',
    },
    {
        value: 23,
        label: 'Water',
        color: '#37C6A8',
    },
    {
        value: 67,
        label: 'Wine',
        color: '#439090',
    },
];

const onBarClick = (d: Partial<BarData>) => console.log(d);

const title = <h2>Chart title</h2>;

const App = () => (
    <article style={style}>
        <StackableBarChart
            colorBackground={background}
            data={mockData}
            clickHandler={onBarClick}>
            {title}
        </StackableBarChart>
        {/* <StackableBarChart>default</StackableBarChart> */}
    </article>
);

export default App;
