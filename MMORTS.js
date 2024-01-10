// Custom Classes \\
class Player{
  constructor(){
    this.mousePos={x:undefined,y:undefined};
  }
}

class GameObject{
  constructor(name,position,size){
    this.name     = name;
    this.position = { x:position.x, y:position.y};
    this.size     = [size[0],size[1]];
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
    if (PlayerObj.selected==this){
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

    //Push character to active spawned character list
    charCount+=1;
    this.name=this.name+charCount;
    ActiveCharactersArray.push(this);
    //console.log("Character "+this.name+" initialized.");
  }
}

// Initialize Variables \\
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//Set Main loop variables
var lastTime = performance.now();
var deltaTime = 0;
var interval = 16; // 60 fps
const playerObj = new Player();


//Run at Startup
function Start(){
  // Prepare Canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Draw Floor
  canvas.style.backgroundColor = "teal";

  //Add event listener
  canvas.addEventListener("mousemove", UpdateMousePos);
}

//Run at every time period (60FPS)
function Main(){
  BuildMode_BuildObject();
}

// FUNCTIONS \\

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

function UpdateMousePos(event){
  // Get Mouse pos
  const rect = canvas.getBoundingClientRect();
  playerObj.mousePos.x = event.clientX - rect.left;
  playerObj.mousePos.y = event.clientY - rect.top;
  //return mousePos={x:mouseX, y:mouseY};
}

//Every frame when build mode is selected
function BuildMode_BuildObject(){
  var gridCellSize = 25;  // Set cell size

  var mouseGridPos=CanvasToGridPos(playerObj.mousePos.x, playerObj.mousePos.y, gridCellSize);
  // Draw Background
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(mouseGridPos[0],mouseGridPos[1], gridCellSize,gridCellSize);
}



// MAIN GAME LOOP \\


function Update() {
  var now = performance.now();
  // calculate the difference in time from last loop
  deltaTime += now - lastTime;
  lastTime = now;

  //While delta time is greater than or equal to the set interval of 16 for 60 FPS
  while (deltaTime >= interval) {
    //subtract interval from deltatime
    deltaTime -= interval;
  }

  // update the game state
  Main();

  // render the game graphics
  requestAnimationFrame(Update);
}

Start();
requestAnimationFrame(Update);

