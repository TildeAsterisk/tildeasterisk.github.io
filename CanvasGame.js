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

class Character {
  constructor(name,statsObj,position=RandomSpawnPoint()) { //health, attack, defense, speed, range, position, size, direction, colour, text, enemyTypes
    this.name           = name;
    this.text           = statsObj.text;
    this.health         = statsObj.health;
    this.attack         = statsObj.attack;
    this.defense        = statsObj.defense;
    this.speed          = statsObj.speed;
    this.range          = statsObj.range;
    this.position       = position;
    this.size           = statsObj.size;
    this.colour         = statsObj.colour;
    this.defaultColour  = this.colour;
    this.defaultSize    = this.size;
    this.direction      = statsObj.direction;
    this.focus          = undefined;
    this.enemyTypes     = statsObj.enemyTypes;
    this.type           = "Character";
  }

  DrawCharacter(){ 
    // Set font size and type
    const fontSize = this.size[0];
    ctx.font = `${fontSize}px Arial`;

    // Calculate the position to center the emoji inside the box
    const textWidth = ctx.measureText(this.text).width;
    const textHeight = fontSize; // Assuming the height of the emoji is the same as the font size

    const centerX = this.position[0] + (this.size[0] - textWidth) / 2;
    const centerY = this.position[1] + (this.size[1] + textHeight) / 2;

    //Check if user selected.
    if (UserData.selected==this){
      ctx.fillStyle = "lightgreen";
      ctx.fillRect(centerX, centerY-textHeight, textWidth,textHeight+3.5);

      //Change (Size)
      //this.size=[ this.defaultSize[0]*1.5 , this.defaultSize[1]*1.5 ];
    }

    // Use fillText to display emoji
    ctx.fillText(this.text, centerX, centerY);

    // Uncomment the following line if you still want to draw a rectangle around the emoji
    //ctx.fillRect(this.position[0], this.position[1], this.size[0], this.size[1]);
  }

  isMouseOver(mouseX, mouseY) {
    var mouseHitBox=10;
    return (
      mouseX >= (this.position[0] - (mouseHitBox)) &&
      mouseX <= this.position[0] + this.size[0] + mouseHitBox &&
      mouseY >= (this.position[1] - mouseHitBox) &&
      mouseY <= this.position[1] + this.size[1] + mouseHitBox
    );
  }

