/*                  __         .__        
 *    _____ _____ _/  |________|__|__  ___
 *   /     \\__  \\   __\_  __ \  \  \/  /
 *  |  Y Y  \/ __ \|  |  |  | \/  |>    <
 *  |__|_|  (____  /__|  |__|  |__/__/\_ \
 *        \/     \/                     \/
 *  By Jonnelin Marzielli Leonardo
 */

var container;
var canvas;
var ctx;

// Contains the fill style for initializing program
var INIT_FILL_STYLE;
// Contains initializing program font
var INIT_FONT;
// Second initializing font
var INIT_FONT2;
// Initial x position of initializing program
var INIT_XPOS;
// Initial y position of initializing program
var INIT_YPOS;
// Second y initializing y pos
var INIT_YPOS2;
// Initial program character size
var INIT_CHARSIZE;

// Padding
var padding;
// Number of columns in canvas with padding
var nColumns;
// Number of rows in canvas with padding
var nRows;
// Contains all column objects
var COLUMNS;
// Phone number containing numbers
var PHONE_NUMBER;

/*----- Digit fill styles -----*/
// 0: Dark green; rgba(17,97,30,1)
// 1: Light green; rgba(82,168,97,1)
var DIGIT_FILL_STYLES;

// Phone number fill style
var PHONENUM_FILL_STYLE;

// Whether to continue digit animation frame
var DIGIT_ANIMATION_FRAME;

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

/*----- Time -----*/
// Date object
var dateObject;
// Current month
var month;
// Current date
var date;
// Current year
var year;
// Current hour
var hour;
// Current minute
var minute;
// Current second
var second;

/*----- Cursor -----*/
// Width of cursor
var cursorWidth;
// Height of cursor
var cursorHeight;
// X position of cursor
var cursorXPos;
// Y position of cursor
var cursorYPos;

/*----- Column -----*/
// Number of digits in column
var numDigits;
// An array of digits
var digits;
// Initial x position
var initColumnXPos;
// Initial y position of first digit
var initColumnYPos;
// To draw or not draw column; initially true
var isDisplayed;

/*----- Digit -----*/
// Digit character
var digitChar;
// X position
var digitXPos;
// Y position
var digitYPos;
// Digit fill style
var digitFillStyle;

/*----- Number -----*/
// The number character
var numberChar;
// The x position
var numberXPos;
// The y position
var numberYPos;
// If the number is displayed or not
var isNumberDisplayed

/*----- DROP -----*/
// Number of Chars in each drop; (number of rows in screen * 2) - (number of rows in
// screen * 4)
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

// Initializing program 1
INIT_CHARSIZE = 13;
INIT_FILL_STYLE = "rgba(0,173,2,1)";
INIT_FONT = "bold 14px Monospace";
INIT_FONT2 = "bold " + INIT_CHARSIZE + "px Monospace";
INIT_XPOS = 17;
INIT_YPOS = 30;
INIT_YPOS2 = 30 + INIT_CHARSIZE;

DIGIT_FILL_STYLES = [];
DIGIT_FILL_STYLES[0] = "rgba(17,97,30,1)";
DIGIT_FILL_STYLES[1] = "rgba(82,168,97,1)";

PHONENUM_FILL_STYLE = "rgba(103,148,102,1)";

padding = 17;

nColumns = Math.floor((canvas.width - (padding * 2)) / INIT_CHARSIZE);
nRows = Math.floor((canvas.height - (padding * 2) - INIT_CHARSIZE) / INIT_CHARSIZE);

DIGIT_ANIMATION_FRAME = true;

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

CHARACTERS = "日アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

charSize = 13;

numXPos = Math.ceil(canvas.width / charSize);
numYPos = Math.ceil((canvas.height * 3) / charSize);

takenXPos = [];

// Initializing program styling
ctx.font = INIT_FONT;
ctx.fillStyle = INIT_FILL_STYLE;

// Get current date and time
dateObject = new Date();
month = dateObject.getMonth() + 1;
date = dateObject.getDate();
year = dateObject.getFullYear() - 2000;
hour = dateObject.getHours();
minute = dateObject.getMinutes();
second = dateObject.getSeconds();

// Animate typewrite initial program
typewriteAnim("Call trans opt: received. " + month + "-" + date + "-" + year + " " + hour + ":" + minute + ":" + second + " REC:Log>,Trace program: running");

// Digital numbers sequence
setTimeout(function() {
  ctx.font = INIT_FONT2;

  initColumns();
  initPhoneNumber();

  digitAnim();
}, 10550);

// Second typewrite sequence
setTimeout(function() {
  DIGIT_ANIMATION_FRAME = false;
  typewriteNoCursorAnim("Wake up, Neo...:The Matrix has you...:Follow the white rabbit.");
}, 41550)
setTimeout(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText("Knock, Knock, Neo.", INIT_XPOS, INIT_YPOS);
}, 67000);

// Digital rain sequence
setTimeout(function() {
  ctx.font = "bold " + charSize + "px Arial";
  rainAnimate();
}, 70000);

