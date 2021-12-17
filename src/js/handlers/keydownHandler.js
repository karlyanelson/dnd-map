import DATA_STORE from "../globals/store";

export default function keydownHandler(event) {
  const charactersSelected = DATA_STORE.data.characters.filter(
    (character) => character.selected
  );

  if (!charactersSelected.length) {
    return;
  }

  console.log("i ran");

  if (event.keyCode == "38") {
    // up arrow
    charactersSelected.forEach((char) => (char.y = char.y - 5));
  } else if (event.keyCode == "40") {
    // down arrow
    charactersSelected.forEach((char) => (char.y = char.y + 5));
  } else if (event.keyCode == "37") {
    // left arrow
    charactersSelected.forEach((char) => (char.x = char.x - 5));
  } else if (event.keyCode == "39") {
    // right arrow
    charactersSelected.forEach((char) => (char.x = char.x + 5));
  } else if (event.keyCode == "27") {
    // ESC key
    charactersSelected.forEach((char) => (char.selected = false));
  }
}