  SpawnCharacter() {
    // Initialization code here
    this.DrawCharacter();

    //Add isMouseOver event listener
    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (this.isMouseOver(mouseX, mouseY)) {
        console.log("Mouse is over character "+this.name);
        //this.colour="lightgreen";
        //this.DrawCharacter();
        //this.size=[30,30];
      }
      else{
        //this.colour=this.defaultColour;
        //this.size=[basicStats.size,basicStats.size];
        //player.DrawCharacter(); 
        //this.size=[15,15];
      }
    });
    

    //===~* Character OnClick event *~===\\
    canvas.addEventListener("click", (event) => {
      const rect   = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (this.isMouseOver(mouseX, mouseY)) {
        console.log("Mouse clicked on a character named "+this.name+".");
        UserData.selected=this;

        //change html
        ChangeSelectedUnit(this);
        //this.colour="lightgreen";
        //player.DrawCharacter(); 
        
      }
      else{
        //console.log("Nothing Selected.");
        //ChangeSelectedUnit(undefined);
        //UserData.selected=undefined;
        //this.colour=this.defaultColour;
        //player.DrawCharacter(); 
      }
    });

    //Push character to active spawned character list
    ActiveCharactersArray.push(this);
    //console.log("Character "+this.name+" initialized.");
  }

  //#region Movement Methods
  Movement_DVDBounce() {
    // Update position based on speed and direction
    this.position[0] += this.speed * Math.cos(this.direction);
    this.position[1] += this.speed * Math.sin(this.direction);

    // Bounce off walls
    if (this.position[0] < 0 || this.position[0] > canvas.width - this.size[0]) {
      this.direction = Math.PI - this.direction;
    }
    if (this.position[1] < 0 || this.position[1] > canvas.height - this.size[1]) {
      this.direction = -this.direction;
    }
  }
  generateRandomDestinationWithinRange() {
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomDistance = Math.random() * this.range * 2;

    // Calculate the random position within the specified radius
    const destinationX = this.position[0] + randomDistance * Math.cos(randomAngle);
    const destinationY = this.position[1] + randomDistance * Math.sin(randomAngle);

    return [destinationX, destinationY];
  }
  //#endregion
  Movement_MoveToTarget(target) {
    if (!target) {
      // No target, do nothing
      console.log("No Target to move to.");
      return;
    }

    // First, check to see if the character has reached the target
    const distanceToTarget = Math.sqrt(Math.pow(target.position[0] - this.position[0], 2) + Math.pow(target.position[1] - this.position[1], 2));
    if (distanceToTarget < (this.size[0]+5) ) {
      // The character is close enough to the target, consider it reached
      //console.log(`${this.name} reached ${this.focus.name}! Distance: ${distanceToTarget}`);

      //if Character Focus is a random destination (wandering), reset focus
      if(this.focus.name.includes("Random Desination")){
        this.focus=undefined;
        return;
      }

      //Interract with target
      //this.Interact(target);
      this.AttackTarget(this.focus);
      return;
    }

    //Move to Target
    const angleToTarget = Math.atan2(target.position[1] - this.position[1], target.position[0] - this.position[0]);
    // Calculate the movement components
    const dx = this.speed * Math.cos(angleToTarget);
    const dy = this.speed * Math.sin(angleToTarget);
    // Calculate the new position
    const newPositionX = this.position[0] + dx;
    const newPositionY = this.position[1] + dy;

    // Check if the new position is within the canvas boundaries
    if (isPositionOnCanvas(newPositionX, newPositionY)) {
      // Update the character's position towards target
      this.position[0] = newPositionX;
      this.position[1] = newPositionY;
    } else {
      // Optionally handle the case where the new position is outside the canvas
      //console.log("Character cannot move outside the canvas.");
      //reset focus
      this.focus=undefined;
    }

  }

  UpdatePosition(){
    // Check for nearby targets and set character focus
    if(this.focus=== undefined){
      this.focus = this.FindTargetInRange();
    }

    if(this.focus){
      //move to target#
      //console.log("Moving to target "+this.focus.name);
      //console.log(this.focus);
      this.Movement_MoveToTarget(this.focus);
    }
    else{
      //set temp desination focus
      //Random decision to tak
      if( [Math.round(Math.random()*5)] != 1){
        return;
      }
      var randomPos = this.generateRandomDestinationWithinRange();
      var tmpDestFocus = new Focus("Random Desination", [randomPos[0], randomPos[1]]);
      this.focus=tmpDestFocus;
      //console.log(this.focus);
      //console.log("moving to random");
      this.Movement_MoveToTarget(tmpDestFocus);
    }
    
  }

  FindTargetInRange() {
    const targets = ActiveCharactersArray.filter((target) => {
      // Exclude self
      if (target === this)  {
        return false;
      }
      //if enemytypes do not match exclude
      if (!target.name.includes(this.enemyTypes))  {
        return false;
      }

      // Calculate distance between characters
      const distance = Math.sqrt(
        Math.pow(target.position[0] - this.position[0], 2) +
        Math.pow(target.position[1] - this.position[1], 2)
      );

      // Check if the target is within range
      return distance <= this.range;
    });

    // Return the first target found, or null if no target is in range
    return targets.length > 0 ? targets[0] : null;
  }

  Interact(target){
    //non combat interraction

  }

  AttackTarget(target){
    // For example, decrease the target's health
    target.health -= this.attack;

    //console.log(`${target.name} health: ${target.health}`);
    if(target.health<=0){
      target.Die();
      this.focus=undefined;
    }
  }

  Die() {
    //set to skull emoji
    this.text="💀";
    this.DrawCharacter();

    // Find the index of the character in the ActiveCharactersArray
    const index = ActiveCharactersArray.indexOf(this);

    if (index !== -1) {
      // Remove the character from the array
      ActiveCharactersArray.splice(index, 1);

      // Optionally, perform additional cleanup or animations
      console.log(`${this.name} has been killed.`);

      // Remove HTML elements or perform other cleanup if needed

      // If you want to remove the associated HTML elements, assuming you have a reference to the element
      // const characterElement = document.getElementById(this.name);
      // characterElement.parentNode.removeChild(characterElement);
    } else {
      //console.log(`${this.name} not found in ActiveCharactersArray.`);
    }
  }

  //END OF CHARACTER CLASS
}
//===~* BEGINNING OF STRUCTURE CLASS *~===\\
class Structure extends Character{
  constructor(name, statsObj){
    //Call base constructure with super()
    super(
      name,
      statsObj
    );
    //set type
    this.type           = "Structure";
  }
  UpdatePosition(){
    //Do Nothing. Structures don't move. (But vehicles will though....)
  }
  DrawCharacter(){
    //Check if user selected.
    if (UserData.selected==this){
      ctx.fillStyle = "lightgreen";
      ctx.fillRect(this.position[0]-(this.size[0]*0.1), this.position[1]-(this.size[0]*0.1), this.size[0]*1.2, this.size[1]*1.2);

      //Change (Size)
      //this.size=[ this.defaultSize[0]*1.5 , this.defaultSize[1]*1.5 ];
    }

    ctx.fillStyle = "grey";
    ctx.fillRect(this.position[0], this.position[1], this.size[0], this.size[1]);
  }
}

class Focus {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }
}

function RandomSpawnPoint(){
  return randomSpawn=[(Math.random()*canvas.width), (Math.random()*canvas.height)];
}

// Function to spawn a character at the clicked position
function spawnCharacterOnClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Create a new character at the clicked position
  const newCharacter = new Character(
    "Ally",
    basicStats
  );
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
}

