//#region ASCII ART
var navbarASCII=`+--------------------------------------------+
`+`|<span class="navbar-btn1">        </span>|`+`<span class="navbar-btn2">        </span>|`+`<span class="navbar-btn3">        </span>|`+`<span class="navbar-btn4">        </span>|`+`<span class="navbar-btn5">        </span>|`+`
`+`|<span class="navbar-btn1">  Home  </span>|`+`<span class="navbar-btn2"> Storage</span>|`+`<span class="navbar-btn3">  Map   </span>|`+`<span class="navbar-btn4">  Shop  </span>|`+`<span class="navbar-btn5">   ???  </span>|`+`
`+`|<span class="navbar-btn1">        </span>|`+`<span class="navbar-btn2">        </span>|`+`<span class="navbar-btn3">        </span>|`+`<span class="navbar-btn4">        </span>|`+`<span class="navbar-btn5">        </span>|`+`
+--------------------------------------------+`;

var animArray1 = [
`+----------------+
|       0        |
|                |
|                |
|                |
+----------------+`,
  `+----------------+
|                |
|       0        |
|                |
|                |
+----------------+`,
`+----------------+
|                |
|                |
|       0        |
|                |
+----------------+`,
`+----------------+
|                |
|                |
|                |
|       0        |
+----------------+`

];


var homeHTMLContent = `|_| _ __  _                
| |(_)|||(/_`;
var inventoryHTMLContent = `___                        
 | __     _ __ _|_ _  __ \/
_|_| |\_/(/_| | |_(_) |  / 
`;
var mapHTMLContent = `       _
|V| _ |_)
| |(_||`;
var shopHTMLContent = ` __       _
(_ |_  _ |_)
__)| |(_)|`;
// #endregion

//Element Variables
var scoreElem=document.getElementById("score");
var clickerBtn=document.getElementById("clicker");
var gameScreenElem = document.getElementById("div0");
var gameTerminalText = document.getElementById("div1");

// ~~* NAVBAR *~~\\
var navBar=document.getElementById("nav-bar");
navBar.innerHTML=navbarASCII;
var navbtn1List = document.querySelectorAll(".navbar-btn1");
var navbtn2List = document.querySelectorAll(".navbar-btn2");
var navbtn3List = document.querySelectorAll(".navbar-btn3");
var navbtn4List = document.querySelectorAll(".navbar-btn4");

