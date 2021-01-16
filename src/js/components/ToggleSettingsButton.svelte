<script>
import { globalStore } from "../globals/store";
import * as _ from "../globals/variables";


let settingsExpanded = true;
let btnText = settingsExpanded ? "Hide" : "Show";
let arrow = settingsExpanded ? "arrow arrow-up" : "arrow arrow-down";

// console.log($globalStore)

function clickHandler(event) {
  console.log('hey')
  settingsExpanded = settingsExpanded ? false : true;

  settingsExpanded
    ? _.mainControlsContent.classList.remove("collapsed")
    : _.mainControlsContent.classList.add("collapsed");

  btnText = settingsExpanded ? "Hide" : "Show";
  arrow = settingsExpanded ? "arrow arrow-up" : "arrow arrow-down";
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