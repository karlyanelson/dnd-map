import Reef from "reefjs";
import DATA_STORE from "../globals/store";
import * as _ from "../globals/variables";
import { capitalize } from "../utils/utils";
import characterBGimg from "../utils/characterBGimg";

function characterListItem(character, index) {
  console.log("characterListItem ran");
  // Sub Template
  function iconList(icon) {
    let selection = icon === character.icon ? "selected" : "";
    return `
      <option ${selection} value='${icon}'> 
        ${capitalize(icon)} 
      </option>
    `;
  }

  // Variables
  var charColor = character.color ? character.color : _.DEFAULT_COLOR;

  var charExpanded = character.expanded ? true : false; // handle undefined

  var hidden = character.expanded ? "" : " hidden ";

  var arrow = character.expanded ? " arrow arrow-up " : " arrow arrow-down ";

  var btnCharName = character.name ? character.name : "<em>Untitled</em>";

  var iconSelectorContent = `
    <option></option>

    <optgroup label='Classes'>
      ${_.iconListClasses.map(iconList).join("")}
    </optgroup>

    <optgroup label='Races'>
      ${_.iconListRaces.map(iconList).join("")}
    </optgroup>

    <optgroup label='Monsters'>
      ${_.iconListMonsters.map(iconList).join("")}
    </optgroup>
    `;

  // Template Content
  return `
    <li 
      class='characterListItem border rounded my-3 transition-all duration-300 ease-in-out bg-ink ${
        charExpanded
          ? "shadow-high relative z-10 border-gray"
          : "shadow-button border-black"
      }' 
      data-id='${character.id}' 
      data-index='${index}'
    > 
      <button data-toggle-character 
        aria-expanded=${charExpanded} 
        class='${
          charExpanded ? "" : "hover:shadow-high hover:bg-ink"
        } p-2 w-full text-white text-left text-base break-all flex items-center justify-between'> 
        <span 
          class='inline-block rounded-circle h-6 w-6 border border-black bg-no-repeat bg-center bg-cover flex-none' 
          style='background-color: ${charColor}; ${characterBGimg(character)}'
        >
        </span> 
        <span class='ml-2 flex-auto'> ${btnCharName} </span> 
        <span class='ml-2 flex-none ${arrow}'></span> 
      </button> 

      <div class='border-t border-gray px-4 pt-2 pb-4 ${hidden} '> 
        <fieldset> 
          <legend class='screenreader-only'>${btnCharName}'s Settings</legend> 
          <div class='flex items-center justify-between py-1' > 
            <div class='flex-auto'> 
              <label for='name-${character.id}'>Name</label> 
              <input 
                placeholder='Enter name...' type='text' 
                character-data-type='name' 
                value='${character.name}' 
                id='name-${character.id}' 
                character-data-index='${index}'
              > 
            </div> 
            <div class='flex-none ml-2'> 
              <label for='color-${character.id}'>Color</label> 
              <input 
                type='color' 
                character-data-type='color' 
                value='${charColor}' 
                id='color-${character.id}' 
                character-data-index='${index}'
              > 
            </div> 
          </div> 

          <div class='py-1'> 
            <label for='char-icon-${character.id}'>Icon</label> 
            <select 
              name='Icon' 
              character-data-type='icon' 
              value='${character.icon}' 
              id='char-icon-${character.id}' 
              character-data-index='${index}'
            > 
              ${iconSelectorContent} 
            </select> 
          </div>

          <div class='py-1'> 
            <label for='char-image-${character.id}'>Image URL</label> 
            <input 
              placeholder='None' 
              type='url' 
              character-data-type='image' 
              value='${character.image}' 
              id='char-image-${character.id}' 
              character-data-index='${index}'
            > 
          </div> 

          <div class='flex justify-between items-end py-1'> 
            <div> 
              <label for='size-${character.id}'>Size</label> 
              <input 
                type='number' 
                character-data-type='size' 
                value='${character.size}' 
                id='size-${character.id}' 
                character-data-index='${index}'
              > 
            </div> 

            <div> 
              <label 
                for='posX-${character.id}'>X</label> 
                <input 
                  type='number' 
                  step='5' 
                  character-data-type='x' 
                  value='${character.x}' 
                  id='posX-${character.id}' 
                  character-data-index='${index}'
                > 
            </div> 

            <div> 
              <label for='posY-${character.id}'>Y</label> 
              <input 
                type='number' 
                character-data-type='y' 
                value='${character.y}' 
                id='posY-${character.id}' 
                character-data-index='${index}'
              > 
            </div> 

            <button data-remove class='button-error' character-data-index='${index}'>Remove</button> 
          </div> 

        </fieldset> 
      </div> 
    </li>`;
}

const CharacterList = new Reef("#characterList", {
  store: DATA_STORE,
  template: function (props) {
    console.log("CharacterList template ran");
    return "<ul>" + props.characters.map(characterListItem).join("") + "</ul>";
  },
});

export default CharacterList;

//   <input checked type='radio' name='radio-group-  character.id  ' id='radio-color-  character.id  '> //   <legend>Background</legend> // <fieldset class='radio-group' > // Character Background selector
//   <label for='radio-color-  character.id  '>Color</label>
//   <input type='radio' name='radio-group-  character.id  ' id='radio-icon-  character.id  '>
//   <label for='radio-icon-  character.id  '>Icon</label>
//   <input type='radio' name='radio-group-  character.id  ' id='radio-image-  character.id  '>
//   <label for='radio-image-  character.id  '>Image</label>
// </fieldset>