//Game Variables
var score = 0;
var shopItemList = [
  //Name, Price, ScoreMultiplier
  ['Mechanical arm',100,1.5],
  ['Plunger',5,1.1],
  ['Pile of rocks',1,1.1],
  ['Pebbles',5,1.1],
  ['Hammer',10,1.1],
  ['Mallet',10,1.1],
  ['Rubber chicken',3,1.1],
  ['Robotic finger',80,1.2],
  ['Laser pointer',10,1.1],// or other light-based tool
  ['Suction cup',10,1.1], //or other adhesive device
  ['Pair of nunchucks',30,1.2], // or other martial arts weapon
  ['Pile of sticks',1,1.1],// or other kindling material
  ['Laser beam',10,1.1],
  ['Telekinesis',100,1.2],
  ['VR interface',300,1.2],
  ['Neural implant',99,1.4],
  ['Mini Drone',50,1.3],
  ['Sonic pulse',99,1.4],
  ['Hardlight projection',99,1.5],
  ['BMI Neuralink',999,2],
  ['Gravity field gen',999,2],
  ['magical clicking wand',10,1.1],
  ['team of trained clicker-monkeys',10,1.1],
  ['Finger Machine',10,1.1],
  ['Interdimensional Clone',10,1.1],
  ['Trained Monkey',10,1.1],
  ['Trained Dog',10,1.1],
  ['Trained Bearded Dragon',10,1.1],
  ['Trained Fox',10,1.1],
  ['Trained Cat',10,1.1],
  ['Cat',10,1.1],
  ['Click Portal',10,1.1],
  ['Army of drones',10,1.1],
  ['Time machine',10,1.1],
  ['Genie click wish',10,1.1],
  ['Mechanical clicker',10,1.1],
  ['Clicking potion',10,1.1],
  ['Fast-moving cursor',10,1.1],
  ['Holographic clicker',10,1.1],
  ['Clicking spell',10,1.1],
  ['Super-powered finger',10,1.1],
  ['Clicking automation',10,1.1],
  ['Time-loop clicking',10,1.1],
  ['Clicking clone army',10,1.1],
  ['Button-mashing robot',10,1.1],
  ['Clicking aura',10,1.1],
  ['Instantaneous clicking',10,1.1],
  ['Clicking miracle',10,1.1],
  ['Clicking vortex',10,1.1],
  ['Clicking frenzy',10,1.1],
  ['Clicking frenzy spell',10,1.1],
  ['Clicking charm',10,1.1],
  ['Infinite clicking power',10,1.1],
  ['Arcane clicking power',10,1.1],
  ['Clicking god mode',10,1.1],
  ['Clicking god mode spell',10,1.1],
  ['Clicking force field',10,1.1],
  ['Clicking god mode aura',10,1.1],
  ['Clicking god mode potion',10,1.1],
  ['Mechanical clicking device',50,1.5],
  ['Electric button presser',100,1.1],
  ['Robotic button masher',150,1.1],
  ['High-speed clicking machine',200,1.1],
  ['Superpowered clicking gloves',250,1.5],
  ['Hyperclicking boots',300,1.1],
  ['Ultra-efficient clicking belt',350,1.5],
  ['Infinite clicking staff',400,1.0],
  ['Magical clicking wand',450,1.5],
  ['Divine clicking hammer',500,1.0],
  ['Automated clicking robot',550,1.5],
  ['Hyperspace clicking portal',600,1.0],
  ['Temporal clicking accelerator',650,1.75],
  ['Gravity-defying clicking boots',700,1.80],
  ['Supercomputer-assisted clicking device',750,1.85],
  ['Quantum clicking machine',800,1.90],
  ['Interdimensional clicking portal',850,1.95],
  ['Multiversal clicking staff',900,1.100],
  ['Cosmic clicking gloves',950,1.105],
  ['Divine clicking hammer',1000,1.110]
  ]; 
var inventory = [];
var inventoryItemList = [];

//Set onclick function for each spantag of id in navbar
navbtn1List.forEach(navbtn => {
  navbtn.onclick = () => NavBarSelect(0);
});
navbtn2List.forEach(navbtn => { navbtn.onclick = () => NavBarSelect(1); });
navbtn3List.forEach(navbtn => { navbtn.onclick = () => NavBarSelect(2); });
navbtn4List.forEach(navbtn => { navbtn.onclick = () => NavBarSelect(3); });

clicker.onclick= function (){
  score+=1;
  UpdateScoreElementHTML();
}

// #region Functions
function UpdateScoreElementHTML(){
  //Update score html element content
  scoreElem.innerHTML=score.toFixed(2)+"&#442";
}

