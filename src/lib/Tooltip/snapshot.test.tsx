import * as React from "react";
import renderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import type { BarData } from "../__types";
import Tooltip from ".";

describe("Tooltip", () => {
  test("Tooltip component renders correctly", () => {
    const props: BarData = {
      label: "test",
      value: 1,
    };
    const component = renderer.create(<Tooltip {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
