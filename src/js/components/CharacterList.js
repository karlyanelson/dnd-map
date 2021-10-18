import Reef from "reefjs";
import DATA_STORE from "../globals/store";
import * as _ from "../globals/variables";
import characterListItem from "./characterListItem";

const expandCollapse = `
  <div class="py-2">
    <button data-characters-expanded="false" class="button-outline button-small mr-2">– Collapse All</button>
    <button data-characters-expanded="true" class="button-outline button-small">+ Expand All</button>
  </div>
`;

const removeBtn = `
  <div class="text-center mt-6">
    <button id="removeAllBtn" remove-confirmed="false" class="button-danger button-small">Remove All Characters</button>
  </div>
`;
const CharacterList = new Reef("#characterList", {
  store: DATA_STORE,
  template: function (props) {
    if (props.characters.length > 0) {
      return `
      ${expandCollapse}
      <ul>${props.characters.map(characterListItem).join("")}</ul>
      ${removeBtn}
      `;
    } else {
      return "";
    }
  },
});

export default CharacterList;