// Constructor for cursor
function Cursor() {
  this.cursorWidth = 8;
  this.cursorHeight = 15;
  this.cursorXPos = 17;
  this.cursorYPos = 17;
}

// Constructor for each digit in the columns
function Digit(digitXPos, digitYPos) {
  this.digitChar = Math.floor(Math.random() * 10) + "";
  this.digitXPos = digitXPos;
  this.digitYPos = digitYPos;
  this.digitFillStyle = DIGIT_FILL_STYLES[Math.round(Math.random())];
}

// Constructor for each column
function Column(initColumnXPos) {
  this.numDigits = nRows;
  this.digits = [];
  for (var d = 0, ypos = INIT_YPOS2; d < this.numDigits; d++, ypos += INIT_CHARSIZE) {
    this.digits[d] = new Digit(initColumnXPos, ypos);
  }
  this.initColumnXPos = initColumnXPos;
  this.initColumnYPos = INIT_YPOS2;
  this.isDisplayed = true;
}

// Constructor for each number in the phone number
function Number(xPos) {
  this.numberChar = Math.floor(Math.random() * 10);
  this.numberXPos = xPos;
  this.numberYPos = 30;
  this.isNumberDisplayed = false;
}

// Constructor for a single character
function Char(xPosition, yPosition, index) {
  this.char = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  this.xPos = xPosition;
  this.yPos = yPosition;
  this.index = index;
  this.fillStyle = FILL_STYLES[0];
  this.fillStyleIndex = 0;
}

// Constructor for a single rain drop
function Drop() {
  // this.dropLength = Math.floor(Math.random() * ((((canvas.height / charSize) * 2) - (canvas.height / charSize)) + 1)) + (canvas.height / charSize);
  this.dropLength = Math.floor(Math.random() * ((((canvas.height / charSize) * 3) - (canvas.height / charSize)) + 1)) + (canvas.height / charSize);
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

// Flickers the cursor n number of times at the given
// x and y position
function flickerCursor(cursor, xPos, yPos, n) {
  cursor.cursorXPos = xPos;
  cursor.cursorYPos = yPos;
  flickerLoop(cursor, n, 0);
}

// Loop for flickering cursor n times; i is iterative counter
function flickerLoop(cursor, n, i) {
  if (i == n) {
    return;
  }
  ctx.fillRect(cursor.cursorXPos, cursor.cursorYPos, cursor.cursorWidth, cursor.cursorHeight);
  setTimeout(function() {
    ctx.clearRect(cursor.cursorXPos, cursor.cursorYPos, cursor.cursorWidth + 1, cursor.cursorHeight + 1);
    i++;
    setTimeout(function() {
      flickerLoop(cursor, n, i);
    }, 200);
  }, 500);
}

// Complete first typewrite animation
function typewriteAnim(consoleTexts) {
  var consoleLines;
  var cursor;

  consoleLines = consoleTexts.split(",");
  cursor = new Cursor();

  // Flicker cursor 10 times
  flickerCursor(cursor, cursor.cursorXPos, cursor.cursorYPos, 3);
  // Typewrite first line
  setTimeout(function() {
    typewrite(cursor, consoleLines[0]);
  }, 2000);
  // Flicker after first typewrite
  setTimeout(function() {
    flickerCursor(cursor, cursor.cursorXPos, cursor.cursorYPos, 4);
  }, 4300);
  setTimeout(function() {
    typewrite(cursor, consoleLines[1]);
  }, 7000);
  // Flicker after first typewrite
  setTimeout(function() {
    flickerCursor(cursor, cursor.cursorXPos, cursor.cursorYPos, 4);
  }, 8000);
  // Clear canvas after flicker
  setTimeout(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 10500);
}

// Typewrite single line
function typewrite(cursor, text) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  typewriteLoop(cursor, text, 1);
}

// Recursive typewrite from starting character to character c
// c should start from 1
function typewriteLoop(cursor, text, c) {
  if (c > text.length) {
    return;
  }
  setTimeout(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(text.slice(0, c), INIT_XPOS, INIT_YPOS);
    cursor.cursorXPos = 17 + (7.75 * c);
    ctx.fillRect(cursor.cursorXPos, cursor.cursorYPos, cursor.cursorWidth, cursor.cursorHeight);
    c++;
    typewriteLoop(cursor, text, c);
  }, 40);
}

// Typewrite with no cursor
function typewriteNoCursor(text) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  typewriteNoCursorLoop(text, 1);
}

// Loop for typewriteNoCursor
function typewriteNoCursorLoop(text, c) {
  var typewriteSpeed = (Math.random() * (400 - 200)) + 200;

  if (c > text.length) {
    return;
  }
  setTimeout(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(text.slice(0, c), INIT_XPOS, INIT_YPOS);
    c++;
    typewriteNoCursorLoop(text, c);
  }, typewriteSpeed);
}

