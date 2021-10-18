import { capitalize } from "../utils/utils";
import characterBGimg from "../utils/characterBGimg";
import * as _ from "../globals/variables";

export default function characterListItem(character, index) {
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
  const charColor = character.color ? character.color : _.DEFAULT_COLOR;

  const charAreaOfEffectColor = character.areaOfEffectColor
    ? character.areaOfEffectColor
    : _.DEFAULT_COLOR;

  const charExpanded = character.expanded ? true : false; // handle undefined

  const hidden = character.expanded ? "" : " hidden ";

  const arrow = character.expanded ? " arrow arrow-up " : " arrow arrow-down ";

  const btnCharName = character.name ? character.name : "<em>Untitled</em>";

  // Character Fields

  const toggleCharacterBtn = `
    <button data-toggle-character 
        aria-expanded=${charExpanded} 
        class='${
          charExpanded
            ? ""
            : " bg-white dark:bg-black dark:bg-opacity-25 dark:hover:bg-opacity-5"
        } p-2 w-full dark:text-white text-left text-base break-all flex items-center justify-between rounded'> 
        <span 
          class='inline-block rounded-circle h-6 w-6 border border-black bg-no-repeat bg-center bg-cover flex-none' 
          style='background-color: ${charColor}; ${characterBGimg(character)}'
        >
        </span> 
        <span class='ml-2 flex-auto'> ${btnCharName} </span> 
        <span class='ml-2 flex-none ${arrow}'></span> 
      </button> 
  `;

  const characterName = `
    <label for='name-${character.id}'>Name</label> 
    <input 
      placeholder='Enter name...' type='text' 
      character-data-type='name' 
      value='${character.name}' 
      id='name-${character.id}' 
      character-data-index='${index}'
    > 
  `;

  const characterColor = `
    <label for='color-${character.id}'>Color</label> 
    <input 
      type='color' 
      character-data-type='color' 
      value='${charColor}' 
      id='color-${character.id}' 
      character-data-index='${index}'
    > 
  `;

  const iconSelectorContent = `
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

  const characterIcon = `
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
  `;

  const characterImage = `
    <label for='char-image-${character.id}'>Image URL</label> 
    <input 
      placeholder='None' 
      type='url' 
      character-data-type='image' 
      value='${character.image}' 
      id='char-image-${character.id}' 
      character-data-index='${index}'
    > 
  `;

  const characterSize = `
    <label for='size-${character.id}'>Size</label> 
    <input 
      type='number' 
      character-data-type='size' 
      value='${character.size}' 
      id='size-${character.id}' 
      character-data-index='${index}'
    > 
  `;

  const characterPosX = `
    <label for='posX-${character.id}'>X</label> 
    <input 
      type='number' 
      step='5' 
      character-data-type='x' 
      value='${character.x}' 
      id='posX-${character.id}' 
      character-data-index='${index}'
    > 
  `;

  const characterPosY = `
    <label for='posY-${character.id}'>Y</label> 
    <input 
      type='number' 
      character-data-type='y' 
      value='${character.y}' 
      id='posY-${character.id}' 
      character-data-index='${index}'
    > 
  `;

  const characterAreaOfEffectEnabled = `
    <label for='areaOfEffect-${character.id}'>Enabled</label> 
    <input 
      type='checkbox' 
      character-data-type='areaOfEffect' 
      reef-checked='${character.areaOfEffect}' 
      id='areaOfEffect-${character.id}' 
      character-data-index='${index}'
      class="inline-block w-auto"
    >
  `;

  const characterAreaOfEffectRadius = `
    <label for='areaOfEffectRadius-${character.id}'>Radius</label> 
    <input 
      type='number' 
      step='1' 
      character-data-type='areaOfEffectRadius' 
      value='${character.areaOfEffectRadius}' 
      id='areaOfEffectRadius-${character.id}' 
      character-data-index='${index}'
      class="max-w-14"
    > 
  `;

  const characterAreaOfEffectColor = `
    <label for='areaOfEffectColor-${character.id}'>Color</label> 
    <input 
      type='color' 
      character-data-type='areaOfEffectColor' 
      value='${charAreaOfEffectColor}' 
      id='areaOfEffectColor-${character.id}' 
      character-data-index='${index}'
    > 
  `;

  // Template Content
  return `
    <li 
      class='characterListItem border-2 bg-white border-ink dark:bg-ink dark:border-gray rounded my-3 transition-all duration-300 ease-in-out  ${
        charExpanded
          ? "shadow-high relative z-10"
          : "shadow-button hover:shadow-high"
      }' 
      data-id='${character.id}' 
      data-index='${index}'
    > 
      ${toggleCharacterBtn}

      <div class='border-t border-gray px-4 pt-2 pb-4 ${hidden} '> 
        <fieldset> 
          <legend class='screenreader-only'>${btnCharName}'s Settings</legend> 
          <div class='flex items-center justify-between py-1' > 
            <div class='flex-auto'> 
              ${characterName}
            </div> 
            <div class='flex-none ml-2'> 
              ${characterColor}
            </div> 
          </div> 

          <div class='py-1'> 
            ${characterIcon}
          </div>

          <div class='py-1'> 
            ${characterImage}
          </div> 

          <div class='grid grid-cols-3 py-1 gap-2'> 
            <div> 
              ${characterSize}
            </div> 
            <div> 
              ${characterPosX}
            </div> 

            <div> 
              ${characterPosY} 
            </div> 
          </div> 

          <div class="mt-6 pt-4 border-t border-gray">
            <fieldset> 
              <legend>Area of Effect</legend>
              <div class="flex items-center space-x-6">
                <div>
                  ${characterAreaOfEffectEnabled}  
                </div>
                <div>
                  ${characterAreaOfEffectRadius} 
                </div>
                <div>
                  ${characterAreaOfEffectColor}
                </div>
              </div>
            </fieldset> 
          </div> 
          <div class="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-gray">
            <button data-remove class='button-error button-small' character-data-index='${index}'>Remove <span class='screenreader-only'>${btnCharName}</span></button> 
            <button data-duplicate class='button-outline button-small' character-data-index='${index}'>Duplicate <span class='screenreader-only'>${btnCharName}</span></button> 
          </div>
        </fieldset> 
      </div> 
    </li>`;
}

//   <input checked type='radio' name='radio-group-  character.id  ' id='radio-color-  character.id  '> //   <legend>Background</legend> // <fieldset class='radio-group' > // Character Background selector
//   <label for='radio-color-  character.id  '>Color</label>
//   <input type='radio' name='radio-group-  character.id  ' id='radio-icon-  character.id  '>
//   <label for='radio-icon-  character.id  '>Icon</label>
//   <input type='radio' name='radio-group-  character.id  ' id='radio-image-  character.id  '>
//   <label for='radio-image-  character.id  '>Image</label>
// </fieldset>
