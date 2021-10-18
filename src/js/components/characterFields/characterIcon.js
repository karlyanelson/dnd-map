import { capitalize } from "../../utils/utils";
import * as _ from "../../globals/variables";

export default function characterIcon({ character, index }) {
  function iconList(icon) {
    let selection = icon === character.icon ? "selected" : "";
    return `
      <option ${selection} value='${icon}'> 
        ${capitalize(icon)} 
      </option>
    `;
  }

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

  return `
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
}
