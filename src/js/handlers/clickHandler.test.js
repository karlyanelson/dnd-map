import { JSDOM } from "jsdom";
import {
  fireEvent,
  getByText,
  within,
  getQueriesForElement,
  screen,
} from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import fs from "fs";
import path from "path";

import clickHandler from "./clickHandler";
import addCharacter from "../utils/addCharacter";

// https://testing-library.com/docs/ecosystem-jest-dom
// test("uses jest-dom", () => {
//   document.body.innerHTML = `
//     <span data-testid="not-empty"><span data-testid="empty"></span></span>
//     <div data-testid="visible">Visible Example</div>
//   `;

//   expect(screen.queryByTestId("not-empty")).not.toBeEmptyDOMElement();
//   expect(screen.getByText("Visible Example")).toBeVisible();
// });

// https://dev.to/thawkin3/how-to-unit-test-html-and-vanilla-javascript-without-a-ui-framework-4io
// https://github.com/thawkin3/dom-testing-demo/tree/master/src
describe("clickHandler", () => {
  const html = fs.readFileSync(
    path.resolve(__dirname, "../../../dist/index.html"),
    "utf8"
  );

  let dom;
  let body;

  beforeEach(() => {
    dom = new JSDOM(html, {
      url: "http://localhost:1234/",
      runScripts: "dangerously",
      resources: "usable",
      beforeParse(window) {
        window.requestAnimationFrame = () => {};
      },
    });
    // https://github.com/jsdom/jsdom#loading-subresources
    body = dom.window.document.body;
  });

  it("click add character", () => {
    const addCharacterButton = getByText(body, "Add Character");
    fireEvent.click(addCharacterButton);
    expect(getByText(body, "Character 1")).toBeInTheDocument();
  });
});

// https://github.com/kentcdodds/dom-testing-library-with-anything/blob/master/vanilla.test.js
// test("add character", () => {
//   const button = document.createElement("button");
//   button.textContent = "Add Character";
//   button.id = "addCharacter";
//   const { getByText } = getQueriesForElement(button);
//   const addCharacterButton = getByText("Add Character");
//   userEvent.click(addCharacterButton);
//   expect(clickHandler).toHaveBeenCalled();
//   // expect(addCharacter).toHaveBeenCalled();
// });
