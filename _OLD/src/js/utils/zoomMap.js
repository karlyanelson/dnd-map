import DATA_STORE from "../globals/store";

export default function zoomMap(value) {
  DATA_STORE.data.zoom =
    value === "out"
      ? parseInt(DATA_STORE.data.zoom) - 10
      : parseInt(DATA_STORE.data.zoom) + 10;
}
