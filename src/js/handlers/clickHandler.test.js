import { JSDOM } from "jsdom";
import {
  fireEvent,
  // getByText,
  // findByText,
  within,
  getQueriesForElement,
  screen,
  getByRole,
  createEvent,
} from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import fs from "fs";
import path from "path";

import clickHandler from "./clickHandler";
import addCharacter from "../utils/addCharacter";
import { get } from "https";

import CharacterList from "../components/CharacterList";

import fetch from "node-fetch";

test("dist/index.html - build - scripts inline - no Reef :(", async () => {
  // only works with bundled js
  // only works with inline js
  // works with doSomething() function, but not Reef things

  const html = fs.readFileSync(
    path.resolve(__dirname, "../../../dist/index.html"),
    "utf8"
  );

  const dom = new JSDOM(html, {
    url: "http://localhost:1234/",
    runScripts: "dangerously",
    beforeParse(window) {
      window.requestAnimationFrame = () => {};
    },
  });

  // const container = dom.window.document.body;
  const container = dom.window.document.querySelector("#sectionCharacters");

  const { getByText, findByText } = getQueriesForElement(container);
  const addCharacterButton = getByText("Add Character");
  userEvent.click(addCharacterButton);
  expect(await findByText("I did it!")).toBeInTheDocument();
});

xtest("JSDOM.fromFile('./dist/index.html' - build - inline - Reef?", async () => {
  // only works with bundled js
  // only works with inline js
  // only works with inline css
  // ideally would work with scripts not inline but doesn't quite yet

  const options = {
    runScripts: "dangerously",
    // resources: "usable",
  };

  // Error: Uncaught [SecurityError: localStorage is not available for opaque origins] ?

  const dom = await JSDOM.fromFile("./dist/index.html", options);

  const container = dom.window.document.querySelector("#sectionCharacters");

  const { getByText, findByText } = getQueriesForElement(container);
  const addCharacterButton = getByText("Add Character");
  userEvent.click(addCharacterButton);
  expect(await findByText("I did it!")).toBeInTheDocument();
});

xtest("http://localhost:1234/index.html - localhost - scripts NOT inline - Reef?", async () => {
  // will load external script tag
  // but need to run localhost at the same time as tests

  ///// need index.js to not be renamed in dist to get this to work
  //// need to use RollUp to change dist/src.234234rwer.js to be dist/index.js so that
  ////     the 'index.js' link referenced in index.html actually resolves
  // const html = fs.readFileSync(
  //   path.resolve(__dirname, "../../index.html"),
  //   "utf8"
  // );
  /////

  ////// hacky node-fetch option
  const localHost = await fetch("http://localhost:1234/index.html");
  const html = await localHost.text();
  /////

  const dom = new JSDOM(html, {
    url: "http://localhost:1234/",
    runScripts: "dangerously",
    resources: "usable",
    beforeParse(window) {
      window.requestAnimationFrame = () => {};
    },
  });

  const container = dom.window.document.querySelector("#sectionCharacters");

  const { getByText, findByText } = getQueriesForElement(container);
  const addCharacterButton = getByText("Add Character");
  userEvent.click(addCharacterButton);
  expect(await findByText("I did it!")).toBeInTheDocument();
});

// test("Add Character button adds character", () => {
//   // const container = document.querySelector("#mainControlsContent");

//   const addCharacterButton = screen.getByText("Add Character");

//   const event = userEvent.click(addCharacterButton);

//   // const myEvent = createEvent.click(addCharacterButton);

//   console.log(event);

//   clickHandler(event);

//   // expect(screen.getByText("Character 1")).toBeVisible();
// });

// test("Add Character button adds character", () => {
//   document.body.innerHTML = `
//     <button class="button" id="addCharacter">Add Character</button>
//     <div id="characterList"></div>
//   `;

//   const addCharacterButton = screen.getByRole("button", {
//     name: /Add Character/i,
//   });
//   const event = userEvent.click(addCharacterButton);

//   // const myEvent = createEvent.click(addCharacterButton);

//   // console.log("event", event);

//   // clickHandler(event);

//   // expect(screen.getByText("Character 1")).toBeVisible();
// });

// test("Add Character button adds character", () => {
//   document.body.innerHTML = `
//     <button class="button" id="addCharacter">Add Character</button>
//     <div id="characterList"></div>
//   `;

//   const addCharacterButton = screen.getByText("Add Character");
//   userEvent.click(addCharacterButton);

//   expect(screen.getByText("Character 1")).toBeVisible();
// });

// https://testing-library.com/docs/ecosystem-jest-dom
// test("uses jest-dom", () => {
//   document.body.innerHTML = `
//     <span data-testid="not-empty"><span data-testid="empty"></span></span>
//     <div data-testid="visible">Visible Example</div>
//   `;

