export default function characterColor({ character, index, charColor }) {
  return `
  <label for='color-${character.id}'>Color</label> 
  <input 
    type='color' 
    character-data-type='color' 
    value='${charColor}' 
    id='color-${character.id}' 
    character-data-index='${index}'
  > 
`;
}
