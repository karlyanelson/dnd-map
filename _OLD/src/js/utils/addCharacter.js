import { generateRandomID } from "./utils";
import { DEFAULT_COLOR } from "../globals/variables";
import DATA_STORE from "../globals/store";

export default function addCharacter() {
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

  var newCharacter = {
    id: generateRandomID(),
    name: "Character " + numOfCharacters,
    color: DEFAULT_COLOR,
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
  DATA_STORE.data.characters.push(newCharacter);
}
