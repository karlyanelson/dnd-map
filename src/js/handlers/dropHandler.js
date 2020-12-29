import DATA_STORE from "../globals/store";

export default function dropHandler(event) {
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

  const zoomRatio = DATA_STORE.data.zoom / 100;

  const character = DATA_STORE.data.characters[characterIndex];

  character.dragged = true;

  if (event.type === "touchend") {
    draggedElemPosX =
      DATA_STORE.data.currentTouchPosX -
      DATA_STORE.data.draggedElemMouseOffsetX;
    draggedElemPosY =
      DATA_STORE.data.currentTouchPosY -
      DATA_STORE.data.draggedElemMouseOffsetY;
  } else {
    draggedElemPosX = event.pageX - DATA_STORE.data.draggedElemMouseOffsetX;
    draggedElemPosY = event.pageY - DATA_STORE.data.draggedElemMouseOffsetY;
  }

  character.x = draggedElemPosX / zoomRatio;
  character.y = draggedElemPosY / zoomRatio;
}
