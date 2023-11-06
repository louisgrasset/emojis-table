import { render } from "@testing-library/react";
import React from "react";
import { Notification } from "../notification";

describe("notification", () => {
  it("should render", () => {
    const result = render(<Notification />);
    expect(
      result.container.getElementsByClassName(".notification__icon"),
    ).toBeTruthy();
    expect(
      result.container.getElementsByClassName(".notification__content"),
    ).toBeTruthy();
  });
});
