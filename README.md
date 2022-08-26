![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/chiangs/stackable-bar-chart/Release?style=for-the-badge)
![GitHub all releases](https://img.shields.io/github/downloads/chiangs/stackable-bar-chart/total?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/chiangs/stackable-bar-chart?style=for-the-badge)

- [Introduction](#introduction)
  - [Usage in commercial projects](#usage-in-commercial-projects)
  - [Limitations](#limitations)
  - [Demo](#demo)
  - [Supporting reads](#supporting-reads)
  - [API](#api)
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

This is a zero-dependency library built with React, Typescript & Vite. 

No `D3` only `HTML`, `CSS`, and `JS/TS`.

## Usage in commercial projects

If you are using this in a commercial project, please consider leaving a donation/tip. Cheers!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M1EC8PM)

## Limitations

## Demo

Live demo via Storybook [coming soon]().

## Supporting reads

## API

The chart will render with just the default props.

| Prop              | Type                    | Default   | Notes |
|-------------------|-------------------------|-----------|-------|



### Colors

### Fonts and other styling

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
import type { ChartProps } from 'stackable-bar-chart';
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

npm 

```bash
npm update
```

yarn

```bash
yarn upgrade stackable-bar-chart@^
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