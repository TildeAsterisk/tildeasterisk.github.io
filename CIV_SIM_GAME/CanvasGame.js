var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "black";
var ctx = canvas.getContext("2d");

function DrawFloor(){
  ctx.fillStyle = "darkgrey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw something on the canvas
DrawFloor();

var charCount=0;

//class char and sdtructure

class Focus {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    this.isAlive=true;
  }
}


//Generate random spawn point on canvas
function RandomSpawnPoint(){
  return randomSpawn=[(Math.random()*canvas.width), (Math.random()*canvas.height)];
}

// Function to spawn a character at the clicked position
function spawnCharacterOnClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  var newCharacter = new Character("Ally",basicStats);
  // Create a new character at the clicked position
  if( [Math.round(Math.random())] != 1){
    newCharacter = new Character("Enemy",enemybasicStats);
  }
  else{
    //still ally
  }
  
  newCharacter.position=[mouseX-(newCharacter.size[0]/2), mouseY-(newCharacter.size[1]/2)];

  // Spawn the new character
  newCharacter.SpawnCharacter();
}

function SpawnStructureOnClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Create a new character at the clicked position
  const newStructure = new Structure(
    "Basic Structure",
    basicStructureStats
  );

  newStructure.position=[mouseX-(newStructure.size[0]/2),mouseY-(newStructure.size[1]/2)]

  // Spawn the new character
  newStructure.SpawnCharacter();

  //SUBTRACT COST FROM STATS
}


function UpdatePlayerMode(userMode=undefined){
  if(userMode){
    PlayerObj.mode=userMode;
  }
  else{
    userMode=PlayerObj.mode;
  }

  switch(PlayerObj.mode) {
    case "Inspecting":
      canvas.style.cursor = "crosshair";
      if(PlayerObj.selected!=undefined){
        PlayerObj.selected = undefined;
        document.getElementById("GameTxtMsg1").innerHTML="Nothing selected";
      }
      break;
    case "Spawn Character":
      canvas.style.cursor = "copy";
      break;
    case "Build Structure":
      canvas.style.cursor = "cell";
      break;
    case "Build Mode":
      canvas.style.cursor = "all-scroll";
      BuildModeUI();
      break;
    default:
      canvas.style.cursor = "pointer";
  }
  gameTxtMsg1Elem.innerHTML = "Mode: "+PlayerObj.mode;
}

function CanvasToGridPos(pointX, pointY, cellSize) {
  // Calculate the number of cells in both dimensions
  const numCellsX = Math.floor(canvas.width / cellSize);
  const numCellsY = Math.floor(canvas.height / cellSize);

  // Calculate the grid position by rounding to the nearest cell
  const gridPosX = Math.round(pointX / cellSize);
  const gridPosY = Math.round(pointY / cellSize);

  // Ensure the grid position is within the valid range
  const clampedGridPosX = Math.max(0, Math.min(numCellsX - 1, gridPosX));
  const clampedGridPosY = Math.max(0, Math.min(numCellsY - 1, gridPosY));

  // Calculate the final coordinates of the closest cell
  const closestCellX = clampedGridPosX * cellSize;
  const closestCellY = clampedGridPosY * cellSize;

  /* Return the result as an object
  return {
      x: closestCellX,
      y: closestCellY,
      gridPosX: clampedGridPosX,
      gridPosY: clampedGridPosY,
  };
  */
 return [closestCellX,closestCellY];
}

  // OnClick Event Listener Function
  function OnPlayerClick(event){
    //console.log("Click!");
    switch(PlayerObj.mode) {
      case "Inspecting":
        const rect   = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        //foreach character check if ismouseover
        ActiveCharactersArray.forEach(char => {
          if (char.isMouseOver(mouseX, mouseY)) {
            console.log("Mouse clicked on a character named "+char.name+".");
            console.log(char);
            PlayerObj.selected=char;
            //change html
            PlayerObj.ChangeSelectedUnit(char);
            
          }
          else{
            //console.log("Nothing Selected.");
            //ChangeSelectedUnit(undefined);
          }
        })
        break;
      case "Spawn Character":
        console.log("Spawning character on click");
        spawnCharacterOnClick(event);
        break;
      case "Build Mode":
        console.log("Spawn build object: "+PlayerObj.buildItemSelection);
        SpawnStructureOnClick(event);
        break;
      case "Build Structure":
        console.log("Spawning Structure on click.");
        SpawnStructureOnClick(event);
        break;
      default:
        //Do Nothing
    }
  }

  /*
  ____        _ _     _   __  __           _      
 |  _ \      (_) |   | | |  \/  |         | |     
 | |_) |_   _ _| | __| | | \  / | ___   __| | ___ 
 |  _ <| | | | | |/ _` | | |\/| |/ _ \ / _` |/ _ \
 | |_) | |_| | | | (_| | | |  | | (_) | (_| |  __/
 |____/ \__,_|_|_|\__,_| |_|  |_|\___/ \__,_|\___|

  */

  //Every frame when build mode is selected
  function BuildModeUI(){
    //Set build mode, GenerateBuildMenu
    //GenerateBuildMenu();

    //Get Selected Build
    selectElement = document.querySelector('#build-selection');
    PlayerObj.buildItemSelection = selectElement.value;
    //document.querySelector('.output').textContent = buildItemSelection;
    switch (PlayerObj.buildItemSelection){
      case "Wall":
        //Display highlited object at mouse
        //console.log("Building Wall");
        //buildGuideSize=[wallBuildStats.size[0],wallBuildStats.size[1]];
        break;
      case "Shelter":
        //buildGuideSize=[25,25];
        break;
      default:
        console.log("Building "+PlayerObj.buildItemSelection);
        //buildGuideSize=[wallBuildStats.size[0],wallBuildStats.size[1]];
        break;
    }
    //Draw Selected Object
    ctx.fillStyle = "lightgreen";
    //only place along grid
    var gridCellSize = 25;
    var buildGridPos=CanvasToGridPos(PlayerObj.mouseX, PlayerObj.mouseY, gridCellSize);
    ctx.fillRect(buildGridPos[0],buildGridPos[1], gridCellSize,gridCellSize);
  }


