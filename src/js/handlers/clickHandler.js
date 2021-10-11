import DATA_STORE from "../globals/store";

import addCharacter from "../utils/addCharacter";
import removeCharacter from "../utils/removeCharacter";
import removeAllCharacters from "../utils/removeAllCharacters";
import duplicateCharacter from "../utils/duplicateCharacter";
import zoomMap from "../utils/zoomMap";

export default function clickHandler(event) {
  if (!event.target.closest("button")) {
    return;
  }

  let buttonTarget = event.target.closest("button");

  if (buttonTarget.matches("[data-toggle-settings]")) {
    DATA_STORE.data.settingsExpanded = DATA_STORE.data.settingsExpanded
      ? false
      : true;
  }

  if (buttonTarget.matches("[data-toggle-character]")) {
    let characterContainer = buttonTarget.closest(".characterListItem");

    if (characterContainer) {
      let characterIndex = characterContainer.getAttribute("data-index");
      let character = DATA_STORE.data.characters[characterIndex];
      character.expanded = character.expanded ? false : true;
    }
  }

  if (buttonTarget.matches("#addCharacter")) {
    addCharacter();
  }

  if (buttonTarget.matches("[data-zoom]")) {
    zoomMap(buttonTarget.getAttribute("data-zoom"));
  }

  if (buttonTarget.matches("#removeAllBtn")) {
    removeAllCharacters(buttonTarget, false);
  }

  if (buttonTarget.matches("#removeAllCancelBtn")) {
    removeAllCharacters(buttonTarget, true);
  }

  if (buttonTarget.matches("[data-remove]")) {
    let characterContainer = buttonTarget.closest(".characterListItem");

    if (characterContainer) {
      let characterIndex = characterContainer.getAttribute("data-index");
      removeCharacter(characterIndex);
    }
  }

  if (buttonTarget.matches("[data-duplicate]")) {
    let characterContainer = buttonTarget.closest(".characterListItem");

    if (characterContainer) {
      let characterIndex = characterContainer.getAttribute("data-index");
      duplicateCharacter(characterIndex);
    }
  }
}