function OnPlayerClick(event){
  switch(UserData.mode) {
    case "Inspecting":
      //Each Character has their own onclick event listener...
      break;
    case "Spawn Character":
      console.log("Spawning character");
      spawnCharacterOnClick(event);
      break;
    case "Build Structure":
      console.log("Spawning Structure.");
      SpawnStructureOnClick(event);
      break;
    default:
      //Do Nothing
  }
}

function isPositionOnCanvas(x, y) {
  return x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height;
}

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
  enemyTypes: "Enemy"
};
const enemybasicStats = {
  health    : 100,
  attack    : 0.5,
  defense   : 2,
  speed     : 1,
  range     : 70,
  position  : undefined,
  size      : [15,15],
  direction : 2,
  colour    : "darkred",
  text      : "😈",
  enemyTypes: "Ally"
};
const basicStructureStats = {
  health    : 100,
  attack    : 0,
  defense   : 5,
  speed     : undefined,
  range     : 70,
  position  : undefined,
  size      : [40,40],
  direction : undefined,
  colour    : "blue",
  text      : "X",
  enemyTypes: "Enemy"
};

const UserData={
  selected:undefined,
  building:false,
  mode:undefined
}

function ChangeSelectedUnit(unit){
  if(unit === undefined){
      UserData.selected = undefined;
      document.getElementById("GameTxtMsg1").innerHTML="Nothing selected";
      return;
  }

  UserData.selected = unit;
  document.getElementById("GameTxtMsg1").innerHTML=`Selected: ${UserData.selected.name} ${UserData.selected.text}<br>
  HP : ${UserData.selected.health}<br>
  ATK: ${UserData.selected.attack}<br>
  DEF: ${UserData.selected.defense}<br>`;
}

function ChangePlayerMode(userMode){
  UserData.mode=userMode;

  switch(UserData.mode) {
    case "Inspecting":
      canvas.style.cursor = "crosshair";
      if(UserData.selected!=undefined){
        UserData.selected = undefined;
        document.getElementById("GameTxtMsg1").innerHTML="Nothing selected";
      }
      break;
    case "Spawn Character":
      canvas.style.cursor = "copy";
      break;
    case "Build Structure":
      canvas.style.cursor = "cell";
      break;
    default:
      canvas.style.cursor = "pointer";
  }
}

//====~* START HERE *~====\\
var ActiveCharactersArray = [];

ChangePlayerMode('Inspecting')

// Add a click event listener to( the canvas to spawn a character on click
canvas.addEventListener("click", OnPlayerClick);

//Spawn Characters
const player = new Character("Player", basicStats);
player.SpawnCharacter();

new Character("Ally1", basicStats).SpawnCharacter();
new Character("Ally2", basicStats).SpawnCharacter();
new Character("Ally3", basicStats).SpawnCharacter();

new Character("Enemy1",  enemybasicStats).SpawnCharacter();
new Character("Enemy2",  enemybasicStats).SpawnCharacter();
new Character("Enemy3",  enemybasicStats).SpawnCharacter();
new Character("Enemy4",  enemybasicStats).SpawnCharacter();
new Character("Enemy5",  enemybasicStats).SpawnCharacter();
new Character("Enemy6",  enemybasicStats).SpawnCharacter();
new Character("Enemy7",  enemybasicStats).SpawnCharacter();
new Character("Enemy8",  enemybasicStats).SpawnCharacter();
new Character("Enemy1",  enemybasicStats).SpawnCharacter();
new Character("Enemy2",  enemybasicStats).SpawnCharacter();
new Character("Enemy3",  enemybasicStats).SpawnCharacter();
new Character("Enemy4",  enemybasicStats).SpawnCharacter();
new Character("Enemy5",  enemybasicStats).SpawnCharacter();
new Character("Enemy6",  enemybasicStats).SpawnCharacter();
new Character("Enemy7",  enemybasicStats).SpawnCharacter();
new Character("Enemy8",  enemybasicStats).SpawnCharacter();
new Character("Enemy9",  enemybasicStats).SpawnCharacter();
new Character("Enemy10", enemybasicStats).SpawnCharacter();
new Character("Enemy11", enemybasicStats).SpawnCharacter();
new Character("Enemy12", enemybasicStats).SpawnCharacter();
new Character("Enemy13", enemybasicStats).SpawnCharacter();

/* will execture function once every tdelay ms
var tdelay = 100;
window.setInterval(function(){Main()}, tdelay);*/

function Main(){
  DrawFloor(); //Draw background

  //For each active character in game...
  ActiveCharactersArray.forEach(char => {
    //Update each character logic
    char.UpdatePosition();

    //Draw each character on screen
    char.DrawCharacter();
  });

}


var lastTime = performance.now();
var deltaTime = 0;
var interval = 16; // 60 fps

function gameLoop() {
  var now = performance.now();
  deltaTime += now - lastTime;
  lastTime = now;

  while (deltaTime >= interval) {
    // update the game state
    deltaTime -= interval;
  }

  Main();

  // render the game graphics
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
