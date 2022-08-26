import * as React from "react";
import renderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import type { BarData, BarProps } from "../__types";
import Bar from ".";

describe("Bar", () => {
  test("Bar component renders correctly", () => {
    const props: BarProps = {
      value: 1,
      label: "test",
      // color: undefined,
      // background: undefined,
      // portion: 0,
      // renderPortion: 0,
      // mode: "stacked",
      // showPercentage: false,
      // showTooltip: false,
      // revealTooltipHandler: (data: BarData | null) => data,
    };
    const component = renderer.create(<Bar {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
