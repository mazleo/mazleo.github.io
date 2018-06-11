var container;
var canvas;
var ctx;

// Keeps track of all x positions that
// are taken
var takenXPos;

// Number of x positions that exist
var numXPos;
// Number of y positions to create above screen
var numYPos;

// Size of each character
var charSize;
// Size of each column
var columnSize;

// Contains the japanese hiragana
// characters to be used in drops
var CHARACTERS;

// Character fill styles
// 0: white
// 1: gray: rgb(179,178,179)
// 2: gray: rgb(112,111,112)
// 3: white-green: rgb(88,106,94)
// 4: green: rgb(29,98,32)
// 5: -0.2 opacity
// 6: -0.4 opacity
// 7: -0.6 opacity
// 8: -0.8 opacity
// 9: 0 opacity
var FILL_STYLES;

/*----- DROP -----*/
// Number of Chars in each drop; 20 - 46
var dropLength;
// Characters in the drop
var dropChars;
// Char to fade
var fadeIndex;
// Number of characters to fade
var numToFade;
// The x position of the drop
var dropXPos;
// The starting y position of the drop
var initDropYPos;

/*----- CHAR -----*/
// The character of the Char
var char;
// X position of char
var xPos;
// Y position of char
var yPos;
// Char fill style
var fillStyle;
// Char fill style number
var fillStyleIndex;
// Char index in drop
var index;

// Create and initialize canvas
container = document.getElementById("matrix-js");
container.innerHTML = "<canvas id='canvas'></canvas>";
canvas = document.getElementById("canvas");
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;
ctx = canvas.getContext("2d");

FILL_STYLES = [];
FILL_STYLES[0] = "rgba(255,255,255,1)";
FILL_STYLES[1] = "rgba(179,178,179,1)";
FILL_STYLES[2] = "rgba(112,111,112,1)";
FILL_STYLES[3] = "rgba(88,106,94,1)";
FILL_STYLES[4] = "rgba(29,98,32,1)";
FILL_STYLES[5] = "rgba(29,98,32,0.8)";
FILL_STYLES[6] = "rgba(29,98,32,0.6)";
FILL_STYLES[7] = "rgba(29,98,32,0.4)";
FILL_STYLES[8] = "rgba(29,98,32,0.2)";
FILL_STYLES[9] = "rgba(29,98,32,0)";

CHARACTERS = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

charSize = 17;

numXPos = Math.ceil(canvas.width / charSize);
numYPos = Math.ceil(400 / charSize);

ctx.font = "bold " + charSize + "px Arial";

takenXPos = [];

rainAnimate();

// Constructor for a single character
function Char(xPosition, yPosition, index) {
  this.char = CHARACTERS.charAt(Math.floor(Math.random() * 46));
  this.xPos = xPosition;
  this.yPos = yPosition;
  this.index = index;
  this.fillStyle = FILL_STYLES[0];
  this.fillStyleIndex = 0;
}

// Constructor for a single rain drop
function Drop() {
  this.dropLength = Math.floor(Math.random() * ((46 - 20) + 1)) + 20;
  this.dropChars = [];
  this.fadeIndex = 0;
  this.numToFade = 1;
  this.initDropYPos = 0 - (Math.round(Math.random() * numYPos) * charSize);
  // Generate random x position that is not taken
  this.dropXPos = Math.round(Math.random() * numXPos) * charSize;
  while (isXTaken(this.dropXPos)) {
    this.dropXPos = Math.round(Math.random() * numXPos) * charSize;
  }
  takenXPos.push(this.dropXPos);
}

// Complete rain animation
function rainAnimate() {
  // Contains all drops
  var drops;

  // The minimum number of drops; 80% of the number of
  // x positions
  var minNumDrops;
  // The maximum number of drops; the number of x positions
  var maxNumDrops;
  // The number of drops
  var numDrops;
  var changeInterval;

  minNumDrops = Math.ceil(0.8 * numXPos);
  maxNumDrops = numXPos;

  numDrops = Math.floor(Math.random() * ((maxNumDrops - minNumDrops) + 1)) + minNumDrops;
  drops = [];
  for (var n = 0; n < numDrops; n++) {
    drops[n] = new Drop();
  }

  drawChars(drops);

  // Interval for randomly changing a random character
  // in all drops
  changeInterval = setInterval(function() {
    var indexToChange = [];
    var randomChar = [];

    for (var d = 0; d < drops.length; d++) {
      indexToChange[d] = Math.floor(Math.random() * drops[d].dropLength);
      randomChar[d] = CHARACTERS.charAt(Math.floor(Math.random() * 46));

      drops[d].dropChars[indexToChange[d]].char = randomChar[d];
    }
  }, 10);
}

// Draws all drop characters
function drawChars(drops) {
  // Reset canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Iterate through each drop. At each iteration
  // add a new character to the drop. Change the style
  // to add white to green effect in the front, and
  // fading to black tail. Draw all characters then reset
  // every drop whose tail reaches the bottom of the screen
  for (var n = 0; n < drops.length; n++) {
    var drop = drops[n];

    // Add new character
    if (drop.dropChars.length == 0) {
      drop.dropChars[0] = new Char(drop.dropXPos, drop.initDropYPos, 0);
    }
    else {
      var previousChar = drop.dropChars[drop.dropChars.length - 1];
      drop.dropChars[previousChar.index + 1] = new Char(drop.dropXPos, previousChar.yPos + 17, previousChar.index + 1);
    }

    // Create white fading to green front
    if (drop.dropChars.length > 1) {
      var currentChar;
      var currentFillStyle;
      for (currentChar = drop.dropChars.length - 1, currentFillStyle = 0; currentChar >= 0 && currentFillStyle < 5; currentFillStyle++, currentChar--) {
        drop.dropChars[currentChar].fillStyleIndex = currentFillStyle;
        drop.dropChars[currentChar].fillStyle = FILL_STYLES[currentFillStyle];
      }
    }

    // Fade tail
    if (drop.dropChars.length > drop.dropLength) {
      if (drop.dropChars[drop.fadeIndex].fillStyleIndex > 8) {
        drop.fadeIndex++;
      }

      for (var f = 0; f < drop.numToFade && drop.fadeIndex + f < drop.dropChars.length; f++) {
        drop.dropChars[drop.fadeIndex + f].fillStyleIndex++;
        drop.dropChars[drop.fadeIndex + f].fillStyle = FILL_STYLES[drop.dropChars[drop.fadeIndex + f].fillStyleIndex];
      }
      drop.numToFade++;
    }

    // Draw all chars
    for(var c = 0; c < drop.dropChars.length; c++) {
      ctx.fillStyle = drop.dropChars[c].fillStyle;
      ctx.fillText(drop.dropChars[c].char, drop.dropChars[c].xPos, drop.dropChars[c].yPos);
    }

    // Reset drop
    // Remove from taken x pos when done
    if (drop.fadeIndex > numYPos) {
      var indexOfXPos = takenXPos.indexOf(drop.dropXPos);
      takenXPos.splice(indexOfXPos, 1);

      drops[n] = new Drop();
    }
  }

  // Animate drops
  setTimeout(function() {
    requestAnimationFrame(function() {
      drawChars(drops);
    });
  }, 50);
}

// Checks if x position is taken
function isXTaken(xCheck) {
  if (takenXPos.indexOf(xCheck) != -1) {
    return true;
  }
  else {
    return false;
  }
}
