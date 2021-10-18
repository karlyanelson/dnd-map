export default function characterName({ character, index }) {
  return `
  <label for='name-${character.id}'>Name</label> 
  <input 
    placeholder='Enter name...' type='text' 
    character-data-type='name' 
    value='${character.name}' 
    id='name-${character.id}' 
    character-data-index='${index}'
  > 
`;
}
