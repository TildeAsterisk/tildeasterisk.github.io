const yrange = 20;
const xrange = 80;
var gameScreenArray = Array2DConstructor();
var medium_shade_block_ASCII_char = `&#9618;`;
var gameScreenElem = document.getElementById("game-screen");
var textOutputElem = document.getElementById("div1");

var active_game_objs =[];
var built_blocks=[];


class CharacterObject {
  //constructor default values
  constructor(htmlCode,position,blockTypeID){
    this.htmlCode=htmlCode || AddSpanTags("?");
    this.position=position||[undefined,undefined];
    this.blockTypeID=blockTypeID||0;
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
    active_game_objs.forEach(gameObj => {
      if(this.position==gameObj.position){
        this.position = [this.position[0],this.position[1]];
        console.log("Object interraction between "+gameObj.htmlCode+"and ");
        TextOutput("Action.");
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

function AddSpanTags(character){
  return "<span class='interactable-char'>"+character+"</span>";
}

function TextOutput(text){
  textOutputElem.innerHTML=text;
}

new CharacterObject(AddSpanTags(">")).SpawnGameObj([1,3]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,4]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,5]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,6]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,7]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,7]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,8]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,9]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,10]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,11]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,12]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,13]);
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,14]);
new CharacterObject(AddSpanTags("X")).SpawnGameObj([1,15]);
var firstCharObj = new CharacterObject(AddSpanTags("c"),null);
firstCharObj.SpawnGameObj([1,3]);

RedrawGameScreen(medium_shade_block_ASCII_char);

// will execture function once every tdelay ms
var tdelay = 1000;
window.setInterval(function(){Main()}, tdelay);

function Main(){
  RedrawGameScreen(medium_shade_block_ASCII_char);

  active_game_objs.forEach(element => {
    element.ActionCheck();
  });
}