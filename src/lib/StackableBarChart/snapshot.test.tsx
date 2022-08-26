import * as React from "react";
import renderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import StackableBarChart from ".";

describe("StackableBarChart", () => {
  test("StackableBarChart component renders correctly", () => {
    const component = renderer.create(<StackableBarChart />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
