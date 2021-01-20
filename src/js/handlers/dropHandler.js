export default function dropHandler(event, store, storeData) {
  let draggedElemPosX;
  let draggedElemPosY;
  let draggedElemId;

  if (event.type === "touchend") {
    if (event.target.closest(".piece")) {
      draggedElemId = event.target.closest(".piece").id;
    } else {
      return;
    }
  } else {
    event.preventDefault();
    draggedElemId = event.dataTransfer.getData("text");
  }
  const draggedElem = document.getElementById(draggedElemId);
  const characterIndex = draggedElem.getAttribute("data-index");

  if (!characterIndex) {
    return;
  }

  const zoomRatio = storeData.zoom / 100;

  // const character = $globalStore.characters[characterIndex];

  store.updateCharacter(characterIndex, "dragged", true);

  // character.dragged = true;

  if (event.type === "touchend") {
    draggedElemPosX =
      storeData.currentTouchPosX - storeData.draggedElemMouseOffsetX;
    draggedElemPosY =
      storeData.currentTouchPosY - storeData.draggedElemMouseOffsetY;
  } else {
    draggedElemPosX = event.pageX - storeData.draggedElemMouseOffsetX;
    draggedElemPosY = event.pageY - storeData.draggedElemMouseOffsetY;
  }

  store.updateCharacter(characterIndex, "x", draggedElemPosX / zoomRatio);
  store.updateCharacter(characterIndex, "y", draggedElemPosY / zoomRatio);

  // character.x = draggedElemPosX / zoomRatio;
  // character.y = draggedElemPosY / zoomRatio;
}
