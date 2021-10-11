import Reef from "reefjs";
import DATA_STORE from "../globals/store";

const ToggleSettingsBtn = new Reef("#toggleSettingsBtn", {
  store: DATA_STORE,
  template: function (props) {
    let btnText = props.settingsExpanded ? "Hide" : "Show";
    let arrow = props.settingsExpanded ? "arrow arrow-up" : "arrow arrow-down";

    return `
      <button data-toggle-settings class="button-outline flex items-center justify-between" aria-expanded=${props.settingsExpanded}">
        <span>${btnText} Settings</span>
        <span class="ml-2 ${arrow}"></span>
      </button>`;
  },
});

export default ToggleSettingsBtn;
