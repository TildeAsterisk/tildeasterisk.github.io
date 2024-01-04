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
    this.type           = statsObj.type;
    this.isIndoors      = false;
    this.isAlive        = true;
    
    if(!this.position){
      this.position=this.generateRandomDestinationWithinRange();
    }
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
    if(this.isIndoors){return false;}
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

    /*Add isMouseOver event listener
    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (this.isMouseOver(mouseX, mouseY)) {
        console.log("Mouse is over character "+this.name);
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
    }); */

    //Push character to active spawned character list
    charCount+=1;
    this.name=this.name+charCount;
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
    var randomAngle = Math.random() * 2 * Math.PI;
    var randomDistance = Math.random() * this.range * 2;

    // Calculate the random position within the specified radius
    var destinationX = this.position[0] + randomDistance * Math.cos(randomAngle);
    var destinationY = this.position[1] + randomDistance * Math.sin(randomAngle);

    return [destinationX, destinationY];
  }
  //#endregion
  Movement_MoveToTarget(target) {
    if (!target) {
      // No target, do nothing
      //console.log("No Target to move to.");
      return;
    }

    // First, check to see if the character has reached the target
    const distanceToTarget = Math.sqrt(Math.pow(target.position[0] - this.position[0], 2) + Math.pow(target.position[1] - this.position[1], 2));
    if (distanceToTarget < (this.size[0]+5) && this.focus) {
      // The character is close enough to the target, consider it reached
      //console.log(`${this.name} reached ${this.focus.name}! Distance: ${distanceToTarget}`);

      //if Character Focus is a random destination (wandering), reset focus
      if("Random Destination" == this.focus.name){
        this.SetFocus(undefined);
        return;
      }

      //Interract with target
      this.Interact(target);
      //this.AttackTarget(target);
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
      this.SetFocus(undefined);
    }

  }

  UpdatePosition(){
    /* Check if no focus then search for nearby viable targets and set character focus
    if(!this.focus){
      this.focus = this.FindTargetInRange("isAlive,Structure");
    }
    */

    //if focus is now set move to focus
    if (this.focus){
      if(!this.focus.isAlive /*&& this.focus.name!="Random Destination"*/){
        //check if focus is dead
       this.SetFocus(undefined);
       return;
      }

      /*var distanceToTarget = Math.sqrt(Math.pow(this.focus.position[0] - this.position[0], 2) + Math.pow(this.focus.position[1] - this.focus.position[1], 2));
      if(distanceToTarget>this.range){
        this.SetFocus(undefined);
        return;
      }*/
      
      this.Movement_MoveToTarget(this.focus);
    }
    else{ //if focus is not set, set random destination
      this.SetFocus(this.FindTargetInRange("isAlive,Structure"));
      //set temp desination focus
      //Random decision to walk
      if( [Math.round(Math.random()*5)] != 1){
        return;
      }
      var randomPos = this.generateRandomDestinationWithinRange();
      var tmpDestFocus = new Focus("Random Destination", [randomPos[0], randomPos[1]]);
      this.SetFocus(tmpDestFocus);
      //console.log(this.focus);
      //console.log("moving to random");
      this.Movement_MoveToTarget(this.focus);
    }
    
  }

  SetFocus(target){
    if (target == undefined){
      //console.log(this.name+" cannot set focus.");
      this.focus = undefined;
      return;
    }

    if(target.isAlive || target.name=="Random Destination"){
      //console.log(this.name+" is targeting "+target.name);
      this.focus = target;
    }
  }

  FindTargetInRange(filter=undefined) {
    const targets = ActiveCharactersArray.filter((target) => {
      // Exclude self
      if (target == this)  {
        return false;
      }
      //exclude if enemytypes do not match and if taret us indoors and if target is dead
      if (!this.enemyTypes.includes(target.type) || target.isIndoors)  {
        return false;
      }

      if(filter!=undefined){
        switch (filter){
          case filter.includes("isAlive"):
            if(!target.isAlive){return false;}
          case filter.includes("Structure"):
            if(target.type=="Structure"){return false;}

            break;
          default:
            break;
        }
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
    switch (target.type){
      case "Enemy":
      case "Ally":
        //Attack if enemy
        if(this.enemyTypes.includes(target.type) && target.isAlive){
          //console.log("Attacking Target: "+this.focus.name);
          this.AttackTarget(target);
        }
        break;
      case "Structure":
        //Enter if non enemy structure
        if(!target.enemyTypes.includes(this.type)){
          target.EnterCharacterIntoStructure(this);
        }
        else{
          //Structure is hostile to this character
          this.AttackTarget(target);
        }
        break;
      default:
        break;
    }
    //non combat interraction

  }

  AttackTarget(target){
    // For example, decrease the target's health
    target.health -= this.attack;

    //console.log(`${target.name} health: ${target.health}`);
    if(target.health<=0){
      console.log(`${this.name} has killed ${target.name}.`);
      target.Die();
      this.SetFocus(undefined);
    }
  }

  Die() {
    //set to skull emoji
    this.text="💀";
    this.DrawCharacter();
    this.isAlive=false;

    // Find the index of the character in the ActiveCharactersArray
    const index = ActiveCharactersArray.indexOf(this);

    if (index !== -1) {
      // Remove the character from the array
      ActiveCharactersArray.splice(index, 1);

      // Optionally, perform additional cleanup or animations
      //console.log(`${this.name} has been killed.`);

      // Remove HTML elements or perform other cleanup if needed

      // If you want to remove the associated HTML elements, assuming you have a reference to the element
      // const characterElement = document.getElementById(this.name);
      // characterElement.parentNode.removeChild(characterElement);
    } else {
      //console.log(`${this.name} not found in ActiveCharactersArray.`);
    }

    //canvas.removeEventListener("click", event);
    delete this;
  }

  //END OF CHARACTER CLASS
}

//===~* BEGINNING OF STRUCTURE CLASS *~===\\
class Structure extends Character{
  constructor(name, statsObj){
    //Call base constructure with super()
    super(name,statsObj);
    //set type
    this.type           = "Structure";
    this.capacity       = 15;
    this.indoorCount    = 0;
    this.contents       = [];
  }
  UpdatePosition(){
    // Check for nearby targets and set character focus
    if(!this.focus){
      this.SetFocus(this.FindTargetInRange("isAlive"));
    }
    else {
      //calcukate distance
      const distance = Math.sqrt(
        Math.pow(this.focus.position[0] - this.position[0], 2) +
        Math.pow(this.focus.position[1] - this.position[1], 2)
      );
      //if has focus AND (focus is dead OR focus is out of range), reset focus
      if(!this.focus.isAlive || distance > this.range){
        this.SetFocus(undefined);
        return;
      }
      //Deploy unit to combat enemy
      //console.log(this.focus.name+" detected near structure");
      //Set deploy unit and set its focus to enemy
      
      var nonUndefinedElement = this.contents.find((element) => element !== undefined);
      if(this.contents.length>0 && this.contents.includes(nonUndefinedElement)){
        //Set focus of char in contents before exiting from structure. Reference pops from contents array
        //nonUndefinedElement.SetFocus( this.focus);
        //nonUndefinedElement.SetFocus(this.focus);
        this.ExitCharacterFromStructure(nonUndefinedElement, this.focus);
        //console.log("Defense unit "+nonUndefinedElement.name+" deployed from "+this.name+" with focus "+nonUndefinedElement.focus.name);
      }
      
    }
  }
  DrawCharacter(){
    //Check if user selected.
    if (UserData.selected==this){
      ctx.fillStyle = "lightgreen";
      ctx.fillRect(this.position[0]-(this.size[0]/2)-(this.size[0]*0.1), this.position[1]-(this.size[1]/2)-(this.size[1]*0.1), this.size[0]*1.2, this.size[1]*1.2);

      //Change (Size)
      //this.size=[ this.defaultSize[0]*1.5 , this.defaultSize[1]*1.5 ];
    }

    ctx.fillStyle = "grey";
    ctx.fillRect(this.position[0]-(this.size[0]/2), this.position[1]-(this.size[1]/2), this.size[0], this.size[1]);
  }
  

  EnterCharacterIntoStructure(char){
    if (this.contents.includes(char)){
      //Character is already inside structure
      console.log("character is already inside structure");
      return;
    }
    //check capacity
    if (this.indoorCount>=this.capacity){
      char.SetFocus(undefined);
      return;
    } 
    //Enter character inside
    this.contents.push(char);
    this.indoorCount+=1;
    char.isIndoors=true;
    char.SetFocus(this);
    console.log(char.name+" exits "+this.name);
  }
  ExitCharacterFromStructure(char, newFocus=undefined){
    if (!this.contents.includes(char)){
      console.log("Cannot exit "+char.name+" because they aren't inside structure "+this.name);
      return;
    }
    if(this.contents.length>0){
      var index = this.contents.indexOf(char);
      this.contents.splice(index, 1);
      //this.contents.pop(char);
      this.indoorCount-=1;
      char.isIndoors=false;
      //char.position=this.generateRandomDestinationWithinRange();
      char.position=[this.position[0],this.position[1]];
      char.SetFocus(newFocus);
      console.log(char.name+" enters "+this.name);
    }
    
  }
}

class Focus {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    this.isAlive=true;
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
}

function OnPlayerClick(event){
  switch(UserData.mode) {
    case "Inspecting":
      //Each Character has their own onclick event listener...
      const rect   = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      //foreach character check if ismouseover
      ActiveCharactersArray.forEach(char => {
        if (char.isMouseOver(mouseX, mouseY)) {
          console.log("Mouse clicked on a character named "+char.name+".");
          console.log(char);
          UserData.selected=char;
          //change html
          ChangeSelectedUnit(char);
          
        }
        else{
          //console.log("Nothing Selected.");
          //ChangeSelectedUnit(undefined);
        }
      });
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
  type      : "Ally",
  enemyTypes: "Enemy,Structure"
};
const enemybasicStats = {
  health    : 100,
  attack    : 0.5,
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
  range     : 100,
  position  : [50,50],
  size      : [70,70],
  direction : undefined,
  colour    : "blue",
  text      : "X",
  type      : "Structure",
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
  UpdateUnitStatsHTML();
}
function UpdateUnitStatsHTML(){
  //console.log(type);
  switch (UserData.selected.type){
    case "Structure":
      document.getElementById("GameTxtMsg1").innerHTML=`Selected: ${UserData.selected.name} ${UserData.selected.text}<br>
      HP : ${UserData.selected.health}<br>
      DEF: ${UserData.selected.defense}<br>
      Contains: ${UserData.selected.indoorCount} Units`;
      break;
    default:
      //console.log(type);
      if(!UserData.selected.focus){
        document.getElementById("GameTxtMsg1").innerHTML=`Selected: ${UserData.selected.name} ${UserData.selected.text}<br>
        HP : ${UserData.selected.health}<br>
        ATK: ${UserData.selected.attack}<br>
        DEF: ${UserData.selected.defense}`;
      }
      else{
        document.getElementById("GameTxtMsg1").innerHTML=`Selected: ${UserData.selected.name} ${UserData.selected.text}<br>
        HP : ${UserData.selected.health}<br>
        ATK: ${UserData.selected.attack}<br>
        DEF: ${UserData.selected.defense}<br>
        FCS: ${UserData.selected.focus.name}`;
      }
      break;
  }
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
var playerBase = new Structure("Structure", basicStructureStats);
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

new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();
new Character("Enemy",  enemybasicStats).SpawnCharacter();

/* will execture function once every tdelay ms
var tdelay = 100;
window.setInterval(function(){Main()}, tdelay);*/

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
      /*Is indoors, randomly chooose to leave
      if( [Math.round(Math.random()*50)] == 1){
        char.focus.ToggleCharacterInsideStructure(char);
      }
      */
    }

  });

  if(UserData.selected!=undefined){
    UpdateUnitStatsHTML();
  }

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
