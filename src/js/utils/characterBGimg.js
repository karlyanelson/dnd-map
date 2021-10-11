export default function characterBGimg(character) {
  let charBGimg = "";
  let bgBlendMode = "";

  if (character.image) {
    charBGimg = ` background-image: url("${character.image}"); background-size: cover; `;

    return charBGimg;
  }

  if (character.icon) {
    charBGimg = ` background-image: url("./img/${character.icon}/image.png"); background-size: 80%; `;
    bgBlendMode = " background-blend-mode: lighten; ";

    return charBGimg + bgBlendMode;
  }
}
