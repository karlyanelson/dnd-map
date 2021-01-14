import { getByText, getByRole } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Reef from "reefjs";

import DATA_STORE from "../globals/store";

import ToggleSettingsBtn from "./ToggleSettingsBtn";

test("Reef", () => {
  document.body.innerHTML = `
  <div id="app"></div>
`;

  const app = new Reef("#app", {
    template: "<h1>Hello, world!</h1>",
  });

  const container = app.render();

  const hello = getByText(container, "Hello, world!");
  expect(hello).toBeInTheDocument();
});

test("toggle button says show by default", () => {
  document.body.innerHTML = `
  <div id="toggleSettingsBtn"></div>
`;

  const container = ToggleSettingsBtn.render();

  const button = getByRole(container, "button");

  expect(button).toHaveTextContent("Show Settings");
});

test("toggle button says hide when clicked", () => {
  document.body.innerHTML = `
  <div id="toggleSettingsBtn"></div>
`;

  const container = ToggleSettingsBtn.render();

  const button = getByRole(container, "button");

  console.log("before", store);

  userEvent.click(button);

  console.log("after", store);

  expect(button).toHaveTextContent("Hide Settings");
});
