const yrange = 20;
const xrange = 80;
var gameScreenArray = Array2DConstructor();
var medium_shade_block_ASCII_char = `&#9618;`;
var gameScreenElem = document.getElementById("game-screen");

var active_game_objs =[];

class CharacterObject {
  constructor(htmlCode,position){
    this.htmlCode=htmlCode;
    this.position=position||[undefined,undefined];
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
    gameScreenArray[x].fill("<span class='interactable-char'>"+bgChar+"</span>"); // make each element an array
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

function CharacterConveyor(){
  //var spawnPoint = [0,0];

}

var firstCharObj = new CharacterObject("<span class='interactable-char'>c</span>",null);
firstCharObj.SpawnGameObj([0,0]);
RedrawGameScreen(medium_shade_block_ASCII_char);

// will execture function once every tdelay ms
var tdelay = 1000;
window.setInterval(function(){Main()}, tdelay);

function Main(){
}