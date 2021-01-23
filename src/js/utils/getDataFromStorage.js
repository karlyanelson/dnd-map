export default function getDataFromStorage(id, store) {
  const storedData = localStorage.getItem(id);
  // TODO: validate storedData before setting store to that data

  const emptyData = {
    map: null,
    settingsExpanded: true,
    pieceSize: 24,
    zoom: 100,
    characters: [],
  };
  const storedDataObject = storedData ? JSON.parse(storedData) : emptyData;

  store.set(storedDataObject);
}
