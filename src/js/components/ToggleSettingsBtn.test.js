import { screen, getByText, getByRole } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Reef from "reefjs";

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

  userEvent.click(button);

  expect(button).toHaveTextContent("Hide Settings");
});
