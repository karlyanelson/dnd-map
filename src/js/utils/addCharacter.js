import { generateRandomID } from "./utils";
import { DEFAULT_COLOR } from "../globals/variables";
import DATA_STORE from "../globals/store";

export default function addCharacter(characterProps = {}) {
  const numOfCharacters = (DATA_STORE.data.characters.length + 1).toString();

  const zoomRatio = DATA_STORE.data.zoom / 100;
  const positiveOrNegative = Math.random() < 0.5 ? -1 : 1;
  const randomNumberX =
    Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
  const randomNumberY =
    Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
  const posX =
    (window.innerWidth / 2 + window.pageXOffset) / zoomRatio -
    DATA_STORE.data.pieceSize / 2 +
    randomNumberX;
  const posY =
    (window.innerHeight / 2 + window.pageYOffset) / zoomRatio -
    DATA_STORE.data.pieceSize / 2 +
    randomNumberY;

  let newCharacter = {
    id: generateRandomID(),
    name: characterProps.name || "Character " + numOfCharacters,
    color: characterProps.color || DEFAULT_COLOR,
    image: characterProps.image || "",
    icon: characterProps.icon || "",
    background: characterProps.background || "color", // options are: 'color', 'image', 'icon'
    dragged: false,
    expanded: true,
    areaOfEffect: characterProps.areaOfEffect || false,
    areaOfEffectRadius: characterProps.areaOfEffectRadius || 1,
    areaOfEffectColor: characterProps.areaOfEffectColor || "#ffffff",
    x: posX,
    y: posY,
    size: 1,
  };
  DATA_STORE.data.characters.push(newCharacter);
}
