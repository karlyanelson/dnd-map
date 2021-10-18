export default function characterSize({ character, index }) {
  return `
  <label for='size-${character.id}'>Size</label> 
  <input 
    type='number' 
    character-data-type='size' 
    value='${character.size}' 
    id='size-${character.id}' 
    character-data-index='${index}'
  > 
`;
}
