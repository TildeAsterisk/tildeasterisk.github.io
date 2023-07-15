const yrange = 20;
const xrange = 80;
var gameScreenArray = Array2DConstructor();
var medium_shade_block_ASCII_char = `&#9618;`;
var gameScreenElem = document.getElementById("game-screen");
var textOutputElem = document.getElementById("div1");

var active_game_objs =[];
var built_blocks=[];

// Character as in (0-9,a-Z,*%&)
class CharacterObject {
  //constructor default values
  constructor(htmlCode,id,position,blockTypeID){
    this.htmlCode=htmlCode || AddSpanTags("?");
    this.position=position||[undefined,undefined];
    this.blockTypeID=blockTypeID||0;
    this.id=id;

    AddSpanTags(htmlCode)
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
    //Check if in same position as any other active game object
    active_game_objs.forEach(gameObj => {
      if(this.position==gameObj.position && this != gameObj){
        this.position = [this.position[0],this.position[1]+1];
        console.log("Object interraction between "+gameObj.htmlCode+"and ");
        TextOutput("Object interraction between "+gameObj.htmlCode+" and " + this.htmlCode);
      }
    });
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
      TextOutput("Selecting: '"+selectedObj+"' "+event.target.id);
  }
});


/*new CharacterObject(AddSpanTags(">")).SpawnGameObj([1,3]);
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
new CharacterObject(AddSpanTags("=")).SpawnGameObj([1,14]);*/
new CharacterObject(AddSpanTags("X")).SpawnGameObj([1,15]);
var firstCharObj = new CharacterObject(AddSpanTags("c"));
firstCharObj.SpawnGameObj([1,3]);
new ItemObject(AddSpanTags("*")).SpawnGameObj([1,4]);

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