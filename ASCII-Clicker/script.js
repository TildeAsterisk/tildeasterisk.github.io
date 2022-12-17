//#region ~* ASCII ART *~

box_button = `+-------------+
|   Action!   |
+-------------+`;

egg_symbol="&#129370;";

large_box = `+----------------+
|                |
|                |
|                |
|       o        |
+----------------+`;

wave_symbol=`<span>&#8779;</span>`;

//#endregion

//#region ~* Variable Defenitions *~
// Set initial score to 0
var score = 0;
var scoreElement = document.getElementById("score");
var clickerElement = document.getElementById("clicker");
var starsElement = document.getElementById("inventory-element");
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
  ['Neural implant',99,1.4],
  ['Mini Drone',50,1.3],
  ['Sonic pulse',99,1.4],
  ['Hardlight projection',99,1.5],
  ['BMI Neuralink',999,2],
  ['Gravity field gen',999,2],
  ['magical clicking wand',10,1.1],
  ['team of trained clicker-monkeys',10,1.1],
  ['Finger Machine',10,1.1],
  ['Interdimensional Clone',10,1.1],
  ['Trained Monkey',10,1.1],
  ['Trained Dog',10,1.1],
  ['Trained Bearded Dragon',10,1.1],
  ['Trained Fox',10,1.1],
  ['Trained Cat',10,1.1],
  ['Cat',10,1.1],
  ['Click Portal',10,1.1],
  ['Army of drones',10,1.1],
  ['Time machine',10,1.1],
  ['Genie click wish',10,1.1],
  ['Mechanical clicker',10,1.1],
  ['Clicking potion',10,1.1],
  ['Fast-moving cursor',10,1.1],
  ['Holographic clicker',10,1.1],
  ['Clicking spell',10,1.1],
  ['Super-powered finger',10,1.1],
  ['Clicking automation',10,1.1],
  ['Time-loop clicking',10,1.1],
  ['Clicking clone army',10,1.1],
  ['Button-mashing robot',10,1.1],
  ['Clicking aura',10,1.1],
  ['Instantaneous clicking',10,1.1],
  ['Clicking miracle',10,1.1],
  ['Clicking vortex',10,1.1],
  ['Clicking frenzy',10,1.1],
  ['Clicking frenzy spell',10,1.1],
  ['Clicking charm',10,1.1],
  ['Infinite clicking power',10,1.1],
  ['Arcane clicking power',10,1.1],
  ['Clicking god mode',10,1.1],
  ['Clicking god mode spell',10,1.1],
  ['Clicking force field',10,1.1],
  ['Clicking god mode aura',10,1.1],
  ['Clicking god mode potion',10,1.1],
  ['Mechanical clicking device',50,1.5],
  ['Electric button presser',100,1.1],
  ['Robotic button masher',150,1.1],
  ['High-speed clicking machine',200,1.1],
  ['Superpowered clicking gloves',250,1.5],
  ['Hyperclicking boots',300,1.1],
  ['Ultra-efficient clicking belt',350,1.5],
  ['Infinite clicking staff',400,1.0],
  ['Magical clicking wand',450,1.5],
  ['Divine clicking hammer',500,1.0],
  ['Automated clicking robot',550,1.5],
  ['Hyperspace clicking portal',600,1.0],
  ['Temporal clicking accelerator',650,1.75],
  ['Gravity-defying clicking boots',700,1.80],
  ['Supercomputer-assisted clicking device',750,1.85],
  ['Quantum clicking machine',800,1.90],
  ['Interdimensional clicking portal',850,1.95],
  ['Multiversal clicking staff',900,1.100],
  ['Cosmic clicking gloves',950,1.105],
  ['Divine clicking hammer',1000,1.110]
  ]; 
  var inventory = [];
  var inventoryItemList = [];

// ~~~* ASCII HTML ELEMENTS *~~~ \\
var buttonElement = document.getElementById("ASCII-Button");
buttonElement.innerHTML = box_button;

var shopBoxElement = document.getElementById("shop-box");
var shopItemElement = document.getElementById("shop-item-info");
var shopContainerElement = document.getElementById("shop-container");
var inventoryElement = document.getElementById("inventory-element");
var minigameElement = document.getElementById("mini-game-element");
var gameTitleDivElement=document.getElementById("game-title-element");
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
      alert("You cannot afford the"+shopItem[0]+", it costs: "+shopItem[1]+". You have: "+score.toFixed()+". The shop has been reset.");
      GenerateShopItem()
    }
  };
}

function GenerateShopItem(){
  //Generate a new item in the shop
  shopItem=shopItemList[Math.floor(Math.random() * shopItemList.length)];
  shopItemOutput_ASCII = `
  +--------- - - - - -<br>
  | Buy:<br>
  | `+shopItem[0]+`<br>
  | `+shopItem[1]+`<span>&#442;</span> `+shopItem[2]+`<span>&#8859;</span><br>
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
  scoreElement.innerHTML = wave_symbol+` `+score.toFixed(2)+`<span>&#442;</span>`;
}

function UpdateInventoryElement(){
  starsElement.innerHTML = `<u>
  Inventory:</u>`+inventory+`<br>
  ______________<br>&#8859 `+CalculateItemMultiplier().toFixed(9);
}

function ToggleInventoryElement(){
  var x = inventoryElement;
  var hiddenInvString="<u>Inventory:<br>&nbsp&nbsp* * *&nbsp&nbsp&nbsp</u><br>&#8859 "+CalculateItemMultiplier().toFixed(5);
  if (x.innerHTML.includes("* * *")) {
    UpdateInventoryElement();  
  } 
  else {
    x.innerHTML=hiddenInvString;
  }
}

function MiniGame(){
  var minigameText;
  if(score>=150){
    minigameText=`<br>There is an egg in the box!`;
    minigameElement.innerHTML=large_box+minigameText;
  }
  else if(score>=100){
    gameTitleDivElement.innerHTML="";
    minigameText=`<br>Suddenly a box appears!`;
    minigameElement.innerHTML=large_box+minigameText;
  }
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

  //Minigame
  MiniGame();

  // Update the HTML elements
  UpdateScoreElement();
  //UpdateInventoryElement();
}

// Add an event listener to the clicker element
clickerElement.addEventListener("click", function() {Clicker();});
inventoryElement.addEventListener("click", function() {ToggleInventoryElement();});


// will execture function once every tdelay ms
var tdelay = 500;
window.setInterval(function(){MainLoop()}, tdelay);
