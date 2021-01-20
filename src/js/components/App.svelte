<script>
  import * as _ from "../globals/variables";
  import { globalStore } from "../globals/globalStore";
  
  import MainControls from "./MainControls";
  import MapControls from "./MapControls";
  import Map from "./Map";

  import getDataFromStorage from "../utils/getDataFromStorage"

  // const storedData = localStorage.getItem(_.STORAGE_ID);
  // const emptyData = {
  //   // map: "https://i.imgur.com/KYVBIZd.jpeg",
  //   map: null,
  //   settingsExpanded: true,
  //   pieceSize: 24,
  //   zoom: 100,
  //   characters: [],
  // };
  // const storedDataObject = storedData ? JSON.parse(storedData) : emptyData;

  // globalStore.set(storedDataObject)

  getDataFromStorage(_.STORAGE_ID, globalStore);

  $globalStore.map
    ? document.body.classList.remove("no-map")
    : document.body.classList.add("no-map");
</script>

<MainControls />
<MapControls />
<Map />

