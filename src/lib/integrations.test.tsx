// React
import * as React from 'react';
import { render, screen, cleanup, getAllByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Vitest
import { vi, describe, expect, test, afterEach } from 'vitest';
// App
import type { BarData, BarProps, ChartProps, Mode } from './__types';
import StackableBarChart from './StackableBarChart';

const TEST_TITLE = `Test Chart`;
const mockData: BarProps[] = [
    {
        value: 100.6,
        label: 'test 1',
        color: '#F7A355',
    },
    {
        value: 50,
        label: 'test 2',
        color: '#4D93E5',
    },
    {
        value: 1000,
        label: 'test 3',
        color: '#37C6A8',
    },
    {
        value: -100,
        label: 'test 4 negative',
        color: '#439090',
    },
];
const DEFAULT_PROPS = {};
const TEST_PROPS: ChartProps = {
    ...DEFAULT_PROPS,
    data: [...mockData],
};

describe('Integration test', () => {
    afterEach(cleanup);
    const TEST_ID_CONTAINER = 'stackable-container';
    const TEST_ID_CHART_CONTAINER = 'chart-container';
    const TEST_ID_CHART_TITLE = 'chart-title';
    const TEST_ID_BAR = 'stackable-bar';
    const TEST_ID_LABEL = 'stackable-bar-label';
    const TEST_ID_TOOLTIP = 'tooltip-container';

    test('Minimal render display', () => {
        const { rerender, getByTestId } = render(
            <StackableBarChart {...DEFAULT_PROPS} />
        );
        // Semantic role
        const chart = screen.getByRole('figure');
        expect(chart).toBeTruthy();
        // container testId
        expect(TEST_ID_CONTAINER).toBeTruthy();
        // title
        expect(TEST_ID_CHART_TITLE).toBeTruthy();
        // chart container testId
        expect(TEST_ID_CHART_CONTAINER).toBeTruthy();
        // Add title as child
        rerender(
            <StackableBarChart {...DEFAULT_PROPS}>
                {TEST_TITLE}
            </StackableBarChart>
        );
        const titleElementText = getByTestId(TEST_ID_CHART_TITLE).innerHTML;
        expect(titleElementText).toBe(TEST_TITLE);
    });

    test('Sorted rendering', () => {
        const props: ChartProps = { ...TEST_PROPS };
        const { getAllByRole, rerender } = render(
            <StackableBarChart {...props} />
        );
        let firstHeading = getAllByRole('heading')[0];
        expect(firstHeading.innerHTML).toEqual(mockData[0].label);

        // Largest to smallest
        rerender(<StackableBarChart {...props} sortBy={'largest'} />);
        firstHeading = getAllByRole('heading')[0];
        expect(firstHeading.innerHTML).toEqual(mockData[2].label);

        // Smallest to largest
        rerender(<StackableBarChart {...props} sortBy={'smallest'} />);
        firstHeading = getAllByRole('heading')[3];
        expect(firstHeading.innerHTML).toEqual(mockData[2].label);
    });

    test('With data in Linear mode', () => {
        const mode: Mode = 'linear';
        const props: ChartProps = { ...TEST_PROPS, mode };
        const {
            getByTestId,
            getAllByTestId,
            getByText,
            getAllByText,
            rerender,
        } = render(<StackableBarChart {...props} showPercentage={false} />);

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
        getByText(/9%/i);
        const props_with_rounding_up: ChartProps = {
            ...withPercentage,
            roundTo: 'up',
        };
        rerender(<StackableBarChart {...props_with_rounding_up} />);
        getByText(/9%/i);
        const props_with_rounding_down: ChartProps = {
            ...withPercentage,
            roundTo: 'down',
        };
        rerender(<StackableBarChart {...props_with_rounding_down} />);
        getAllByText(/8%/i);

        // Title position
        const props_with_top_title: ChartProps = {
            ...props,
            titlePosition: 'top',
        };
        rerender(<StackableBarChart {...props_with_top_title} />);
        const titleElClasses = getByTestId(TEST_ID_CONTAINER).className;
        expect(titleElClasses).toContain('title-top');

        // Show percentages
        const props_with_percentages: ChartProps = {
            ...props,
            showPercentage: true,
        };
        rerender(<StackableBarChart {...props_with_percentages} />);
        screen.getByText(mockData[0].label);
        screen.getByText(/- 101/i);
        const percentages = screen.getAllByText(/%/i);
        expect(percentages.length).toBe(4);
    });

    test('User interaction and tooltip', async () => {
        const expectedTooltip = {
            label: mockData[3].label,
            value: 0,
            percentage: 0,
        };
        const user = userEvent.setup();
        const mock = vi
            .fn()
            .mockImplementation((props: Partial<BarData>) => props);
        const props: ChartProps = {
            ...TEST_PROPS,
            sortBy: 'smallest',
            mode: 'stacked',
            clickHandler: mock,
        };

        // Show tooltip
        const { getAllByTestId, getByTestId, rerender } = render(
            <StackableBarChart {...props} />
        );

        // Has tooltip class
        let bars = getAllByTestId(TEST_ID_BAR);
        let bar = bars[0];
        const barClasses = bar.className;
        expect(barClasses).toContain('tooltip');
        expect(barClasses).toContain('stacked');

        // Has labels
        const labels = getAllByTestId(TEST_ID_LABEL);
        expect(labels.length).toBe(mockData.length);

        // Click event on bar
        const spy = vi.spyOn(bar, 'click');
        await user.click(bar);
        expect(spy.getMockName()).toEqual('click');
        expect(mock).toHaveBeenCalledOnce();
        expect(mock).toHaveBeenCalledWith(expectedTooltip);

        // Hover
        await user.hover(bar);
        let tooltip = getByTestId(TEST_ID_TOOLTIP);
        expect(tooltip.innerHTML).toContain(expectedTooltip.percentage);
        await user.unhover(bar);

        // Tab
        await user.tab();
        tooltip = getByTestId(TEST_ID_TOOLTIP);
        expect(tooltip.innerHTML).toContain(mockData[1].label);

        // Key other than Tab
        await user.keyboard('test{Enter}');
        let tooltipContent = screen.queryByText(
            `${expectedTooltip.percentage}%`
        );
        expect(tooltipContent).toBeNull();

        // Show tooltip off
        rerender(<StackableBarChart {...props} showTooltip={false} />);
        bars = getAllByTestId(TEST_ID_BAR);
        bar = bars[0];
        await user.hover(bar);
        tooltipContent = screen.queryByText(`${expectedTooltip.percentage}%`);
        expect(tooltipContent).toBeNull();
        await user.unhover(bar);
    });
});
