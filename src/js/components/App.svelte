<script>
  import * as _ from "../globals/variables";
  import { globalStore } from "../globals/globalStore";
  
  import MainControls from "./MainControls";
  import MapControls from "./MapControls";
  import Map from "./Map";

  import getDataFromStorage from "../utils/getDataFromStorage"

  getDataFromStorage(_.STORAGE_ID, globalStore);

  $globalStore.map
    ? document.body.classList.remove("no-map")
    : document.body.classList.add("no-map");
</script>

<MainControls />
<MapControls />
<Map />

