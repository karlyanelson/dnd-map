import DATA_STORE from "../globals/store";

export default function dragStartHandler(event) {
  if (event.type === "touchstart") {
    if (!event.target.closest(".piece")) {
      return;
    }

    event.target.style.opacity = 0.5;
    DATA_STORE.data.draggedElemMouseOffsetX =
      event.touches[0].target.offsetLeft;
    DATA_STORE.data.draggedElemMouseOffsetY = event.touches[0].target.offsetTop;

    const characterIndex = event.target.getAttribute("data-index");
    const character = DATA_STORE.data.characters[characterIndex];
    character.dragged = true;
  } else {
    event.target.style.opacity = 0.5;
    event.dataTransfer.setData("text/plain", event.target.id);
    DATA_STORE.data.draggedElemMouseOffsetX = event.offsetX;
    DATA_STORE.data.draggedElemMouseOffsetY = event.offsetY;

    event.target.style.cursor = "grabbing";

    const characterIndex = event.target.getAttribute("data-index");
    const character = DATA_STORE.data.characters[characterIndex];
    character.dragged = true;
  }
}
