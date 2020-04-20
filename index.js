/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {
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
  
/*!
* Run event after DOM is ready
* (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
* @param  {Function} fn Callback function
*/
  const ready = function (fn) {
    // Sanity check
    if (typeof fn !== "function") return;
  
    // If document is already loaded, run method
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      return fn();
    }
  
    // Otherwise, wait until document is loaded
    document.addEventListener("DOMContentLoaded", fn, false);
  };
  
  function onDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  
  let positionX;
  let positionY;
  
  function onDragOver(event) {
    event.preventDefault();
  
    const piece = document.querySelector(".piece");
    const pieceSizeInPx = getComputedStyle(piece).getPropertyValue(
      "--piece-size"
    );
    const pieceSize = parseInt(pieceSizeInPx, 10);
  
    event = event || window.event;
    positionX = event.pageX - pieceSize / 2;
    positionY = event.pageY - pieceSize / 2;
  }
  
  function onDrop(event) {
    const id = event.dataTransfer.getData("text");
  
    const draggableElement = document.getElementById(id);
    let dropzone = event.target;
  
    if (dropzone.classList.contains("map")) {
      dropzone = document.querySelector(".container");
    }
  
    dropzone.appendChild(draggableElement);
  
    draggableElement.style.position = "absolute";
    draggableElement.style.top = positionY + "px";
    draggableElement.style.left = positionX + "px";
  
    event.dataTransfer.clearData();
  }
  
  function setMapSrc() {
    const mapSrc = document.querySelector("#mapSrc").value;
    const map = document.querySelector(".map");
  
    map.src = mapSrc;
  }
  
  function setPieceSize() {
    const pieceSize = document.querySelector("#pieceSize").value;
    document.documentElement.style.setProperty("--piece-size", pieceSize + "px");
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
  
  function addPiece(eventTarget) {
    let pieceClass = "player";
  
    if (eventTarget.matches(".add-enemy")) {
      pieceClass = "enemy";
    }
  
    // Add a new player
    const newPiece = document.createElement("button");
    newPiece.id = Date.now();
    newPiece.setAttribute("ondragstart", "onDragStart(event);");
    newPiece.draggable = "true";
    newPiece.className = `piece ${pieceClass}`;
    newPiece.style.borderColor = generateColor();
  
    const pieceGrid = document.querySelector(".player-box");
    pieceGrid.appendChild(newPiece);
  }

  function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  function movePieceViaKeyboard(pieceInFocus) {
    // let pieceOGPosition = offset(pieceInFocus);
    // pieceInFocus.style.position = 'absolute';
    // pieceInFocus.style.left = pieceOGPosition.left;
    // pieceInFocus.style.top = pieceOGPosition.top;

    const moveBy = 10;

    window.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          pieceInFocus.style.left = parseInt(pieceInFocus.style.left) - moveBy + "px";
          break;
        case 'ArrowRight':
          pieceInFocus.style.left = parseInt(pieceInFocus.style.left) + moveBy + "px";
          break;
        case 'ArrowUp':
          pieceInFocus.style.top = parseInt(pieceInFocus.style.top) - moveBy + "px";
          break;
        case 'ArrowDown':
          pieceInFocus.style.top = parseInt(pieceInFocus.style.top) + moveBy + "px";
          break;
      }
    });

  }
  
  ready(function () {
    setMapSrc();
    setPieceSize();
  
    document.addEventListener(
      "click",
      function (event) {
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
          setMapSrc();
        }
  
        if (event.target.matches("#updatePiece")) {
          setPieceSize();
        }

        if (event.target.matches(".piece")) {
          movePieceViaKeyboard(event.target);
        }
      },
      false
    );

    // document.addEventListener(
    //   "focus", 
    //   function(event) {
    //     if (!event.target.matches(".piece")) {
    //       console.log("oops")
    //       return;
    //     }
    //     movePieceViaKeyboard(event.target);
    //   },
    //   true
    // );
  });
  