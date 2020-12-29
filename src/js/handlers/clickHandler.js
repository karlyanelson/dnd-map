import DATA_STORE from "../globals/store";

import addCharacter from "../utils/addCharacter";
import removeCharacter from "../utils/removeCharacter";
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
    var characterContainer = buttonTarget.closest(".character-list-item");

    if (characterContainer) {
      var characterIndex = characterContainer.getAttribute("data-index");
      var character = DATA_STORE.data.characters[characterIndex];
      character.expanded = character.expanded ? false : true;
    }
  }

  if (buttonTarget.matches("#addCharacter")) {
    addCharacter(DATA_STORE);
  }

  if (buttonTarget.matches("[data-zoom]")) {
    zoomMap(buttonTarget.getAttribute("data-zoom"));
  }

  if (buttonTarget.matches("[data-remove]")) {
    var characterContainer = buttonTarget.closest(".character-list-item");

    if (characterContainer) {
      var characterIndex = characterContainer.getAttribute("data-index");
      removeCharacter(characterIndex);
    }
  }
}