// 0 = Home, 1 = Inventory, 2 = Map
function NavBarSelect(dest){
  var navBtnsColours = ["","","","",""];
  switch (dest){
    case 0:
      //Go to Home
      navBtnsColours[0]="#333333";
      navBtnsColours[1]="initial";
      navBtnsColours[2]="initial";
      navBtnsColours[3]="initial";
      terminal(gameTerminalText,"Home");
      gameScreenElem.innerHTML=homeHTMLContent;
      //playanim
      //var anim1 = ASCIIAnimation(animArray1, 200, gameScreenElem);
      break;
    case 1:
      //show Inventory      
      navBtnsColours[0]="initial";
      navBtnsColours[1]="#333333";
      navBtnsColours[2]="initial";
      navBtnsColours[3]="initial";
      terminal(gameTerminalText,"Inventory");
      GenerateInventoryElementHTML();
      //gameScreenElem.innerHTML=inventoryHTMLContent;
      break;
    case 2:
      //Map
      navBtnsColours[0]="initial";
      navBtnsColours[1]="initial";
      navBtnsColours[2]="#333333";
      navBtnsColours[3]="initial";
      terminal(gameTerminalText,"Atlas");
      gameScreenElem.innerHTML=mapHTMLContent;
      break;
  case 3:
    //Shop
    navBtnsColours[0]="initial";
    navBtnsColours[1]="initial";
    navBtnsColours[2]="initial";
    navBtnsColours[3]="#333333";
    terminal(gameTerminalText,"Shop");
    GenerateShopElementHTML();
    gameScreenElem.onclick=function(){
      if(score>=shopItem[1]){
        BuyItem();
        GenerateShopElementHTML();
        UpdateScoreElementHTML();
      }
      else{
        terminal(gameTerminalText,"You don't have enough mate, sorry.");
      }
    };
    break;
  }
  navbtn1List.forEach(spantag => {
    spantag.style.backgroundColor = navBtnsColours[0];
    spantag.style.cursor = "pointer";
  });
  navbtn2List.forEach(spantag => {
    spantag.style.backgroundColor = navBtnsColours[1];
    spantag.style.cursor = "pointer";
  });
  navbtn3List.forEach(spantag => {
    spantag.style.backgroundColor = navBtnsColours[2];
    spantag.style.cursor = "pointer";
  });
    navbtn4List.forEach(spantag => {
    spantag.style.backgroundColor = navBtnsColours[3];
    spantag.style.cursor = "pointer";
  });
}

var writing = false;
function terminal(gameTextElement, txt, printSpeed) {
  gameTextElement.innerHTML = "";
  var txt = txt || [notes[0].intro, notes[0].que].join('\n').split('');
  var printSpeed = printSpeed || 50;
  var i = 0;
  (function display() {
    if(i < txt.length) {
      writing=true;
      //minigameElement.onclick = function (){/* Do nothing */};
      gameTextElement.innerHTML += txt[i].replace('\n', '<br />');
      ++i;
      setTimeout(display, txt, printSpeed);
    }
    else{
      writing=false;
      minigameElement.onclick = function (){ terminal(gameTextElement, txt, printSpeed);  }
    }
   })
  ();
}

function ASCIIAnimation(animArray, speed, DOMtarget) {
  var currentFrame = 0;
	for(var i = 0; i < animArray.length; i++) {
		animArray[i] = animArray[i].replace(/ /g,"&nbsp;");
		//animArray[i] = "<pre>" + animArray[i] + "</pre>";
    animArray[i] = animArray[i];
	}
	DOMtarget.innerHTML = animArray[0];
	currentFrame++;
	this.animation = setInterval(function() {
		DOMtarget.innerHTML = animArray[currentFrame];
		currentFrame++;
		if(currentFrame >= animArray.length) currentFrame = animArray.length-1;
	}, speed);
	this.getCurrentFrame = function() {
		return currentFrame;
	}
}
ASCIIAnimation.prototype.stopAnimation = function() {
	clearInterval(this.animation);
}
//#endregion ~~~* End of functions *~~~

function GenerateShopElementHTML(){
  //Generate a new item in the shop
  shopItem=shopItemList[Math.floor(Math.random() * shopItemList.length)];
  shopItemOutput_ASCII = `
+--------- - - - - -
| Buy:
| `+shopItem[0]+`
| `+shopItem[1]+`<span>&#442;</span> `+shopItem[2]+`<span>&#8859;</span>
+--------- - - - - -`;
  shopItemOutput_ASCII = "<span style='cursor:pointer;'>"+shopItemOutput_ASCII+"</span>";
  //add shop title to shop item
  return gameScreenElem.innerHTML=shopHTMLContent+shopItemOutput_ASCII;
}

function BuyItem(){
  score = score-shopItem[1];
  //store item in inventory
  inventory.push(`<br>`+shopItem[0]);
  inventoryItemList.push(shopItem);

  terminal(gameTerminalText, "You bought the "+shopItem[0]+".");
}

function GenerateInventoryElementHTML(){
  return gameScreenElem.innerHTML=inventoryHTMLContent+`
========================`+inventory;
}

//~~~* MAIN LOOP *~~\\
function Main(){
  score+=1;
  UpdateScoreElementHTML();
}


// will execture function once every tdelay ms
var tdelay = 1000;
window.setInterval(function(){Main()}, tdelay);

