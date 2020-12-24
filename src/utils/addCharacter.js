import { generateRandomID } from "./utils";
import { defaultColor } from "../globals/variables";

export default function addCharacter(store) {
  const numOfCharacters = (store.data.characters.length + 1).toString();

  const zoomRatio = store.data.zoom / 100;
  const positiveOrNegative = Math.random() < 0.5 ? -1 : 1;
  const randomNumberX =
    Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
  const randomNumberY =
    Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
  const posX =
    (window.innerWidth / 2 + window.pageXOffset) / zoomRatio -
    store.data.pieceSize / 2 +
    randomNumberX;
  const posY =
    (window.innerHeight / 2 + window.pageYOffset) / zoomRatio -
    store.data.pieceSize / 2 +
    randomNumberY;

  var newCharacter = {
    id: generateRandomID(),
    name: "Character " + numOfCharacters,
    color: defaultColor,
    image: "",
    icon: "",
    background: "color", // options are: 'color', 'image', 'icon'
    dragged: false,
    expanded: true,
    areaOfEffect: false,
    areaOfEffectRadius: 1,
    x: posX,
    y: posY,
    size: 1,
  };
  store.data.characters.push(newCharacter);
}
