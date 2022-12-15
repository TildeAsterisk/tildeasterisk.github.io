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
  //Name, Price, ScoreMultiplier
  ['Mechanical arm',100,1.5],
  ['Plunger',5,1.1],
  ['Pile of rocks',1,1.1],
  ['Pebbles',5,1.1],
  ['Hammer',10,1.1],
  ['Mallet',10,1.1],
  ['Rubber chicken',3,1.1],
  ['Robotic finger',80,1.2],
  ['Laser pointer',10,1.1],// or other light-based tool
  ['Suction cup',10,1.1], //or other adhesive device
  ['Pair of nunchucks',30,1.2], // or other martial arts weapon
  ['Pile of sticks',1,1.1],// or other kindling material
  ['Laser beam',10,1.1],
  ['Telekinesis',100,1.2],
  ['VR interface',300,1.2],
  ['Neural implant',999,1.4],
  ['Mini Drone',50,1.3],
  ['Sonic pulse',4000,1.4],
  ['Hardlight projection',999,1.5],
  ['BMI Neuralink',999000,2],
  ['Gravity field gen',999999,2],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1],
  ['Cheap Ting',10,1.1]
  ]; 
  var inventory = [];
  var inventoryItemList = [];

// ~~~* ASCII HTML ELEMENTS *~~~ \\
var buttonElement = document.getElementById("ASCII-Button");
buttonElement.innerHTML = box_button;

var shopBoxElement = document.getElementById("shop-box");
var shopItemElement = document.getElementById("shop-item-info");
var shopContainerElement = document.getElementById("shop-container");
//#endregion

//#region ~* Functions *~
var shopItem;
var shopItemOutput_ASCII;
function Clicker(){
  // Increment the score when the clicker is clicked
  score++;

  // Update the score element with the new score
  UpdateScoreElement();

  //shopItemElement.innerHTML = shopItemOutput_ASCII;
  shopContainerElement.onclick = function () {
    if(score>=shopItem[1]){
      BuyItem();
      GenerateShopItem();
    }
    else{
      //Not enough money
      alert("You're too broke for that lol.");
    }
  };
}

function GenerateShopItem(){
  //Generate a new item in the shop
  shopItem=shopItemList[Math.floor(Math.random() * shopItemList.length)];
  shopItemOutput_ASCII = `
  +--------- - - - - -<br>
  | Buy:<br>| `+shopItem[0]+`<br>
  | Points/t:<br>
  | `+shopItem[2]+`<br>
  | Price:<br>
  | `+shopItem[1]+`<span>&#677; 10&#442; 10&#8859;</span>`+`<br>
  +--------- - - - - -`;
}

function CalculateItemMultiplier(){
  var multiplier=1;
  for (i in inventoryItemList){
    multiplier = multiplier * inventoryItemList[i][2];
  }
  return multiplier;
}

function BuyItem(){
  score = score-shopItem[1];
  //store item in inventory
  inventory.push(`<br>`+shopItem[0]);
  inventoryItemList.push(shopItem);

  UpdateInventoryElement();
  UpdateScoreElement();
}

function UpdateScoreElement(){
  scoreElement.innerHTML = wave_symbol+` `+score.toFixed(2);
}

function UpdateInventoryElement(){
  starsElement.innerHTML = `<u>
  Inventory:</u>`+inventory+`<br>
  __________<br>&#8859 `+CalculateItemMultiplier().toFixed(9);
}
//#endregion

//~~~* MAIN CODE STARTS HERE *~~~\\

GenerateShopItem();

function MainLoop(){
  //If the score is >10 then show generated shop output
  if (score>=10){
    shopItemElement.innerHTML = shopItemOutput_ASCII;
  }
  else{
    shopItemElement.innerHTML = ``;
  }

  //Add Score Multiplier
  if(inventoryItemList.length > 0){
    score += 1*CalculateItemMultiplier();
  }

  // Update the HTML elements
  UpdateScoreElement();
  //UpdateInventoryElement();
}

// Add an event listener to the clicker element
clickerElement.addEventListener("click", function() {Clicker();});

// will execture function once every tdelay ms
var tdelay = 500;
window.setInterval(function(){MainLoop()}, tdelay);
