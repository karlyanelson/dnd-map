import DATA_STORE from "../globals/store";

export default function getDataFromStorage(id) {
  const storedData = localStorage.getItem(id);
  const emptyData = {
    // map: "https://i.imgur.com/KYVBIZd.jpeg",
    map: null,
    settingsExpanded: true,
    pieceSize: 24,
    zoom: 100,
    characters: [],
  };
  const storedDataObject = storedData ? JSON.parse(storedData) : emptyData;
  DATA_STORE.data = storedDataObject;
}