function UpdatePlayerMousePos(event){
  //Add isMouseOver event listener
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  PlayerObj.mouseX=mouseX;
  PlayerObj.mouseY=mouseY;
  /*
  //foreach character check if ismouseover
  ActiveCharactersArray.forEach(char => {
    if (char.isMouseOver(mouseX, mouseY)) {
      console.log("Mouse is over character "+char.name);
      //ChangeSelectedUnit(this);
      //this.colour="lightgreen";
      //this.DrawCharacter();
      //this.size=[30,30];
    }
    else{
      //ChangeSelectedUnit(undefined);
      //this.colour=this.defaultColour;
      //this.size=[basicStats.size,basicStats.size];
      //player.DrawCharacter(); 
      //this.size=[15,15];
    }
  });
  */
}



function isPositionOnCanvas(x, y) {
  return x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height;
}

function GenerateRandomPositionInRange(centrePos,range) {
  var randomAngle = Math.random() * 2 * Math.PI;
  var randomDistance = Math.random() * range * 2;

  // Calculate the random position within the specified radius
  var destinationX = centrePos[0] + randomDistance * Math.cos(randomAngle);
  var destinationY = centrePos[1] + randomDistance * Math.sin(randomAngle);

  return [destinationX, destinationY];
}

function GameLog(string){
  currentGameLog+=string;
  gameLogElem.innerHTML = `<div id="GameLog"><hr><i>`+string+`</i><br></div>`;
}



//===*~ STATS *~===\\
//#region stats Objects
const basicStats = {
  health    : 100,
  attack    : 1,
  defense   : 5,
  speed     : 1,
  range     : 70,
  position  : undefined,
  size      : [15,15],
  direction : 1,
  colour    : "black",
  text      : "😐",
  type      : "Ally",
  enemyTypes: "Enemy,Structure"
};
const enemybasicStats = {
  health    : 100,
  attack    : 1,
  defense   : 2,
  speed     : 1,
  range     : 70,
  position  : undefined,
  size      : [15,15],
  direction : 1,
  colour    : "darkred",
  text      : "😈",
  type      : "Enemy",
  enemyTypes: "Ally,Structure"
};
const basicStructureStats = {
  health    : 250,
  attack    : 0,
  defense   : 10,
  speed     : undefined,
  range     : 50,
  position  : [50,50],
  size      : [40,40],
  direction : undefined,
  colour    : "blue",
  text      : "X",
  type      : "Structure",
  enemyTypes: "Enemy",
  capacity  : 3
};
const wallBuildStats = {
  health : 10,
  size      : [40,10],
}
//#endregion

