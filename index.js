//// Reef
// https://cdn.jsdelivr.net/npm/reefjs@7.3.4/dist/reef.polyfills.min.js
/*! Reef v7.3.4 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */
var Reef=function(){"use strict";var t;(t="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)||"undefined"!=typeof navigator&&"ReactNative"===navigator.product?global:self).Proxy||(t.Proxy=function(){function t(t){return!!t&&("object"==typeof t||"function"==typeof t)}var e=null,n=function(n,r){function o(){}if(!t(n)||!t(r))throw new TypeError("Cannot create proxy with a non-object as target or handler");e=function(){n=null,o=function(t){throw new TypeError("Cannot perform '"+t+"' on a proxy that has been revoked")}},setTimeout((function(){e=null}),0);var a=r;for(var i in r={get:null,set:null,apply:null,construct:null},a){if(!(i in r))throw new TypeError("Proxy polyfill does not support trap '"+i+"'");r[i]=a[i]}"function"==typeof a&&(r.apply=a.apply.bind(a));var c=this,l=!1,u=!1;"function"==typeof n?(c=function(){var t=this&&this.constructor===c,e=Array.prototype.slice.call(arguments);return o(t?"construct":"apply"),t&&r.construct?r.construct.call(this,n,e):!t&&r.apply?r.apply(n,this,e):t?(e.unshift(n),new(n.bind.apply(n,e))):n.apply(this,e)},l=!0):n instanceof Array&&(c=[],u=!0);var s=r.get?function(t){return o("get"),r.get(this,t,c)}:function(t){return o("get"),this[t]},f=r.set?function(t,e){o("set"),r.set(this,t,e,c)}:function(t,e){o("set"),this[t]=e},d={};if(Object.getOwnPropertyNames(n).forEach((function(t){if(!l&&!u||!(t in c)){var e={enumerable:!!Object.getOwnPropertyDescriptor(n,t).enumerable,get:s.bind(n,t),set:f.bind(n,t)};Object.defineProperty(c,t,e),d[t]=!0}})),a=!0,Object.setPrototypeOf?Object.setPrototypeOf(c,Object.getPrototypeOf(n)):c.__proto__?c.__proto__=n.__proto__:a=!1,r.get||!a)for(var h in n)d[h]||Object.defineProperty(c,h,{get:s.bind(n,h)});return Object.seal(n),Object.seal(c),c};return n.revocable=function(t,r){return{proxy:new n(t,r),revoke:e}},n}(),t.Proxy.revocable=t.Proxy.revocable),function(){if("function"==typeof window.CustomEvent)return!1;function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}t.prototype=window.Event.prototype,window.CustomEvent=t}();var e,n=["checked","selected","value"],r={},o=!1,a=function(t){return Object.prototype.toString.call(t).slice(8,-1).toLowerCase()};r.trueTypeOf=a;var i=function(t){if(o)throw new Error(t)};r.err=i;var c=function(t,e){var n=a(t);if("object"===n){var r={};for(var o in t)t.hasOwnProperty(o)&&(r[o]=c(t[o],e));return r}if("array"===n)return t.map((function(t){return c(t,e)}));if("string"===n&&!e){var i=document.createElement("div");return i.textContent=t,i.innerHTML}return t},l=function(t){t.debounce&&window.cancelAnimationFrame(t.debounce),t.debounce=window.requestAnimationFrame((function(){t.render()}))},u=function(t){return{get:function(e,n){return["object","array"].indexOf(a(e[n]))>-1?new Proxy(e[n],u(t)):e[n]},set:function(e,n,r){return e[n]===r||(e[n]=r,l(t)),!0}}},s=function(t,e){var n=t.filter(e);return n.length<1?null:n[0]},f=function(t,e){if(!(t||e&&e.lagoon))return i("You did not provide an element to make into a component.");if(!e||!e.template&&!e.lagoon)return i("You did not provide a template for this component.");var n=this,r=function(t,e){return t.setters?t.store?null:t.data:t.data&&!t.store?new Proxy(t.data,u(e)):null}(e,n),o=e.store,s=e.router,f=e.setters,d=e.getters;(n.debounce=null,Object.defineProperties(n,{elem:{value:t},template:{value:e.template},allowHTML:{value:e.allowHTML},lagoon:{value:e.lagoon},store:{value:o},attached:{value:[]},router:{value:s}}),Object.defineProperty(n,"data",{get:function(){return f?c(r,!0):r},set:function(t){return o||f||(r=new Proxy(t,u(n)),l(n)),!0}}),f&&!o&&Object.defineProperty(n,"do",{value:function(t){if(!f[t])return i("There is no setter with this name.");var e=Array.prototype.slice.call(arguments);e[0]=r,f[t].apply(n,e),l(n)}}),d&&!o&&Object.defineProperty(n,"get",{value:function(t){return d[t]?d[t](r):i("There is no getter with this name.")}}),s&&"addComponent"in s&&s.addComponent(n),o&&"attach"in o&&o.attach(n),e.attachTo)&&("array"===a(e.attachTo)?e.attachTo:[e.attachTo]).forEach((function(t){"attach"in t&&t.attach(n)}))};f.Store=function(t){return t.lagoon=!0,new f(null,t)};var d=function(t,e){e.forEach((function(e){t.style[e]=""}))},h=function(t,e){e.forEach((function(e){if("class"===e.att)t.className=e.value;else if("style"===e.att)!function(t,e){var n=function(t){return t.split(";").reduce((function(t,e){var n=e.indexOf(":");return n&&t.push({name:e.slice(0,n).trim(),value:e.slice(n+1).trim()}),t}),[])}(e),r=Array.prototype.filter.call(t.style,(function(e){return null===s(n,(function(n){return n.name===e&&n.value===t.style[e]}))}));d(t,r),function(t,e){e.forEach((function(e){t.style[e.name]=e.value}))}(t,n)}(t,e.value);else{if(e.att in t)try{t[e.att]=e.value,t[e.att]||0===t[e.att]||(t[e.att]=!0)}catch(t){}try{t.setAttribute(e.att,e.value)}catch(t){}}}))},p=function(t,e){e.forEach((function(e){if("class"===e.att)t.className="";else if("style"===e.att)d(t,Array.prototype.slice.call(t.style));else{if(e.att in t)try{t[e.att]=""}catch(t){}try{t.removeAttribute(e.att)}catch(t){}}}))},y=function(t,e){return{att:t,value:e}},v=function(t,e){if(1!==t.nodeType)return[];var r=function(t,e){return Array.prototype.reduce.call(t.attributes,(function(t,r){return!(n.indexOf(r.name)<0||e&&"selected"===r.name)||r.name.length>7&&"default"===r.name.slice(0,7)||t.push(y(r.name,r.value)),t}),[])}(t,e);return function(t,e,r){n.forEach((function(n){!t[n]&&0!==t[n]||r&&"option"===t.tagName.toLowerCase()&&"selected"===n||r&&"select"===t.tagName.toLowerCase()&&"value"===n||e.push(y(n,t[n]))}))}(t,r,e),r},m=function(t){return 3===t.nodeType?"text":8===t.nodeType?"comment":t.tagName.toLowerCase()},b=function(t){return t.childNodes&&t.childNodes.length>0?null:t.textContent},g=function(t){1===t.nodeType&&(Array.prototype.forEach.call(t.attributes,(function(e){e.name.length<8||"default"!==e.name.slice(0,7)||(h(t,[y(e.name.slice(7).toLowerCase(),e.value)]),p(t,[y(e.name,e.value)]))})),t.childNodes&&Array.prototype.forEach.call(t.childNodes,(function(t){g(t)})))},w=function(t,e,r){var o=Array.prototype.slice.call(e.childNodes),a=Array.prototype.slice.call(t.childNodes),i=o.length-a.length;if(i>0)for(;i>0;i--)o[o.length-i].parentNode.removeChild(o[o.length-i]);a.forEach((function(t,a){if(!o[a])return g(t),void e.appendChild(t.cloneNode(!0));if(m(t)===m(o[a])){if(function(t,e){var r=v(t,!0),o=v(e),a=o.filter((function(t){return!(n.indexOf(t.att)>-1)&&null===s(r,(function(e){return t.att===e.att}))})),i=r.filter((function(t){var e=s(o,(function(e){return t.att===e.att}));return null===e||e.value!==t.value}));h(e,i),p(e,a)}(t,o[a]),!(r.filter((function(e){return 3!==t.nodeType&&function(t,e){return Element.prototype.matches&&t.matches(e)||Element.prototype.msMatchesSelector&&t.msMatchesSelector(e)||Element.prototype.webkitMatchesSelector&&t.webkitMatchesSelector(e)}(t,e)})).length>0)){var i=b(t);if(i&&i!==b(o[a])&&(o[a].textContent=i),o[a].childNodes.length>0&&t.childNodes.length<1)o[a].innerHTML="";else{if(o[a].childNodes.length<1&&t.childNodes.length>0){var c=document.createDocumentFragment();return w(t,c,r),void o[a].appendChild(c)}t.childNodes.length>0&&w(t,o[a],r)}}}else o[a].parentNode.replaceChild(t.cloneNode(!0),o[a])}))},O=function(t,e){t&&t.forEach((function(t){if(t.attached.indexOf(e)>-1)return i(e.elem+" has attached nodes that it is also attached to, creating an infinite loop.");"render"in t&&t.render()}))};return f.emit=function(t,e,n){var r;if(!t||!e)return i("You did not provide an element or event name.");r=new CustomEvent(e,{bubbles:!0,detail:n}),t.dispatchEvent(r)},f.prototype.render=function(){if(this.lagoon)O(this.attached,this);else{if(!this.template)return i("No template was provided.");var t="string"===a(this.elem)?document.querySelector(this.elem):this.elem;if(!t)return i("The DOM element to render your template into was not found.");var n=c((this.store?this.store.data:this.data)||{},this.allowHTML),r="function"===a(this.template)?this.template(n,this.router?this.router.current:null):this.template;if(!(["string","number"].indexOf(a(r))<0)){var o=this.attached.map((function(t){return t.elem}));return w(function(t){if(e){var n=(new DOMParser).parseFromString(t,"text/html");return"head"in n&&"childNodes"in n.head&&n.head.childNodes.length>0&&Array.prototype.slice.call(n.head.childNodes).reverse().forEach((function(t){n.body.insertBefore(t,n.body.firstChild)})),n.body}var r=document.createElement("div");return r.innerHTML=t,r}(r),t,o),f.emit(t,"render",n),O(this.attached,this),t}}},f.prototype.attach=function(t){"array"===a(t)?this.attached.concat(t):this.attached.push(t)},f.prototype.detach=function(t){var e="array"===a(t)?t:[t],n=this;e.forEach((function(t){var e=n.attached.indexOf(t);e<0||n.attached.splice(e,1)}))},f.debug=function(t){o=!!t},f.clone=c,f._=r,e=function(){if(!window.DOMParser)return!1;var t=new DOMParser;try{t.parseFromString("x","text/html")}catch(t){return!1}return!0}(),f}();


;(function(){
//// Data Store
var store = new Reef.Store({
  data: {}
});

//// Variables
var pieceSizeInput = document.getElementById("pieceSize");
var mapZoomInput = document.getElementById("mapZoom");
var mapSrcLabel = document.getElementById("mapSrcLabel");
var imgUploadError = document.getElementById("imgUploadError");
var characterCount = document.getElementById("charCount");
var storageID = "dnd-map-data";
var draggedElemPosX;
var draggedElemPosY;
var draggedElemMouseOffsetX;
var draggedElemMouseOffsetY;
var currentTouchPosX;
var currentTouchPosY;
var mainControlsContent = document.getElementById("mainControls");
var defaultColor = '#ce0f0f';
var iconListClasses = [ 'artificer', 'barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard' ];
var iconListRaces = ['aarakocra', 'aasimar', 'bugbear', 'dragonborn', 'dwarf', 'elf', 'firbolg', 'genasi', 'gnome', 'goblin', 'goliath', 'halfling', 'human', 'kenku', 'kobold', 'lizardfolk', 'orc', 'tabaxi', 'tiefling', 'triton', 'yuan-ti' ];
var iconListMonsters = ['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'undead'];


//// Methods
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateRandomID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
}

function getDatafromStorage() {
  var storedData = localStorage.getItem(storageID);
  var emptyData = {
    // map: "https://i.imgur.com/KYVBIZd.jpeg",
    map: null,
    settingsExpanded: true,
    pieceSize: 24,
    zoom: 100,
    characters: []
  };
  var storedDataObject = storedData ? JSON.parse(storedData) : emptyData;
  store.data = storedDataObject;
}

function addCharacter() {
  var numOfCharacters = (store.data.characters.length + 1).toString();

  var zoomRatio = store.data.zoom / 100;
  var positiveOrNegative = Math.random() < 0.5 ? -1 : 1;;
  var randomNumberX = Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
  var randomNumberY = Math.floor(Math.random() * Math.floor(40)) * positiveOrNegative;
  var posX = (window.innerWidth/2 + window.pageXOffset) / zoomRatio - (store.data.pieceSize/2) + randomNumberX;
  var posY = (window.innerHeight/2 + window.pageYOffset) / zoomRatio - (store.data.pieceSize/2) + randomNumberY;

  var newCharacter = {
    id: generateRandomID(),
    name: "Character " + numOfCharacters,
    color: defaultColor,
    image: "",
    icon: "",
    background: 'color', // options are: 'color', 'image', 'icon'
    dragged: false,
    expanded: true,
    x: posX,
    y: posY,
    size: 1
  };
  store.data.characters.push(newCharacter);
}

function removeCharacter(characterIndex) {
  if (characterIndex){
    store.data.characters.splice(characterIndex, 1);
  }
}

function zoomMap(value) {
  store.data.zoom = value === 'out' ? parseInt(store.data.zoom) - 10 : parseInt(store.data.zoom) + 10;
}

function handleFiles(event) {
  const file = event.target.files[0];
  const maxMB = 3 * 1000 * 1000; // 1 MB = 1000 KB = 1000 B

  if(file.size <= maxMB) {
    const reader = new FileReader();
    reader.onload = (function () {
      return function (e) {
        store.data.map = e.target.result;
      };
    })();
    reader.readAsDataURL(file);
    
    if(!imgUploadError.hasAttribute('hidden')){
      imgUploadError.addAttribute('hidden');
    }
  } else {
    imgUploadError.removeAttribute('hidden');
  }
}

function characterBGimg(character) {
  var charBGimg = "";
  var bgBlendMode = "";

  if (character.image ) {
    charBGimg = " background-image: url(" + character.image + "); ";

    return charBGimg;
  } 

  if (character.icon) {
    charBGimg = " background-image: url(" + './img/' + character.icon + '/image.png' + "); ";
    bgBlendMode = ' background-blend-mode: lighten; ';

    return charBGimg + bgBlendMode;
  }
}

//// Event Handlers
function inputHandler(event) {
  if (event.target.matches("#mapSrc")) {
    handleFiles(event);
  }

  if (event.target.matches("#pieceSize")) {
    store.data.pieceSize = event.target.value;
  }

  if (event.target.matches("#mapZoom")) {
    store.data.zoom = event.target.value;
  }

  if (event.target.matches('[character-data-type]') && event.target.hasAttribute('character-data-index')){
    var characterIndex = event.target.getAttribute('character-data-index');
    var characterDataType = event.target.getAttribute('character-data-type');
    store.data.characters[characterIndex][characterDataType] = event.target.value;
  }
}

function clickHandler(event) {
  if(!event.target.closest('button')){
    return;
  }

  let buttonTarget = event.target.closest('button');

  if (buttonTarget.matches('[data-toggle-settings]')) {
    store.data.settingsExpanded = store.data.settingsExpanded ? false : true;
  }

  if (buttonTarget.matches('[data-toggle-character]')) {
    var characterContainer = buttonTarget.closest(".character-list-item");
    
    if (characterContainer) {
      var characterIndex = characterContainer.getAttribute("data-index");
      var character = store.data.characters[characterIndex];
      character.expanded = character.expanded ? false : true;
    }
  }

  if (buttonTarget.matches("#addCharacter")) {
    addCharacter();
  }

  if (buttonTarget.matches("[data-zoom]")) {
    zoomMap(buttonTarget.getAttribute("data-zoom"));
  }

  if (buttonTarget.matches("[data-remove]")) {
    var characterContainer = buttonTarget.closest(".character-list-item");
    
    if (characterContainer) {
      var characterIndex = characterContainer.getAttribute("data-index");
      removeCharacter(characterIndex);
    }
  }
}

function renderHandler() {
  pieceSizeInput.value = store.data.pieceSize;
  mapZoomInput.value = store.data.zoom;
  characterCount.textContent = store.data.characters.length;
  mapSrcLabel.textContent = store.data.map ? "Change Map" : "Upload Map";

  store.data.settingsExpanded ? mainControlsContent.classList.remove('collapsed') : mainControlsContent.classList.add('collapsed');
  
  store.data.map ? document.body.classList.remove('no-map') : document.body.classList.add('no-map');

  localStorage.setItem(storageID, JSON.stringify(store.data));
}

function dragStartHandler(event) {
  event.target.style.opacity = 0.5;

  if (event.type === "touchstart"){
    if (!event.target.closest('.piece')){
      return
    }

    draggedElemMouseOffsetX = event.touches[0].target.offsetLeft;
    draggedElemMouseOffsetY = event.touches[0].target.offsetTop;
  } else {
    event.dataTransfer.setData("text/plain", event.target.id);
    draggedElemMouseOffsetX = event.offsetX;
    draggedElemMouseOffsetY = event.offsetY;
  }
}

function touchMoveHandler(event) {
  if (!event.target.closest('.piece')){
    return
  }
  currentTouchPosX = event.touches[0].pageX;
  currentTouchPosY = event.touches[0].pageY;
}

function dropHandler(event) {
  var draggedElemId;

  if (event.type === "touchend"){
    if (event.target.closest('.piece')){
      draggedElemId = event.target.closest('.piece').id;
    } else {
      return;
    }
  }else{
    event.preventDefault();
    draggedElemId = event.dataTransfer.getData("text");
  }
  var draggedElem = document.getElementById(draggedElemId);
  var characterIndex = draggedElem.getAttribute("data-index");

  if (!characterIndex) {
    return
  }

  var zoomRatio = store.data.zoom / 100;

  var character = store.data.characters[characterIndex];

  character.dragged = true;

  if (event.type === "touchend") {
    draggedElemPosX = currentTouchPosX - draggedElemMouseOffsetX;
    draggedElemPosY = currentTouchPosY - draggedElemMouseOffsetY;
  } else {
    draggedElemPosX = event.pageX - draggedElemMouseOffsetX;
    draggedElemPosY = event.pageY - draggedElemMouseOffsetY;
  }

  character.x = draggedElemPosX / zoomRatio;
  character.y = draggedElemPosY / zoomRatio;
}

function dragEndHandler(event) {
  event.target.style.opacity = "";
}

//// Templates


function characterListItem(character, index) {
  // Sub Template
  function iconList(icon) {
    let selection = icon === character.icon ? 'selected' : '';
    return '<option ' + selection + ' value="' + icon + '">' + capitalize(icon) + '</option>';
  }

  // Variables
  var charColor = character.color ? character.color : defaultColor;

  var charExpanded = character.expanded ? true : false; // handle undefined

  var contentClass = character.expanded ? '' : ' closed '

  var arrow = character.expanded ? ' arrow arrow-up ' : ' arrow arrow-down ';

  var btnCharName = character.name ? character.name : '<em>Untitled</em>';
  
  var iconSelectorContent = "<option></option>" + "<optgroup label='Classes'>" + iconListClasses.map(iconList).join('') + "</optgroup>" + "<optgroup label='Races'>" + iconListRaces.map(iconList).join('') + "</optgroup>" + "<optgroup label='Monsters'>" + iconListMonsters.map(iconList).join('') + "</optgroup>";

  // Template Content
  return (
    "<li class='character-list-item' data-id='" + character.id + "'" + "data-index='" + index + "'>" + 
        // Character expand/collapse button
        "<button data-toggle-character aria-expanded=" + charExpanded + " class='character-list-item__trigger grid-row'>" + 
          "<span class='character-list-item__thumbnail grid-col-auto' style='background-color:" + charColor + "; " + characterBGimg(character) + "'></span>" + 
          "<span class='grid-col'>" + btnCharName +  "</span>" + 
          "<span class='grid-col-auto " + arrow + "'></span>" +
        "</button>" +

        "<div class='character-list-item__content " + contentClass + "'>" +
          "<fieldset>" +
            "<legend class='screenreader-only'>" + btnCharName + "'s Settings</legend>" +
            "<div class='grid-row form-field' >" +
              // Character Name
              "<div class='grid-col'>" +
                  "<label for='name-" + character.id + "'>Name</label>" +
                  "<input placeholder='Enter name...' type='text' character-data-type='name' value='" + character.name +
                  "' id=name-'" + character.id +
                  "' character-data-index='" + index + "'>" +
              "</div>" +
            
              // Character Color
              "<div class='grid-col-auto'>" +
                  "<label for='color-" + character.id + "'>Color</label>" +
                  "<input type='color' character-data-type='color' value='" + charColor +
                  "' id=color-'" + character.id +
                  "' character-data-index='" + index + "'>" +
              "</div>" +
            "</div>" +

            "<div class='form-field'>" +
                // Character Background selector
                // "<fieldset class='radio-group' >" +
                //   "<legend>Background</legend>" + 
                //   "<input checked type='radio' name='radio-group-" + character.id + "' id='radio-color-" + character.id + "'>" +
                //   "<label for='radio-color-" + character.id + "'>Color</label>" +
                //   "<input type='radio' name='radio-group-" + character.id + "' id='radio-icon-" + character.id + "'>" +
                //   "<label for='radio-icon-" + character.id + "'>Icon</label>" +
                //   "<input type='radio' name='radio-group-" + character.id + "' id='radio-image-" + character.id + "'>" +
                //   "<label for='radio-image-" + character.id + "'>Image</label>" +
                // "</fieldset>" +

                // Character Icon
                "<label for='char-icon-" + character.id + "'>Icon</label>" +
                "<select name='Icon' character-data-type='icon' value='" + character.icon +
                "' id=char-icon-'" + character.id +
                "' character-data-index='" + index + "'>"  +
                    iconSelectorContent + 
                "</select>" +
                // Character Image
                "<label for='char-image-" + character.id + "'>Image URL</label>" +
                "<input placeholder='None' type='url' character-data-type='image' value='" + character.image +
                "' id=char-image-'" + character.id +
                "' character-data-index='" + index + "'>" +
            "</div>" +

            "<div class='grid-row grid-row-align-end form-field'>" +
              // Character Size
              "<div>" +
                "<label for='size-" + character.id + "'>Size</label>" +
                "<input type='number' character-data-type='size' value='" + character.size +
                "' id=size-'" + character.id +
                "' character-data-index='" + index + "'>" +
              "</div>" +
              // Character X Postion
              "<div>" +
                "<label for='posX-" + character.id + "'>X</label>" +
                "<input type='number' step='5' character-data-type='x' value='" + character.x +
                "' id=posX-'" + character.id +
                "' character-data-index='" + index + "'>" +
              "</div>" +
              // Character Y Postion
              "<div>" +
                "<label for='posY-" + character.id + "'>Y</label>" +
                "<input type='number' character-data-type='y' value='" + character.y +
                "' id=posY-'" + character.id +
                "' character-data-index='" + index + "'>" +
              "</div>" +
              // Remove Character Button
              "<button data-remove character-data-index='" + index + "'>Remove</button>" +
            "</div>" +
          "</fieldset>" +
        "</div>" +
    "</li>"
  );
}

function characterPiece(character, index) {
  var zoomPercent = store.data.zoom / 100;  

  var characterSize = store.data.pieceSize * zoomPercent * character.size;

  var characterPosX = character.x * zoomPercent;
  var characterPosY = character.y * zoomPercent;

  var charColor = character.color ? character.color : defaultColor;

  var charName = character.name ? character.name : '<em>Untitled</em>';

  return (
    "<div class='piece' draggable='true' id='" +
        character.id +
      "'" +
      "data-index='" +
        index +
      "'" +
      " style='" +
        "position:absolute; " + "top:" + characterPosY + "px; left:" + characterPosX + "px;" +
      "'>" +
        "<div class='piece-content' style='" + 
            "height:" + characterSize + "px; " +
            "width:" + characterSize + "px; " +
            "background-color:" + charColor + ";" +
            characterBGimg(character) +
        "'></div>" +
        "<span class='piece-label' style='top: " +
          characterSize * 1.15 +
        "px;" +
        "'>" +
          charName +
        "</span>" +
    "</div>"
  );
}

//// Components

var Map = new Reef("#mapContainer", {
  store: store,
  template: function (props) {
    var noMap = "<div class='no-map-message'>" + 
      "<h2 class='no-map-message__header'>Welcome to your virtual Dungeons & Dragons tabletop!</h2>" + 
      "<p class='no-map-message__text'>To get started, upload a map and add your customizable characters using the settings panel on the left.</p> <p class='no-map-message__text'>Everything is saved automatically to your browser's storage.</p>" + 
    "</div>";
    return (
      props.characters.map(characterPiece).join("") +
      (props.map
        ? "<img alt='' draggable='false' src='" + props.map + "' style='width:" + props.zoom + "%;' />"
        : noMap)
    );
  }
});

var CharacterList = new Reef("#characterList", {
  store: store,
  template: function (props) {
    return '<ul>' + props.characters.map(characterListItem).join("") + '</ul>';
  }
});

var ToggleSettingsBtn = new Reef("#toggleSettingsBtn", {
  store: store,
  template: function (props) {
    var btnText = props.settingsExpanded ? 'Hide' : 'Show'
    var arrow = props.settingsExpanded ? 'arrow arrow-up' : 'arrow arrow-down'

    return '<button data-toggle-settings class="btn-toggle grid-row" aria-expanded="' + props.settingsExpanded + '">' + btnText + ' Settings<span class="' + arrow + '"></span></button>'
  }
})

//// Inits
getDatafromStorage();
ToggleSettingsBtn.render();
Map.render();
CharacterList.render();

//// Events
document.addEventListener("render", renderHandler, false);

document.addEventListener("input", inputHandler, false);

document.addEventListener("click", clickHandler, false);

document.addEventListener("dragstart", dragStartHandler,false);

document.addEventListener("touchstart", dragStartHandler,false);

document.addEventListener("touchmove", touchMoveHandler,false);

document.addEventListener("dragover", function (event) {event.preventDefault();}, false);

document.addEventListener("drop", dropHandler, false);

document.addEventListener("touchend", dropHandler, false);

document.addEventListener("dragend", dragEndHandler, false);


})();