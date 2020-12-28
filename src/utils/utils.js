function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateRandomID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

function getDatafromStorage(id, store) {
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
  store.data = storedDataObject;
}

export { capitalize, generateRandomID, getDatafromStorage };