/*
   _____                         _____ _             _   
  / ____|                       / ____| |           | |  
 | |  __  __ _ _ __ ___   ___  | (___ | |_ __ _ _ __| |_ 
 | | |_ |/ _` | '_ ` _ \ / _ \  \___ \| __/ _` | '__| __|
 | |__| | (_| | | | | | |  __/  ____) | || (_| | |  | |_ 
  \_____|\__,_|_| |_| |_|\___| |_____/ \__\__,_|_|   \__|

*/
const PlayerObj = new Player(); //There must only be one

//Get html elements at start
const controlPanelElem=document.getElementById("controlpanel");
controlPanelElem.innerHTML=PlayerObj.GenerateControlPanelHTML();
const gameTxtMsg1Elem=document.getElementById("GameTxtMsg1");
const gameLogElem = document.getElementById("GameLog");
var currentGameLog="";

var ActiveCharactersArray = [];

UpdatePlayerMode('Inspecting')

// Add a click event listener to( the canvas to spawn a character on click
canvas.addEventListener("click", OnPlayerClick);
canvas.addEventListener("mousemove", UpdatePlayerMousePos);

//Spawn Characters
var playerBase = new Structure("Tent", basicStructureStats);
playerBase.SpawnCharacter();
playerBase.position=[canvas.width/2,canvas.height/2];

var basepos=[playerBase.position[0]+1,playerBase.position[1]-1];
var a1=new Character("Ally",  basicStats,basepos);
a1.SpawnCharacter()
playerBase.EnterCharacterIntoStructure(a1);
var a2=new Character("Ally",  basicStats,basepos);
a2.SpawnCharacter()
playerBase.EnterCharacterIntoStructure(a2);
var a3=new Character("Ally",  basicStats,basepos);
a3.SpawnCharacter();
playerBase.EnterCharacterIntoStructure(a3);
/*
var a4=new Character("Ally",  basicStats,basepos);
a4.SpawnCharacter();
playerBase.EnterCharacterIntoStructure(a4);
var a5=new Character("Ally",  basicStats,basepos);
a5.SpawnCharacter();
playerBase.EnterCharacterIntoStructure(a5);
var a6=new Character("Ally",  basicStats,basepos);
a6.SpawnCharacter();
playerBase.EnterCharacterIntoStructure(a6);
var a7=new Character("Ally",  basicStats,basepos);
a7.SpawnCharacter();
playerBase.EnterCharacterIntoStructure(a7);
var a8=new Character("Ally",  basicStats,basepos);
a8.SpawnCharacter();
playerBase.EnterCharacterIntoStructure(a8);
var a9=new Character("Ally",  basicStats,basepos);
a9.SpawnCharacter();
playerBase.EnterCharacterIntoStructure(a9);
var a10=new Character("Ally",  basicStats,basepos);
a10.SpawnCharacter();
playerBase.EnterCharacterIntoStructure(a10);
*/

new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();


function Main(){
  DrawFloor(); //Draw background

  //For each active character in game...
  ActiveCharactersArray.forEach(char => {
    
    if (!char.isIndoors){
      //Update each character logic
      char.UpdatePosition();
      
      //Draw each character on screen
      char.DrawCharacter();
    }
    else{
      //Is indoors, randomly chooose to leave
      /*if( [Math.round(Math.random()*500)] == 1){
        char.focus.ExitCharacterFromStructure(char);
      }*/
      
    }

  });

  //Update Player UI
  if(PlayerObj.selected!=undefined){
    PlayerObj.UpdateUnitStatsHTML();
  }

  if(PlayerObj.mode=="Build Mode"){
    //highlight build object in mouse place
    UpdatePlayerMode();
  }


}


var lastTime = performance.now();
var deltaTime = 0;
var interval = 16; // 60 fps

function Update() {
  var now = performance.now();
  deltaTime += now - lastTime;
  lastTime = now;

  while (deltaTime >= interval) {
    // update the game state
    deltaTime -= interval;
  }

  Main();

  // render the game graphics
  requestAnimationFrame(Update);
}

requestAnimationFrame(Update);
