//#region ~* ASCII ART *~

box_button = `
+-------------+
|   Action!   |
+-------------+
`;

large_box = `
+----------------+
|                |
|                |
|                |
|                |
+----------------+
`;

wave_symbol=`<span>&#8779;</span>`

//#endregion

//#region ~* Variable Defenitions *~
// Set initial score to 0
var score = 0;
var scoreElement = document.getElementById("score");
var clickerElement = document.getElementById("clicker");
var starsElement = document.getElementById("GenStars");
var shopItemList = [
  'Mechanical arm',
  'Plunger',
  'Pile of rocks',
  'Pebbles',
  'Hammer',
  'Mallet',
  'Rubber chicken',
  'Robotic finger',
  'Robotic hand',
  'Laser pointer', // or other light-based tool
  'Suction cup', //or other adhesive device
  'Pair of nunchucks', // or other martial arts weapon
  'Pile of sticks']; // or other kindling material
  var itemPrice = 10;
  var inventory = [];

// ~~~* ASCII HTML ELEMENTS *~~~ \\
var buttonElement = document.getElementById("ASCII-Button");
buttonElement.innerHTML = box_button;

var shopBoxElement = document.getElementById("shop-box");
var shopItemElement = document.getElementById("shop-item-info");
var shopContainerElement = document.getElementById("shop-container");
//#endregion

//#region ~* Functions *~
var itemName;
var shopItemOutput_ASCII;
function Clicker(){
  // Increment the score when the clicker is clicked
  score++;

  // Update the score element with the new score
  UpdateScoreElement();

  //shopItemElement.innerHTML = shopItemOutput_ASCII;
  shopContainerElement.onclick = function () {
    console.log("Button is clicked");
    BuyItem();
    GenerateShopItem();
  };
}

function GenerateShopItem(){
  //Generate a new item in the shop
  itemName=shopItemList[Math.floor(Math.random() * shopItemList.length)];
  shopItemOutput_ASCII = `
  +--------- - - - - -<br>
  | Buy:<br>| `+itemName+`<br>
  | Price:<br>
  | `+itemPrice+`<span>&#677; 10&#442; 10&#8859;</span>`+`<br>
  +--------- - - - - -`;
}

var itemBought = false;
function BuyItem(){
  score = score-itemPrice;
  //store item in inventory
  itemBought = true;

  inventory.push(`<br>`+itemName);

  var autopoints=0;
  for (i in inventory){
    autopoints += 0.5;
  }

  starsElement.innerHTML = `<u>
  Inventory:</u>`+inventory+`<br>
  __________<br>+ `+autopoints;

  UpdateScoreElement();
}

function UpdateScoreElement(){
  scoreElement.innerHTML = wave_symbol+` `+score;
}
//#endregion

//~~~* MAIN CODE STARTS HERE *~~~\\

GenerateShopItem();

function MainLoop(){
  // Update the score element with the new score
  UpdateScoreElement();
  //If the score is >10 then show generated shop output
  if (score>=itemPrice){
    shopItemElement.innerHTML = shopItemOutput_ASCII;
  }
  else{
    shopItemElement.innerHTML = ``;
  }

  //Do something if item bought
  for (i in inventory){
    score += 0.5;
  }

}

// Add an event listener to the clicker element
clickerElement.addEventListener("click", function() {Clicker();});

//shopContainerElement.addEventListener("buyitem", function() {score-=1;});

// will execture function once every tdelay ms
var tdelay = 500;
window.setInterval(function(){MainLoop()}, tdelay);
