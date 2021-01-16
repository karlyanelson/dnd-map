<script>
import { globalStore } from "../globals/globalStore";
import * as _ from "../globals/variables";

let btnText = $globalStore.settingsExpanded ? "Hide" : "Show";
let arrow = $globalStore.settingsExpanded ? "arrow arrow-up" : "arrow arrow-down";

function clickHandler(event) {
  if ($globalStore.settingsExpanded === true) {
    globalStore.updateData('settingsExpanded', false);
    console.log('globalStore', $globalStore)
    _.mainControlsContent.classList.add("collapsed");
  } else {
    globalStore.updateData('settingsExpanded', true);
    _.mainControlsContent.classList.remove("collapsed");
  }
}
</script>

<button 
  on:click={clickHandler}
  data-toggle-settings 
  class="button-outline flex items-center justify-between" 
  >
  <span>{btnText} Settings</span>
  <span class={`ml-2 ${arrow}`}></span>
</button>


<!-- <button 
  on:click="{() => $globalStore.settingsExpanded = false}"
  data-toggle-settings 
  class="button-outline flex items-center justify-between" 
  aria-expanded={$globalStore.settingsExpanded}
  >
  <span>{$globalStore.settingsExpanded}</span>
  <span>{btnText} Settings</span>
  <span class={`ml-2 ${arrow}`}></span>
</button> -->