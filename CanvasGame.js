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
  constructor(name, health, attack, defense, speed, range, position, size, direction, colour, text, enemyTypes) {
    this.name           = name;
    this.text           = text;
    this.health         = health;
    this.attack         = attack;
    this.defense        = defense;
    this.speed          = speed;
    this.range          = range;
    this.position       = [position[0],position[1]];
    this.size           = size;
    this.colour         = colour;
    this.defaultColour  = this.colour;
    this.direction      = direction;
    this.focus          = undefined;
    this.enemyTypes     = enemyTypes;
  }

  DrawCharacter(){
    //Check if selected.
    if (UserData.selected==this){
      ctx.fillStyle = "lightgreen";
    }
    else{
      ctx.fillStyle = this.colour;
    }

    // Set font size and type
    const fontSize = this.size[0];
    ctx.font = `${fontSize}px Arial`;

    // Calculate the position to center the emoji inside the box
    const textWidth = ctx.measureText(this.text).width;
    const textHeight = fontSize; // Assuming the height of the emoji is the same as the font size

    const centerX = this.position[0] + (this.size[0] - textWidth) / 2;
    const centerY = this.position[1] + (this.size[1] + textHeight) / 2;

    // Use fillText to display emoji
    ctx.fillText(this.text, centerX, centerY);

    // Uncomment the following line if you still want to draw a rectangle around the emoji
    //ctx.fillRect(this.position[0], this.position[1], this.size[0], this.size[1]);
  }

  isMouseOver(mouseX, mouseY) {
    return (
      mouseX >= this.position[0] &&
      mouseX <= this.position[0] + this.size[0] &&
      mouseY >= this.position[1] &&
      mouseY <= this.position[1] + this.size[1]
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
        //console.log("Mouse is over the character!");
        this.colour="lightgreen";
        this.DrawCharacter();
      }
      else{
        this.colour=this.defaultColour;
        player.DrawCharacter(); 
      }
    });

    canvas.addEventListener("click", (event) => {
      const rect   = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (this.isMouseOver(mouseX, mouseY)) {
        console.log("Mouse clicked on a character named "+this.name+".");
        UserData.selected=this;
        this.colour="lightgreen";
        player.DrawCharacter(); 
      }
      else{
        console.log("Nothing Selected.");
        UserData.selected=undefined;
        this.colour=this.defaultColour;
        player.DrawCharacter(); 
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
  Movement_wanderRandomly() {
    //Random decision to tak
    if( [Math.round(Math.random()*3)] != 1){
      return;
    }
    const randomAngle = Math.random() * 2 * Math.PI; // Generate a random angle in radians
    const wanderSpeed = this.speed * 10; // Adjust the wander speed as needed

    // Update position based on the random angle and wander speed
    this.position[0] += wanderSpeed * Math.cos(randomAngle);
    this.position[1] += wanderSpeed * Math.sin(randomAngle);

    // Bounce off walls (similar to your existing logic)
    if (this.position[0] < 0 || this.position[0] > canvas.width - this.size[0]) {
      this.position[0] = Math.max(0, Math.min(this.position[0], canvas.width - this.size[0]));
    }
    if (this.position[1] < 0 || this.position[1] > canvas.height - this.size[1]) {
      this.position[1] = Math.max(0, Math.min(this.position[1], canvas.height - this.size[1]));
    }

    
  }
  //#endregion
  Movement_MoveToTarget(target) {
    if (!target) {
      // No target, do nothing
      console.log("No Target to move to.");
      return;
    }

    const angleToTarget = Math.atan2(target.position[1] - this.position[1], target.position[0] - this.position[0]);

    // Calculate the movement components
    const dx = this.speed * 2 * Math.cos(angleToTarget);
    const dy = this.speed * 2 * Math.sin(angleToTarget);

    // Optionally, you can add a check to see if the character has reached the target
    const distanceToTarget = Math.sqrt(Math.pow(target.position[0] - this.position[0], 2) + Math.pow(target.position[1] - this.position[1], 2));

    if (distanceToTarget < (this.size[0]+5) ) {
      // The character is close enough to the target, consider it reached
      console.log(`${this.name} reached ${this.focus.name}! Distance: ${distanceToTarget}`);
      
      //Interract with target
      //this.Interact(target);

      return;
    }

    // Update the character's position towards target
    this.position[0] += dx;
    this.position[1] += dy;
  }

  UpdatePosition(){
    if(this.focus){
      //move to target#
      //console.log("Moving to target.");
      this.Movement_MoveToTarget(this.focus);
    }
    else{
      this.Movement_wanderRandomly();
    }
    //this.Movement_DVDBounce();
    
  }

  FindTargetInRange() {
    const targets = ActiveCharactersArray.filter((target) => {
      // Exclude self
      if (target === this)  {
        return false;
      }
      //if enemytypes do not match exclude
      if (!target.name.includes(this.enemyTypes))  {
        console.log(target.name," is within range but not ",this.enemyTypes);
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
    //if enemy then attack, if ally then group up
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
    basicStats.health,
    basicStats.attack,
    basicStats.defense,
    basicStats.speed,
    basicStats.range,
    [mouseX, mouseY], // Set position to the clicked coordinates
    basicStats.size,
    basicStats.direction,
    basicStats.colour,
    basicStats.text,
    basicStats.enemyTypes
  );

  // Spawn the new character
  newCharacter.SpawnCharacter();
}

const basicStats = {
  health    : 100,
  attack    : 10,
  defense   : 5,
  speed     : 1,
  range     : 70,
  position  : [50,50],
  size      : [15,15],
  direction : 1,
  colour    : "black",
  text      : "😐",
  enemyTypes: "Enemy"
};
const enemybasicStats = {
  health    : 100,
  attack    : 10,
  defense   : 2,
  speed     : 1,
  range     : 70,
  position  : RandomSpawnPoint(),
  size      : [15,15],
  direction : 2,
  colour    : "darkred",
  text      : "😈",
  enemyTypes: "Ally"
};

const UserData={
  selected:undefined,
  building:false
}

//====~* START HERE *~====\\
var ActiveCharactersArray = [];
// Add a click event listener to the canvas to spawn a character on click
canvas.addEventListener("click", spawnCharacterOnClick);

//Spawn Characters
const player = new Character("Player", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, basicStats.position, basicStats.size, basicStats.direction, basicStats.colour,basicStats.text);
player.SpawnCharacter();

new Character("Ally1", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally2", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally3", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();
new Character("Ally4", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text, basicStats.enemyTypes).SpawnCharacter();

new Character("Enemy1", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy2", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy3", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();
new Character("Enemy4", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, RandomSpawnPoint(), enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text,enemybasicStats.enemyTypes).SpawnCharacter();

// will execture function once every tdelay ms
var tdelay = 100;
window.setInterval(function(){Main()}, tdelay);

function Main(){
  DrawFloor(); //Draw background

  //For each active character in game...
  ActiveCharactersArray.forEach(char => {
    //Draw each character on screen
    char.DrawCharacter();

    // Check for nearby targets and set character focus
    char.focus = char.FindTargetInRange();
    
    /*
    if (char.focus) {
      console.log(char.focus);
      console.log(`${char.name} is targeting ${char.focus.name}.`);
      Add your logic to handle the interaction with the target

    }
    */

    char.UpdatePosition();
  });

}

/* TO DO LIST: *\
- Character Combat

*/