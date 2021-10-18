export default function characterAreaOfEffectRadius({ character, index }) {
  return `
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
}
