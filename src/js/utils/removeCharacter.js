import DATA_STORE from "../globals/store";

export default function removeCharacter(characterIndex) {
  if (characterIndex) {
    DATA_STORE.data.characters.splice(characterIndex, 1);
  }
}
