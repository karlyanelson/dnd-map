import * as _ from "../globals/variables";
import DATA_STORE from "../globals/store";

export default function renderHandler() {
  if (_.pieceSizeInput) {
    _.pieceSizeInput.value = DATA_STORE.data.pieceSize;
  }
  if (_.mapZoomInput) {
    _.mapZoomInput.value = DATA_STORE.data.zoom;
  }
  if (_.characterCount) {
    _.characterCount.textContent = DATA_STORE.data.characters.length;
  }
  if (_.mapSrcLabel) {
    _.mapSrcLabel.textContent = DATA_STORE.data.map
      ? "Change Map"
      : "Upload Map";
  }

  if (_.mainControlsContent) {
    DATA_STORE.data.settingsExpanded
      ? _.mainControlsContent.classList.remove("collapsed")
      : _.mainControlsContent.classList.add("collapsed");
  }

  DATA_STORE.data.map
    ? document.body.classList.remove("no-map")
    : document.body.classList.add("no-map");

  localStorage.setItem(_.STORAGE_ID, JSON.stringify(DATA_STORE.data));
}
