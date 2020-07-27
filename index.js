// Variables
let piecePositionX;
let piecePositionY;

let playerCount = 1;
let enemyCount = 1;

// Selectors
const map = document.querySelector(".map");
const pieceGrid = document.querySelector(".player-box");

const fitImageToScreenCheckbox = document.querySelector("#fitImageToScreen");

const mapSrcUploader = document.querySelector("#mapSrcUploader");

// const noMapMsg = document.querySelector("#noMapMsg");


// Functions

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
  
function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

  
function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);

  event.target.setAttribute("aria-grabbed", "true");

  document.querySelector('.container').setAttribute("aria-dropeffect", "move");
}
  
  function onDragOver(event) {
    event.preventDefault();

    let mapPosition = offset(document.querySelector(".container"));
  
    const piece = document.querySelector(".piece");
    const pieceSizeInPx = getComputedStyle(piece).getPropertyValue(
      "--piece-size"
    );
    const pieceSize = parseInt(pieceSizeInPx, 10);
  
    event = event || window.event;
    piecePositionX = event.pageX - pieceSize / 2;
    piecePositionY = event.pageY - mapPosition.top - pieceSize / 2;
  }
  
  function onDrop(event) {
    event.preventDefault();

    const id = event.dataTransfer.getData("text");
  
    const draggableElement = document.getElementById(id);
    let dropzone = event.target;
  
    if (dropzone.classList.contains("map")) {
      dropzone = document.querySelector(".container");
    }
  
    dropzone.appendChild(draggableElement);
  
    draggableElement.style.position = "absolute";
    draggableElement.style.top = piecePositionY + "px";
    draggableElement.style.left = piecePositionX + "px";

    draggableElement.setAttribute("aria-grabbed", "false");
    dropzone.setAttribute("aria-dropeffect", "none");
  
    event.dataTransfer.clearData();
  }
  
  function setMap(event) {
    const file = event.target.files[0];
    map.file = file;

    const reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(map);
    reader.readAsDataURL(file);
  }

  function toggleMapWidth() {
    fitImageToScreenCheckbox.checked ? map.style.width = "100%" : map.style.width = "auto";
  }
  
  function setPieceSize() {
    const pieceSizeInputValue = document.querySelector("#pieceSize").value;
    document.documentElement.style.setProperty("--piece-size", pieceSizeInputValue + "px");
  }
  
  function generateColor() {
    // The available hex options
    var hex = [
      "a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];
    var color = "#";
    // Create a six-digit hex color
    for (var i = 0; i < 6; i++) {
      // Shuffle the hex values
      shuffle(hex);
      // Append first hex value to the string
      color += hex[0];
    }
    // Return the color string
    return color;
  }

  function announceToScreenReader(msg) {
    const announcement = document.createElement("p");
    announcement.setAttribute("role", "alert");
    announcement.textContent = msg;
    document.querySelector('.announcements').appendChild(announcement);
  }
  
  function addPiece(eventTarget) {
    let pieceClass;
    let pieceName;
    let pieceCount;
  
    if (eventTarget.matches(".add-enemy")) {
      pieceClass = "enemy";
      pieceName = "Enemy "
      enemyCount++
      pieceCount = enemyCount;
    }

    if (eventTarget.matches(".add-player")) {
      pieceClass = "player";
      pieceName = "Player "
      playerCount++
      pieceCount = playerCount;
    }
  
    // Add a new player
    const newPiece = document.createElement("button");
    const newPieceTextContainer = document.createElement("span");
    newPiece.id = Date.now();
    newPiece.setAttribute("ondragstart", "onDragStart(event);");
    newPiece.setAttribute("aria-grabbed", "false");
    newPiece.setAttribute("aria-label", pieceName + pieceCount);
    newPiece.appendChild(newPieceTextContainer);
    newPieceTextContainer.textContent = pieceName + pieceCount;
    newPiece.draggable = "true";
    newPiece.className = `piece ${pieceClass}`;
    newPiece.style.borderColor = generateColor();

    announceToScreenReader(`${pieceName} ${pieceCount} added.`);
  
    pieceGrid.appendChild(newPiece);
  }

  function movePieceViaKeyboard(pieceInFocus) {
    const moveBy = 10;

    pieceInFocus.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          pieceInFocus.style.left = parseInt(pieceInFocus.style.left) - moveBy + "px";
          announceToScreenReader(`${pieceInFocus.textContent} left`);
          break;
        case 'ArrowRight':
          pieceInFocus.style.left = parseInt(pieceInFocus.style.left) + moveBy + "px";
          announceToScreenReader(`${pieceInFocus.textContent} right`);
          break;
        case 'ArrowUp':
          pieceInFocus.style.top = parseInt(pieceInFocus.style.top) - moveBy + "px";
          announceToScreenReader(`${pieceInFocus.textContent} up`);
          break;
        case 'ArrowDown':
          pieceInFocus.style.top = parseInt(pieceInFocus.style.top) + moveBy + "px";
          announceToScreenReader(`${pieceInFocus.textContent} down`);
          break;
      }
    });
  }

function clickHandler(event) {
  // If the clicked element doesn't have the right selector, bail
  if (!event.target.matches("button")) {
    return;
  }

  // Don't follow the link
  event.preventDefault();

  if (event.target.matches("#addPiece")) {
    addPiece(event.target);
  }

  if (event.target.matches("#updateMap")) {
    setMap();
  }

  if (event.target.matches("#updatePiece")) {
    setPieceSize();
  }

  if (event.target.matches(".player-box .piece")) {
    // If you click a piece in the player box, add it to the map
    document.querySelector(".container").appendChild(event.target);
    event.target.style.position = "absolute";
    event.target.style.top = 0;
    event.target.style.left = 0;
    event.target.focus();
  }
}
  

// Events/Inits

// setMap();
toggleMapWidth();
setPieceSize();

document.addEventListener("click", clickHandler, false);

fitImageToScreenCheckbox.addEventListener("change", toggleMapWidth, false);

document.addEventListener(
  "focus", 
  function(event) {
    if (!event.target.matches(".piece")) {
      return;
    }
    movePieceViaKeyboard(event.target);
  },
  true
);

mapSrcUploader.addEventListener("change", setMap, false);
