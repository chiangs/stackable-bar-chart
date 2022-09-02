import React, { useState } from 'react';
import './index.css';
import type {
    BarData,
    BarProps,
    ChartData,
    ChartProps,
    Rounding,
    SortProperty,
} from '../__types';
import Bar from '../Bar';
import Label from '../Label';
import Tooltip from '../Tooltip';
import ChartContainer from '../ChartContainer';
type Props = ChartProps;

const NAME_COMPONENT = 'stackable-container';

/**
 * Sorts collection
 * @param data
 * @param sortedBy
 * @returns sorted collection from largest or smallest
 */
const sortDataSmallBig = (
    data: ChartData[],
    sortedBy: SortProperty = 'none'
): BarProps[] =>
    data.sort((a, b) =>
        sortedBy === 'smallest' ? a.value - b.value : b.value - a.value
    );

/**
 * Rounding helper
 * @param value
 * @param method
 * @returns value rounded
 */
const roundPortion = (value: number, method: Rounding): number => {
    if (method === 'up') {
        return Math.ceil(value);
    }
    if (method === 'down') {
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
    data: ChartData[],
    method: Rounding,
    sortedBy: SortProperty = 'none'
): BarProps[] => {
    // CB - normalize data
    const normalizeData = (collection: ChartData[]) =>
        collection.map((d) => ({
            ...d,
            value: d.value < 0 ? 0 : d.value,
        }));
    // CB - actual percentage
    const calcPortion = (value: number, total: number, method: Rounding) => {
        const portion = (value / total) * 100;
        const rounded = roundPortion(portion, method);
        return rounded;
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
    // CB - Find sum of all values
    const calcSum = (cllection: ChartData[]) =>
        cllection.reduce((t, o) => {
            return t + o.value;
        }, 0);
    // Normalize data values
    const normalized = normalizeData(data);
    // largest used as base of 100% of container
    const largest =
        sortedBy === 'none'
            ? findLargest(normalized)
            : sortedBy === 'smallest'
            ? normalized[normalized.length - 1]
            : normalized[0];
    const sum = calcSum(normalized);
    const updated = normalized.map((d) => ({
        ...d,
        portion: calcPortion(d.value, sum, method),
        renderPortion: calcRenderPortion(d.value, largest.value),
    }));
    return updated;
};

const StackableBarChart: React.FC<Props> = ({
    data = [],
    mode = 'stacked',
    sortBy = 'none',
    roundTo = 'nearest',
    titlePosition = 'default',
    colorBackground = 'transparent',
    showPercentage = true,
    showTooltip = true,
    clickHandler = () => null,
    children,
}) => {
    const [tooltipContent, setTooltipContent] = useState<BarData | null>();

    // Events
    const onHoverBar = (data: any | null) => setTooltipContent(data);
    const onClickBar = (data: Partial<BarData>) => clickHandler(data);
    const onBlurFigure = () => setTooltipContent(null);

    // Get background of app for knockout bar value text
    const background =
        colorBackground === 'transparent' ? '#fff' : colorBackground;

    // Process data collection
    const sortedData =
        sortBy === 'none' ? data : sortDataSmallBig(data, sortBy);
    const sortedDataWithPortion = calcPortionsForData(
        sortedData,
        roundTo,
        sortBy
    );

    // Title
    let title = null;
    if (titlePosition !== 'none') {
        title = children;
    }
    const chartTitle = (
        <figcaption className='chart-title' data-testid='chart-title'>
            {title}
        </figcaption>
    );

    // Tooltip
    const tooltip = showTooltip && tooltipContent && (
        <Tooltip {...tooltipContent} />
    );

    // Bars
    let bars;
    if (mode === 'stacked') {
        bars = sortedDataWithPortion.map((d, i) => (
            <React.Fragment key={`${d.label}${i}`}>
                <div className='data-label' style={{ color: d.color }}>
                    <Label>{d.label}</Label>
                </div>
                <div className='data-bar'>
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
    const barsContainer =
        mode === 'stacked' ? (
            <>{bars}</>
        ) : (
            <div className='chart-bars'>{bars}</div>
        );

    // ChartContents
    const contents = (
        <>
            {barsContainer}
            {tooltip}
        </>
    );

    //  Chart
    const chart = <ChartContainer>{contents}</ChartContainer>;

    return (
        <figure
            className={`${NAME_COMPONENT} ${mode} title-${titlePosition}`}
            onBlur={onBlurFigure}
            data-testid={NAME_COMPONENT}>
            {chart}
            {chartTitle}
        </figure>
    );
};

export default StackableBarChart;
