var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "black";
var ctx = canvas.getContext("2d");
// Draw something on the canvas
ctx.fillStyle = "lightgrey";
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Character {
  constructor(name, health, attack, defense, speed, range, position, size) {
    this.name     = name;
    this.health   = health;
    this.attack   = attack;
    this.defense  = defense;
    this.speed    = speed;
    this.range    = range;
    this.position = [position[0],position[1]];
    this.size     = size;
    this.colour   = "black";
  }

  DrawCharacter(){
    //Draw Character
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.position[0], this.position[1], this.size[0], this.size[1]);
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
        this.color="white";
        this.DrawCharacter();
        //this.color="black;"
      }
    });

    canvas.addEventListener("click", (event) => {
      const rect   = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (this.isMouseOver(mouseX, mouseY)) {
        console.log("Mouse clicked on a character named "+this.name+".");
        UserData.selected=this;
      }
      else{
        console.log("Nothing Selected.");
        UserData.selected=undefined;
      }
    });
    console.log("Character "+this.name+" initialized.");
  }

  UpdatePosition() {
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

}

const basicStats = {
  health    : 100,
  attack    : 10,
  defense   : 5,
  speed     : 5,
  range     : 1,
  position  : [50,50],
  size      : [25,25]
};

const UserData={
  selected:undefined,
  building:false
}

//====~* START HERE *~====\\
//Spawn Characters
const player = new Character("Player", basicStats.health, basicStats.attack, basicStats.defense, basicStats.speed, basicStats.range, basicStats.position, basicStats.size);
player.SpawnCharacter();

// will execture function once every tdelay ms
var tdelay = 500;
window.setInterval(function(){Main()}, tdelay);
function Main(){
  //player.UpdatePosition();
  player.DrawCharacter(); 

}