export default function characterAreaOfEffectRadius({
  character,
  index,
  charAreaOfEffectColor,
}) {
  return `
    <label for='areaOfEffectColor-${character.id}'>Color</label> 
    <input 
      type='color' 
      character-data-type='areaOfEffectColor' 
      value='${charAreaOfEffectColor}' 
      id='areaOfEffectColor-${character.id}' 
      character-data-index='${index}'
    > 
`;
}
