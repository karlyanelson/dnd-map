export default function characterAreaOfEffectEnabled({ character, index }) {
  return `
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
}
