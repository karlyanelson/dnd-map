import DATA_STORE from "../globals/store";

export default function touchMoveHandler(event) {
  if (!event.target.closest(".piece")) {
    return;
  }
  DATA_STORE.data.currentTouchPosX = event.touches[0].pageX;
  DATA_STORE.data.currentTouchPosY = event.touches[0].pageY;
}