// Complete second typewrite animation
function typewriteNoCursorAnim(consoleTexts) {
  var consoleLines;

  consoleLines = consoleTexts.split(":");

  // Type first line
  typewriteNoCursor(consoleLines[0]);
  // Second line
  setTimeout(function() {
    typewriteNoCursor(consoleLines[1]);
  }, 6000);
  // Third line
  setTimeout(function() {
    typewriteNoCursor(consoleLines[2]);
  }, 15000);
}

// Initializes the columns
function initColumns() {
  COLUMNS = [];
  for (var c = 0, xpos = INIT_XPOS; c < nColumns; c++, xpos += INIT_CHARSIZE) {
    COLUMNS[c] = new Column(xpos);
  }
}

// Renews each digit in every column
function renewDigits() {
  for (var c = 0; c < COLUMNS.length; c++) {
    COLUMNS[c].digits = [];
    for (var d = 0, ypos = INIT_YPOS2; d < COLUMNS[c].numDigits; d++, ypos += INIT_CHARSIZE) {
      COLUMNS[c].digits[d] = new Digit(COLUMNS[c].initColumnXPos, ypos);
    }
  }
}

// Draws all digits in every column and all phone numbers to display every 50 ms
function drawDigits() {
  // Reset canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Renew all digits
  renewDigits();

  // Draw all phone numbers to display
  for (var p = 0; p < PHONE_NUMBER.length; p++) {
    if (PHONE_NUMBER[p].isNumberDisplayed) {
      ctx.fillStyle = PHONENUM_FILL_STYLE;
      ctx.fillText(PHONE_NUMBER[p].numberChar, PHONE_NUMBER[p].numberXPos, PHONE_NUMBER[p].numberYPos);
    }
  }

  // Draw all digits
  for (var c = 0; c < COLUMNS.length; c++) {
    if (!COLUMNS[c].isDisplayed) {
      continue;
    }
    for (var d = 0; d < COLUMNS[c].digits.length; d++) {
      ctx.fillStyle = COLUMNS[c].digits[d].digitFillStyle;
      ctx.fillText(COLUMNS[c].digits[d].digitChar, COLUMNS[c].digits[d].digitXPos, COLUMNS[c].digits[d].digitYPos);
    }
  }

  // Repeat every 50 ms
  setTimeout(function() {
    if (DIGIT_ANIMATION_FRAME) {
      DIGIT_ANIMATION_FRAME = requestAnimationFrame(drawDigits);
    }
  }, 50);
}

// Gets the number of columns displayed
function getNumDisplayedColumns() {
  var count;

  count = 0;
  for (var c = 0; c < COLUMNS.length; c++) {
    if (COLUMNS[c].isDisplayed) {
      count++;
    }
  }

  return count;
}

// The full digit animation
function digitAnim() {
  var digitInterval;
  var totalDisplayedColumns;
  var numColumnsToClear;

  drawDigits();

  // Clears a number of columns
  // and displays a number from the phone number
  // every 3 seconds
  // * Clears random columns and displays random numbers
  // Sets an interval every 3 seconds and clears it once
  // all columns are cleared
  totalDisplayedColumns = getNumDisplayedColumns();
  numColumnsToClear = Math.ceil(totalDisplayedColumns / 10);
  digitInterval = setInterval(function() {
    if (getNumDisplayedColumns() > 0) {
      var phoneNumToDisplay;

      for (var c = 0; c < numColumnsToClear && getNumDisplayedColumns() > 0; c++) {
        var columnToClear;

        columnToClear = Math.floor(Math.random() * totalDisplayedColumns);
        while (!COLUMNS[columnToClear].isDisplayed) {
          columnToClear = Math.floor(Math.random() * totalDisplayedColumns);
        }

        COLUMNS[columnToClear].isDisplayed = false;
      }

      phoneNumToDisplay = Math.floor(Math.random() * PHONE_NUMBER.length);
      while (PHONE_NUMBER[phoneNumToDisplay].isNumberDisplayed) {
        phoneNumToDisplay = Math.floor(Math.random() * PHONE_NUMBER.length);
      }

      PHONE_NUMBER[phoneNumToDisplay].isNumberDisplayed = true;
    }
    else {
      clearInterval(digitInterval);
    }
  }, 3000);
}

// Initializes the phone number
function initPhoneNumber() {
  PHONE_NUMBER = [];
  for (var p = 0, xpos = INIT_XPOS; p < 10; p++, xpos += INIT_CHARSIZE) {
    PHONE_NUMBER[p] = new Number(xpos);
  }
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
      if (drops[d].dropChars.length == 0) {
        break;
      }
      indexToChange[d] = Math.floor(Math.random() * drops[d].dropChars.length);
      randomChar[d] = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));

      drops[d].dropChars[indexToChange[d]].char = randomChar[d];
    }
  }, 30);
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
      drop.dropChars[previousChar.index + 1] = new Char(drop.dropXPos, previousChar.yPos + charSize, previousChar.index + 1);
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
    //if (drop.fadeIndex > (canvas.height/ charSize)) {
    if (drop.dropChars[drop.fadeIndex].yPos > canvas.height) {
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
