import DATA_STORE from "../globals/store";
import handleFiles from "../utils/handleFiles";

export default function inputHandler(event) {
  if (event.target.matches("#mapSrc")) {
    handleFiles(event);
  }

  if (event.target.matches("#pieceSize")) {
    DATA_STORE.data.pieceSize = event.target.value;
  }

  if (event.target.matches("#mapZoom")) {
    DATA_STORE.data.zoom = event.target.value;
  }

  if (
    event.target.matches("[character-data-type]") &&
    event.target.hasAttribute("character-data-index")
  ) {
    let characterIndex = event.target.getAttribute("character-data-index");
    let characterDataType = event.target.getAttribute("character-data-type");

    let valueToStore = event.target.value;

    if (characterDataType === "areaOfEffect") {
      valueToStore =
        !DATA_STORE.data.characters[characterIndex][characterDataType];
    }

    DATA_STORE.data.characters[characterIndex][characterDataType] =
      valueToStore;
  }
}
