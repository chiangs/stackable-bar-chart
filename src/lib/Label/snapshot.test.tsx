import * as React from "react";
import renderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import Label from ".";

describe("Label", () => {
  test("Label component renders correctly", () => {
    const component = renderer.create(<Label>Test</Label>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
