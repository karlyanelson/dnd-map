import characterBGimg from "../../utils/characterBGimg";

export default function toggleCharacterBtn({
  charExpanded,
  charColor,
  character,
  btnCharName,
}) {
  const arrow = character.expanded ? " arrow arrow-up " : " arrow arrow-down ";

  return `
    <button data-toggle-character 
      aria-expanded=${charExpanded} 
      class='${
        charExpanded
          ? ""
          : " bg-white dark:bg-black dark:bg-opacity-25 dark:hover:bg-opacity-5"
      } p-2 w-full dark:text-white text-left text-base break-all flex items-center justify-between rounded'> 
      <span 
        class='inline-block rounded-circle h-6 w-6 border border-black bg-no-repeat bg-center bg-cover flex-none' 
        style='background-color: ${charColor}; ${characterBGimg(character)}'
      >
      </span> 
      <span class='ml-2 flex-auto'> ${btnCharName} </span> 
      <span class='ml-2 flex-none ${arrow}'></span> 
    </button> 
`;
}
