const yrange = 20;
const xrange = 69;
var gameScreenArray = Array2DConstructor();
var medium_shade_block_ASCII_char = `&nbsp;`  //`&#9618;`;
var gameScreenElem = document.getElementById("game-screen");
var textOutputElem = document.getElementById("TextMessageWindow1");

var active_game_objs =[];
var built_blocks=[];

// Character as in (0-9,a-Z,*%&)
class CharacterObject {
  //constructor default values
  constructor(htmlCode,position,blockTypeID){
    this.htmlCode=htmlCode || AddSpanTags("?");
    this.position=position||[undefined,undefined];
    this.blockTypeID=blockTypeID||0;
    this.id=htmlCode.split("=")[2].split(">")[0];

    AddSpanTags(htmlCode)
    this.SpawnGameObj(position);
  }
  SpawnGameObj(spawnpos){
    //Set random position
    var spawnpos = spawnpos || [Math.floor(Math.random() * yrange), Math.floor(Math.random() * xrange)];
    this.position[0] = spawnpos[0];
    this.position[1] = spawnpos[1];
    //Add to active objs list
    active_game_objs.push(this);
    //console.log("Spawning Game Object:\n"+this.name+this.id+"\nPos: "+this.position);
    return this.position;
  }

  ActionCheck(){
  
    //Move Character in random direction
    var randintx= Math.floor(Math.random() * 3) - 1;
    var randinty= Math.floor(Math.random() * 3) - 1;
    var nextPosition =[this.position[0]+randinty, this.position[1]+randintx];
    //Check if next position is on screen
    if (nextPosition[0] < yrange && nextPosition[0] > 0 && nextPosition[1] < xrange && nextPosition[1] > 0){
      this.position=nextPosition; 
      // for each other gameObject
      active_game_objs.forEach(gameObj => {
        if (this != gameObj){
          //Check if next position same as any other active game object
          if(this.position[0]==gameObj.position[0] && this.position[1]==gameObj.position[1]){
            //this.position = [this.position[0],this.position[1]+1];
            console.log("Object interraction between "+gameObj.id+"and "+ this.id);
            TextOutput("Object interraction between "+gameObj.htmlCode+" and " + this.htmlCode);
            var randactx=Math.round(Math.random()) * 2 - 1;
            this.position=[gameObj.position[0],gameObj.position[1]+randactx];
            return
          }
          else{
            console.log(this.position+","+gameObj.position);
          }
        }
      });

    }

  }

}

class ItemObject extends CharacterObject{
  ActionCheck(){
    active_game_objs.forEach(gameObj => {
      if(this.position==gameObj.position && this != gameObj){
        this.position = [this.position[0],this.position[1]];
        console.log("Object interraction between "+gameObj.htmlCode+"and ");
        TextOutput("Object interraction between "+gameObj.htmlCode+" and " + this.htmlCode);
      }
    });
  }
}



function Array2DConstructor(){
  let arr = new Array(yrange); // create an empty array of length n
  for (var x = 0; x < yrange; x++) {
    arr[x] = new Array(xrange).fill(medium_shade_block_ASCII_char); // make each element an array
  }
  //console.log(arr);
  return arr;
}

function RedrawGameScreen(bgChar){
  //Draw Background
  for (var x = 0; x < yrange; x++) {
    gameScreenArray[x].fill(AddSpanTags(bgChar)); // make each element an array
  }
  //Draw each active object
  active_game_objs.forEach(entity => {
    //draw entity at position
    gameScreenArray[entity.position[0]] [entity.position[1]] = entity.htmlCode;
    //draw character from object dict { name:"symbol" }
  });



  gameScreenElem.innerHTML=GenerateGameDisplayFromArray(gameScreenArray);
}

function GenerateGameDisplayFromArray(screenArray){
  var output_txt="";
  var tempScreenArray = screenArray;
  for(var x=0;x<tempScreenArray.length;x++){
    tempScreenArray[x][xrange+1]="<br>";
    output_txt+=tempScreenArray[x].join("");
  }
  return output_txt;
}

var span_count=0;
function AddSpanTags(character){
  var charID = "charID-"+span_count;
  var output= "<span class='interactable-char' id="+charID+">"+character+"</span>";
  span_count++
  return charID,output;
}

function TextOutput(text){
  textOutputElem.innerHTML=text;
}

var selectedObj;
document.addEventListener('click', function(event) {
  if (event.target.tagName === 'SPAN' /*&& event.target.innerHTML!=="▒"*/) {
      selectedObj = event.target.innerHTML;
      console.log(event.target);
      TextOutput("Selecting: '"+selectedObj+"', "+event.target.id);
  }
});





//SPAWN CHARACTER
var firstCharObj = new CharacterObject(AddSpanTags("O"),[10,30]);
//firstCharObj.SpawnGameObj();
new CharacterObject(AddSpanTags("o"),[10,30]);
new CharacterObject(AddSpanTags("q"),);
new CharacterObject(AddSpanTags("w"),);
new CharacterObject(AddSpanTags("e"),);
new CharacterObject(AddSpanTags("r"),);
new CharacterObject(AddSpanTags("t"),);
new CharacterObject(AddSpanTags("y"),);
new CharacterObject(AddSpanTags("u"),);
new CharacterObject(AddSpanTags("i"),);
new CharacterObject(AddSpanTags("o"),);

RedrawGameScreen(medium_shade_block_ASCII_char);

// will execture function once every tdelay ms
var tdelay = 500;
window.setInterval(function(){Main()}, tdelay);

function Main(){
  RedrawGameScreen(medium_shade_block_ASCII_char);

  active_game_objs.forEach(element => {
    element.ActionCheck();
  });

  //If UI button selected. change to build-on-click mode
}