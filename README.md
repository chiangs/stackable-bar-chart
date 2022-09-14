![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/chiangs/stackable-bar-chart/Release?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/stackable-bar-chart?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/chiangs/stackable-bar-chart?style=for-the-badge)

- [Introduction](#introduction)
  - [Usage in commercial projects](#usage-in-commercial-projects)
  - [Limitations](#limitations)
  - [Demo](#demo)
  - [Supporting reads](#supporting-reads)
  - [API](#api)
    - [Chart title](#chart-title)
    - [Colors](#colors)
    - [Fonts and other styling](#fonts-and-other-styling)
  - [Installing](#installing)
    - [Usage](#usage)
    - [Updating](#updating)
  - [Contributing](#contributing)
  - [Developing](#developing)
    - [Testing](#testing)
    - [Building](#building)
    - [Merging](#merging)

# Introduction

My `waffle-chart` library will soon release to support up to three values. I think this is the sweet spot for showing portions on this kind of visualization.

That's why I created `stackable-bar-chart`. This library will visualize either a stack of bars _(like a bar chart)_ or a single bar with proportional segments _(sort of like a one-dimensional treemap)_ based on a collection of values of up to basically any amount. You can also sort from largest to smallest and pass in any colors to help tell the story of your data.

***Chocolate Bars are better than Pies & Donuts***
```js
🍫 > 🍩
```

<img src="/assets/linear.jpg" alt="linear like a one-dimenstional treemap" width="300"/>

Sorting in many ways!

<img src="/assets/stacked-sorted-largest.jpg" alt="stacked sorted largest to smallest" width="300"/>

Tooltip by mouse hover or keyboard focus for smaller or hard to see values

<img src="/assets/linear-tooltip.jpg" alt="linear with tooltip on hover" width="300"/>
<img src="/assets/stacked-tooltip.jpg" alt="stacked with tooltip on hover" width="300"/>
<img src="/assets/linear-keyboard-tooltip.jpg" alt="linear tooltip keyboard focus" width="300"/>
<img src="/assets/stacked-keyboard-tooltip.jpg" alt="stacked tooltip keyboard focus" width="300"/>

Rather focus on the percentage than the value?

<img src="/assets/linear-percentage-tooltip.jpg" alt="stacked sorted largest to smallest" width="300"/>


This is a zero-dependency library built with React, Typescript & Vite. 

No `D3` only `HTML`, `CSS`, and `JS/TS`.

## Usage in commercial projects

If you are using this in a commercial project, please consider leaving a donation/tip. Cheers!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M1EC8PM)

## Limitations

- ***Negative values*** are normalized to 0 since this chart was meant to show proportions of a whole in different ways, so when using `stacked` mode a negative value won't have a bar. If a negative bar is requested enough by users, I will consider supporting it.

## Demo

Live demo via Storybook [coming soon]().

## Supporting reads

[When to use a bar chart instead of a pie chart](https://www.highcharts.com/blog/tutorials/207-when-to-use-a-bar-chart-instead-of-a-pie-chart/)

## API

The chart will render with just the default props, you just want see any bars without any `data`.

The API follows the `ChartProp` interface

| Prop               | Type                                                           | Default     | Notes |
|--------------------|----------------------------------------------------------------|-------------|-------|
|  data              | ChartData[]                                                    | []          |
|  mode              | 'stacked' , 'linear'                                           | 'stacked'    |
|  roundTo           | 'nearest' , 'up' , 'down'                                      | 'nearest'   |
|  sortBy            | 'none' , 'largest' , 'smallest'                                | 'none'      |
|  titlePosition     | 'none' , 'top' , 'bottom' , 'left' , 'right' , 'default'       | 'default'   |
|  showTooltip       | boolean                                                        | true        |
|  showPercentage    | boolean                                                        | false       |
|  clickHandler      | (Partial<BarData>) => any                                      | undefined   |
|  colorBackground   | string                                                         | undefined   |
|  children          | any                                                            | undefined   | Use this to insert any jsx, positioned by titlePosition

```ts
export interface ChartData {
    label: string;
    value: number;
    color?: string;
}

// The part in emitted in click
export interface BarData extends ChartData {
    label: string;
    value: number;
    percentage?: number;
}
```

### Chart title

You can pass anything in `children` as the title and will be subjected to the `titlePosition` prop.

I recommend you add the following styling rule when using `left` or `right` positioning to prevent the title from wrapping: 

```css
.your-title-wrapper-classname {
   whiteSpace: 'nowrap'
}
```

For example:

```jsx
<StackableBarChart {...props}>
    <h3 style={{ whiteSpace: 'nowrap' }}>🍻 Custom title 🍫</h3>
</StackableBarChart>
```
<p>
  <img src="/assets/linear-custom-title-left.jpg" alt="linear with custom title on left" width="300"/>
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  <img src="/assets/stacked-custom-title-bottom.jpg" alt="stacked with custom title on bottom" width="300"/>
</p>

### Colors

You can pass in colors via `color` in `ChartData` or just override in `:root` or some scope above the component for the following:

- `--color-fallback`: Note that this will only change the fallback color for all bars and labels
- `colorBrackground` API prop can be any color but to get the 'punch-out' look in sample images where the text matches the background in the bar, this prop should match the container background.

The colors can be in any valid CSS color prop (HEX, RGB, HSL, RGBA, HSLA, etc) as long as it's passed as a string.

### Fonts and other styling

This chart will inherit the fonts from the the upper scope (e.g., `:root`).

## Installing

Using `NPM`:

```bash
npm i stackable-bar-chart
```

Using `Yarn`:

```bash
yarn add stackable-bar-chart
```

### Usage

I recommend as a practice to wrap components like this in your own wrapper component that exposes the same API. This way you aren't married to this library and can easily swap it out without breaking consumers of your component.

```ts
// Import the CSS at the highest scope possible without coupling e.g. Shared or Vendor or Lib directory.
import 'node_modules/stackable-bar-chart/dist/style.css';
```

```ts
import type { ChartData, ChartProps, BarData } from 'stackable-bar-chart';
import { StackableBarChart } from 'stackable-bar-chart';

type Props = ChartProps;

const MyChart: React.FC<Props> = (props: Props) => <StackableBarChart {...props}>Chart title</StackableBarChart>

export default MyChart;
```

For Remix projects just import the style url in the `links` at the `root.tsx`.

```ts
import stackableBarChartStyleUrl from 'node_modules/stackable-bar-chart/dist/style.css';

export const links: LinksFunction = () => [
    {
        rel: 'stylesheet',
        href: stackableBarChartStyleUrl,
    },
];
```

### Updating

Using `NPM`:
 
```bash
npm update
```

Using `Yarn`:

```bash
yarn upgrade stackable-bar-chart@^

#or 

yarn upgrade stackable-bar-chart --latest
```
## Contributing

This package is free for you to clone and change to your needs in accordance with the MIT license terms. If you want to contribute back to this codebase for improvements, please fork it, create an issue and then initiate a pull request that details the changes and problem or enhancement. Thanks! 🍻

## Developing

Starting development server:

```bash
yarn dev
```

### Testing

Testing methodology follows the testing-library guiding principles and focusing user interactions and integration testing.

Latest coverage report:

```
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |    98.55 |      88 |     100 | 
 Bar               |     100 |      100 |   77.77 |     100 | 
  index.tsx        |     100 |      100 |   77.77 |     100 | 
 ChartContainer    |     100 |      100 |     100 |     100 | 
  index.tsx        |     100 |      100 |     100 |     100 | 
 Label             |     100 |      100 |     100 |     100 | 
  index.tsx        |     100 |      100 |     100 |     100 | 
 StackableBarChart |     100 |    97.56 |    92.3 |     100 | 
  index.tsx        |     100 |    97.56 |    92.3 |     100 | 135
 Tooltip           |     100 |      100 |     100 |     100 | 
  index.tsx        |     100 |      100 |     100 |     100 | 
-------------------|---------|----------|---------|---------|-------------------
```

Testing is built and run with:

- [Vitest](https://vitest.dev/)
- [React-Testing-Library](https://testing-library.com/)

You'll notice very sparse snapshots for each component and a focus on the integrations.

Run tests once:

```bash
yarn test
```

Run tests and watch for changes:

```bash
yarn watch
```

Check coverage:

```bash
yarn coverage
```

Run Vitest UI:

```bash
yarn testui
```

### Building

```
yarn build
```

### Merging

See [Contributing](#contributing).
