import React from "react";
import { shallow } from "enzyme";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("default value check", () => {
  it("checking count's initial value", () => {
    const comp = shallow(<App />)
      .find("span")
      .text();
    expect(comp).toEqual("Count: 0");
  });
});
