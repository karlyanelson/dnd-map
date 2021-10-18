export default function characterImage({ character, index }) {
  return `
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
}
