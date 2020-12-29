import Reef from "reefjs";
import DATA_STORE from "../globals/store";

const ToggleSettingsBtn = new Reef("#toggleSettingsBtn", {
  store: DATA_STORE,
  template: function (props) {
    var btnText = props.settingsExpanded ? "Hide" : "Show";
    var arrow = props.settingsExpanded ? "arrow arrow-up" : "arrow arrow-down";

    return (
      '<button data-toggle-settings class="button-outline content-row" aria-expanded="' +
      props.settingsExpanded +
      '">' +
      "<span>" +
      btnText +
      ' Settings</span><span class="' +
      arrow +
      '"></span></button>'
    );
  },
});

export default ToggleSettingsBtn;
