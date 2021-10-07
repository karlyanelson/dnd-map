import DATA_STORE from "../globals/store";
import { globalStore } from "../globals/globalStore";

export default function dragStartHandler(event) {
  if (event.type === "touchstart") {
    if (!event.target.closest(".piece")) {
      return;
    }
    event.target.style.opacity = 0.5;
    globalStore.updateData(
      "draggedElemMouseOffsetX",
      event.touches[0].target.offsetLeft
    );
    // DATA_STORE.data.draggedElemMouseOffsetX = event.touches[0].target.offsetLeft;

    globalStore.updateData(
      "draggedElemMouseOffsetY",
      event.touches[0].target.offsetTop
    );
    // DATA_STORE.data.draggedElemMouseOffsetY = event.touches[0].target.offsetTop;
  } else {
    event.target.style.opacity = 0.5;
    event.dataTransfer.setData("text/plain", event.target.id);
    globalStore.updateData("draggedElemMouseOffsetX", event.offsetX);
    // DATA_STORE.data.draggedElemMouseOffsetX = event.offsetX;
    // DATA_STORE.data.draggedElemMouseOffsetY = event.offsetY;
    globalStore.updateData("draggedElemMouseOffsetY", event.offsetY);

    event.target.style.cursor = "grabbing";
  }
}
