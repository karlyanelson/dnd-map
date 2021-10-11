import addCharacter from "./addCharacter";
import DATA_STORE from "../globals/store";

export default function duplicateCharacter(characterIndex) {
  if (characterIndex) {
    const characterToDuplicate = DATA_STORE.data.characters[characterIndex];
    addCharacter({
      name: characterToDuplicate.name,
      color: characterToDuplicate.color,
      image: characterToDuplicate.image,
      icon: characterToDuplicate.icon,
      background: characterToDuplicate.background,
    });
  }
}
