import React from "react";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";

afterEach(cleanup);

describe("App.js", () => {
  test("Snapshot Test App", () => {
    const component = renderer.create(
      <MockedProvider>
        <App />
      </MockedProvider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
