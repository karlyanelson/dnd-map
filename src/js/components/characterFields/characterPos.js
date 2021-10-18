export default function characterPos({ character, index, axis }) {
  const id = `pos${axis}-${character.id}`;

  return `
    <label class="uppercase" for='${id}'>${axis}</label> 
    <input 
      type='number' 
      step='5' 
      character-data-type='${axis}' 
      reef-value='${character[axis]}' 
      id='${id}' 
      character-data-index='${index}'
    > 
`;
}
