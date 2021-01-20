<script>
import { globalStore } from "../globals/globalStore";

export let open = true;

$: btnText = open ? "Hide" : "Show";
$: arrow = open ? "arrow arrow-up" : "arrow arrow-down";

function clickHandler(event) {
  globalStore.updateData('settingsExpanded', !open)
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