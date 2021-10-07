<script>
  // Globals
  import * as _ from "../globals/variables";
  import { globalStore } from "../globals/globalStore";
  
  // Components
  import MainControls from "./MainControls";
  import MapControls from "./MapControls";
  import MapWithPieces from "./MapWithPieces";

  // Utils
  import getDataFromStorage from "../utils/getDataFromStorage"

  // Event Handlers
  import dragEndHandler from "../handlers/dragEndHandler";
  import dragStartHandler from "../handlers/dragStartHandler";
  import dropHandler from "../handlers/dropHandler";
  import touchMoveHandler from "../handlers/touchMoveHandler";

  function dropHandlerContainer (event) {
    dropHandler(event, globalStore, $globalStore)
  }

  // Inits
  getDataFromStorage(_.STORAGE_ID, globalStore);

  $globalStore.map
    ? document.body.classList.remove("no-map")
    : document.body.classList.add("no-map");

  // Events
  document.addEventListener("dragstart", dragStartHandler, false);

  document.addEventListener("touchstart", dragStartHandler, false);

  document.addEventListener("touchmove", touchMoveHandler, false);

  document.addEventListener(
    "dragover",
    function (event) {
      event.preventDefault();
    },
    false
  );

  document.addEventListener("drop", dropHandlerContainer, false);

  document.addEventListener("touchend", dropHandlerContainer, false);

  document.addEventListener("dragend", dragEndHandler, false);
</script>

<MainControls />
<MapControls />
<MapWithPieces />

