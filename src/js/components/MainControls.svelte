<script>
import { globalStore } from "../globals/globalStore";
import ToggleSettingsButton from "./ToggleSettingsButton";
import UploadMap from "./UploadMap";
import ManageCharacters from "./ManageCharacters.svelte";
import Footer from "./Footer.svelte";

$: controlsOpen = $globalStore.settingsExpanded;

$: controlsClass = controlsOpen ? '' : 'collapsed'

</script>
<div
  id="mainControls"
  class={`main-controls fixed bottom-20 sm:bottom-4 left-4 top-4 py-2 px-4 border-1 border-black bg-ink bg-opacity-90 rounded-lg z-50 overflow-y-auto w-80 ${controlsClass}`}
>
  <header class="pb-2 flex items-center justify-between">
    <h1>D&D Map</h1>
    <ToggleSettingsButton open={controlsOpen} />
  </header>
  <div id="mainControlsContent" class="main-controls-content">
    <UploadMap />
    <ManageCharacters />
    <Footer />
  </div>
</div>

<style>
.collapsed {
  padding-top: .5rem;
  padding-bottom: .5rem;
  bottom: inherit;
}

.collapsed header {
  padding: 0;
}

.collapsed .main-controls-content {
  display: none;
}
</style>