import Reef from "reefjs";
import DATA_STORE from "../globals/store";
import * as _ from "../globals/variables";
import { capitalize, characterBGimg } from "../utils/utils";

function characterListItem(character, index) {
  // Sub Template
  function iconList(icon) {
    let selection = icon === character.icon ? "selected" : "";
    return (
      "<option " +
      selection +
      ' value="' +
      icon +
      '">' +
      capitalize(icon) +
      "</option>"
    );
  }

  // Variables
  var charColor = character.color ? character.color : _.DEFAULT_COLOR;

  var charExpanded = character.expanded ? true : false; // handle undefined

  var contentClass = character.expanded ? "" : " closed ";

  var arrow = character.expanded ? " arrow arrow-up " : " arrow arrow-down ";

  var btnCharName = character.name ? character.name : "<em>Untitled</em>";

  var iconSelectorContent =
    "<option></option>" +
    "<optgroup label='Classes'>" +
    _.iconListClasses.map(iconList).join("") +
    "</optgroup>" +
    "<optgroup label='Races'>" +
    _.iconListRaces.map(iconList).join("") +
    "</optgroup>" +
    "<optgroup label='Monsters'>" +
    _.iconListMonsters.map(iconList).join("") +
    "</optgroup>";

  // Template Content
  return (
    "<li class='character-list-item' data-id='" +
    character.id +
    "'" +
    "data-index='" +
    index +
    "'>" +
    // Character expand/collapse button
    "<button data-toggle-character aria-expanded=" +
    charExpanded +
    " class='character-list-item__trigger content-row'>" +
    "<span class='character-list-item__thumbnail flex-none' style='background-color:" +
    charColor +
    "; " +
    characterBGimg(character) +
    "'></span>" +
    "<span class='flex-auto'>" +
    btnCharName +
    "</span>" +
    "<span class='flex-none" +
    arrow +
    "'></span>" +
    "</button>" +
    "<div class='character-list-item__content " +
    contentClass +
    "'>" +
    "<fieldset>" +
    "<legend class='screenreader-only'>" +
    btnCharName +
    "'s Settings</legend>" +
    "<div class='content-row py-1' >" +
    // Character Name
    "<div class='flex-auto'>" +
    "<label for='name-" +
    character.id +
    "'>Name</label>" +
    "<input placeholder='Enter name...' type='text' character-data-type='name' value='" +
    character.name +
    "' id=name-'" +
    character.id +
    "' character-data-index='" +
    index +
    "'>" +
    "</div>" +
    // Character Color
    "<div class='flex-none'>" +
    "<label for='color-" +
    character.id +
    "'>Color</label>" +
    "<input type='color' character-data-type='color' value='" +
    charColor +
    "' id=color-'" +
    character.id +
    "' character-data-index='" +
    index +
    "'>" +
    "</div>" +
    "</div>" +
    "<div class='py-1'>" +
    // Character Background selector
    // "<fieldset class='radio-group' >" +
    //   "<legend>Background</legend>" +
    //   "<input checked type='radio' name='radio-group-" + character.id + "' id='radio-color-" + character.id + "'>" +
    //   "<label for='radio-color-" + character.id + "'>Color</label>" +
    //   "<input type='radio' name='radio-group-" + character.id + "' id='radio-icon-" + character.id + "'>" +
    //   "<label for='radio-icon-" + character.id + "'>Icon</label>" +
    //   "<input type='radio' name='radio-group-" + character.id + "' id='radio-image-" + character.id + "'>" +
    //   "<label for='radio-image-" + character.id + "'>Image</label>" +
    // "</fieldset>" +

    // Character Icon
    "<label for='char-icon-" +
    character.id +
    "'>Icon</label>" +
    "<select name='Icon' character-data-type='icon' value='" +
    character.icon +
    "' id=char-icon-'" +
    character.id +
    "' character-data-index='" +
    index +
    "'>" +
    iconSelectorContent +
    "</select>" +
    // Character Image
    "<label for='char-image-" +
    character.id +
    "'>Image URL</label>" +
    "<input placeholder='None' type='url' character-data-type='image' value='" +
    character.image +
    "' id=char-image-'" +
    character.id +
    "' character-data-index='" +
    index +
    "'>" +
    "</div>" +
    "<div class='flex justify-between items-end py-1'>" +
    // Character Size
    "<div>" +
    "<label for='size-" +
    character.id +
    "'>Size</label>" +
    "<input type='number' character-data-type='size' value='" +
    character.size +
    "' id=size-'" +
    character.id +
    "' character-data-index='" +
    index +
    "'>" +
    "</div>" +
    // Character X Postion
    "<div>" +
    "<label for='posX-" +
    character.id +
    "'>X</label>" +
    "<input type='number' step='5' character-data-type='x' value='" +
    character.x +
    "' id=posX-'" +
    character.id +
    "' character-data-index='" +
    index +
    "'>" +
    "</div>" +
    // Character Y Postion
    "<div>" +
    "<label for='posY-" +
    character.id +
    "'>Y</label>" +
    "<input type='number' character-data-type='y' value='" +
    character.y +
    "' id=posY-'" +
    character.id +
    "' character-data-index='" +
    index +
    "'>" +
    "</div>" +
    // Remove Character Button
    "<button data-remove class='button-error' character-data-index='" +
    index +
    "'>Remove</button>" +
    "</div>" +
    "</fieldset>" +
    "</div>" +
    "</li>"
  );
}

const CharacterList = new Reef("#characterList", {
  store: DATA_STORE,
  template: function (props) {
    return "<ul>" + props.characters.map(characterListItem).join("") + "</ul>";
  },
});

export default CharacterList;
