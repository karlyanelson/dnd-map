import * as _ from "../globals/variables";
import toggleCharacterBtn from "./characterFields/toggleCharacterBtn";
import characterName from "./characterFields/characterName";
import characterColor from "./characterFields/characterColor";
import characterIcon from "./characterFields/characterIcon";
import characterImage from "./characterFields/characterImage";
import characterSize from "./characterFields/characterSize";
import characterPos from "./characterFields/characterPos";
import characterAreaOfEffectEnabled from "./characterFields/characterAreaOfEffectEnabled";
import characterAreaOfEffectRadius from "./characterFields/characterAreaOfEffectRadius";
import characterAreaOfEffectColor from "./characterFields/characterAreaOfEffectColor";

export default function characterListItem(character, index) {
  // Variables
  const charColor = character.color ? character.color : _.DEFAULT_COLOR;

  const charAreaOfEffectColor = character.areaOfEffectColor
    ? character.areaOfEffectColor
    : _.DEFAULT_COLOR;

  const charExpanded = character.expanded ? true : false; // handle undefined

  const hidden = character.expanded ? "" : " hidden ";

  const btnCharName = character.name ? character.name : "<em>Untitled</em>";

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
      ${toggleCharacterBtn({
        charExpanded,
        charColor,
        character,
        btnCharName,
      })}

      <div class='border-t border-gray px-4 pt-2 pb-4 ${hidden} '> 
        <fieldset> 
          <legend class='screenreader-only'>${btnCharName}'s Settings</legend> 
          <div class='flex items-center justify-between py-1' > 
            <div class='flex-auto'> 
              ${characterName({ character, index })}
            </div> 
            <div class='flex-none ml-2'> 
              ${characterColor({ character, index, charColor })}
            </div> 
          </div> 

          <div class='py-1'> 
            ${characterIcon({ character, index })}
          </div>

          <div class='py-1'> 
            ${characterImage({ character, index })}
          </div> 

          <div class='grid grid-cols-3 py-1 gap-2'> 
            <div> 
              ${characterSize({ character, index })}
            </div> 
            <div> 
              ${characterPos({ character, index, axis: "x" })}
            </div> 
            <div> 
              ${characterPos({ character, index, axis: "y" })} 
            </div> 
          </div> 

          <div class="mt-6 pt-4 border-t border-gray">
            <fieldset> 
              <legend>Area of Effect</legend>
              <div class="flex items-center space-x-6">
                <div>
                  ${characterAreaOfEffectEnabled({ character, index })}  
                </div>
                <div>
                  ${characterAreaOfEffectRadius({ character, index })} 
                </div>
                <div>
                  ${characterAreaOfEffectColor({
                    character,
                    index,
                    charAreaOfEffectColor,
                  })}
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
