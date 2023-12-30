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
  constructor(name, health, attack, defense, speed, range, position, size, direction, colour, text) {
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
        console.log("Mouse is over the character!");
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
    ActiveCharactersArray.push(this);
    console.log("Character "+this.name+" initialized.");
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
    const randomAngle = Math.random() * 2 * Math.PI; // Generate a random angle in radians
    const wanderSpeed = this.speed * 0.5; // Adjust the wander speed as needed

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
  UpdatePosition(){
    //this.Movement_DVDBounce();
    this.Movement_wanderRandomly();
  }

  findTargetInRange() {
    const targets = ActiveCharactersArray.filter((target) => {
      // Exclude self
      if (target === this) {
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
    "NewCharacter",
    basicStats.health,
    basicStats.attack,
    basicStats.defense,
    basicStats.speed,
    basicStats.range,
    [mouseX, mouseY], // Set position to the clicked coordinates
    basicStats.size,
    basicStats.direction,
    basicStats.colour,
    basicStats.text
  );

  // Spawn the new character
  newCharacter.SpawnCharacter();
}

const basicStats = {
  health    : 100,
  attack    : 10,
  defense   : 5,
  speed     : 50,
  range     : 50,
  position  : [50,50],
  size      : [15,15],
  direction : 1,
  colour    : "black",
  text      : "😐"
};
const enemybasicStats = {
  health    : 100,
  attack    : 10,
  defense   : 2,
  speed     : 50,
  range     : 50,
  position  : RandomSpawnPoint(),
  size      : [15,15],
  direction : 2,
  colour    : "darkred",
  text      : "😈"
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

new Character("Ally1", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, RandomSpawnPoint(), basicStats.size, basicStats.direction, basicStats.colour,basicStats.text).SpawnCharacter();

const enemy = new Character("Enemy1", enemybasicStats.health, enemybasicStats.attack, enemybasicStats.defense, enemybasicStats.speed, enemybasicStats.range, enemybasicStats.position, enemybasicStats.size, enemybasicStats.direction, enemybasicStats.colour, enemybasicStats.text);
enemy.SpawnCharacter();

// will execture function once every tdelay ms
var tdelay = 100;
window.setInterval(function(){Main()}, tdelay);
function Main(){
  DrawFloor(); //Draw background

  //Draw each character on screen
  ActiveCharactersArray.forEach(char => {
    char.UpdatePosition();
    char.DrawCharacter();

    // Check for nearby targets and perform actions
    const target = char.findTargetInRange();
    if (target) {
      console.log(`${char.name} found target ${target.name} within range.`);
      // Add your logic to handle the interaction with the target
    }
  });

}

/* TO DO LIST: *\
- CLICK TO SPAWN UNITS
- AUTO COMBAT

*/