//   expect(screen.queryByTestId("not-empty")).not.toBeEmptyDOMElement();
//   expect(screen.getByText("Visible Example")).toBeVisible();
// });

//////////

// test("Add Character button adds character", () => {
//   // const container = document.querySelector("#mainControlsContent");

//   const addCharacterButton = screen.getByText("Add Character");

//   const event = userEvent.click(addCharacterButton);

//   // const myEvent = createEvent.click(addCharacterButton);

//   console.log(event);

//   clickHandler(event);

//   // expect(screen.getByText("Character 1")).toBeVisible();
// });

// test("Add Character button adds character", () => {
//   document.body.innerHTML = `
//     <button class="button" id="addCharacter">Add Character</button>
//     <div id="characterList"></div>
//   `;

//   const addCharacterButton = screen.getByRole("button", {
//     name: /Add Character/i,
//   });
//   const event = userEvent.click(addCharacterButton);

//   // const myEvent = createEvent.click(addCharacterButton);

//   // console.log("event", event);

//   // clickHandler(event);

//   // expect(screen.getByText("Character 1")).toBeVisible();
// });

// test("Add Character button adds character", () => {
//   document.body.innerHTML = `
//     <button class="button" id="addCharacter">Add Character</button>
//     <div id="characterList"></div>
//   `;

//   const addCharacterButton = screen.getByText("Add Character");
//   userEvent.click(addCharacterButton);

//   expect(screen.getByText("Character 1")).toBeVisible();
// });

// https://testing-library.com/docs/ecosystem-jest-dom
// test("uses jest-dom", () => {
//   document.body.innerHTML = `
//     <span data-testid="not-empty"><span data-testid="empty"></span></span>
//     <div data-testid="visible">Visible Example</div>
//   `;

//   expect(screen.queryByTestId("not-empty")).not.toBeEmptyDOMElement();
//   expect(screen.getByText("Visible Example")).toBeVisible();
// });

// xtest("click add character", () => {
//   document.body.innerHTML = `
//   <section id="sectionCharacters">
//       <button id="addCharacter"> Add Character</button>
//       <div id="characterList"></div>
//     </section>
//   `;

//   const container = document.querySelector("#sectionCharacters");

//   const characterList = CharacterList.render();
// });

// https://dev.to/thawkin3/how-to-unit-test-html-and-vanilla-javascript-without-a-ui-framework-4io
// https://github.com/thawkin3/dom-testing-demo/tree/master/src

// test("test index.html click add character", async () => {
//   // const html = fs.readFileSync(
//   //   // "http://localhost:1234/index.html",
//   //   // path.resolve(__dirname, "../../../dist/index.html"),
//   //   path.resolve(__dirname, "../../index.html"),
//   //   "utf8"
//   // );

//   // https://stackoverflow.com/questions/53236280/how-to-load-local-javascript-file-with-jsdom
//   // JSDOM.env(
//   //   {
//   //     html: html,
//   //     // documentRoot: __dirname + "/js",
//   //     documentRoot: __dirname,
//   //     scripts: ["index.js"],
//   //   },
//   //   function (err, window) {
//   //     console.log(window.loadFromJSDOM);
//   //   }
//   // );

//   // const dom = new JSDOM(html, {
//   //   // url: "http://localhost:1234/",
//   //   runScripts: "dangerously",
//   //   // https://github.com/jsdom/jsdom#loading-subresources
//   //   resources: "usable",
//   //   beforeParse(window) {
//   //     window.requestAnimationFrame = () => {};
//   //   },
//   // });

//   const options = {
//     runScripts: "dangerously",
//     resources: "usable",
//   };

//   // let dom;
//   // JSDOM.fromFile("../../index.html", options).then((content) => {
//   //   // console.log(content.serialize());

//   //   dom = content;
//   // });

//   // const dom = await JSDOM.fromFile("../../index.html", options);
//   const dom = await JSDOM.fromFile("./dist/index.html", options);

//   ////// Maybe how to get screen to work?
//   /////// https://stackoverflow.com/questions/45068932/jsdom-env-not-working-on-node-js-c9
//   // var jsdom = require('jsdom');
//   // const { JSDOM } = jsdom;
//   // const { window } = new JSDOM();
//   // const { document } = (new JSDOM('')).window;
//   // global.document = document;

//   // var $ = jQuery = require('jquery')(window);
//   //////
//   // const container = dom.window.document.body;
//   const container = dom.window.document.querySelector("#sectionCharacters");

//   const { getByText, findByText } = getQueriesForElement(container);
//   const addCharacterButton = getByText("Add Character");
//   userEvent.click(addCharacterButton);
//   expect(await findByText("I did it!")).toBeInTheDocument();
// });

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

// https://dev.to/snowleo208/things-i-learned-after-writing-tests-for-js-and-html-page-4lja
