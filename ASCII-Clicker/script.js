//ASCII ART
var navbarASCII=`+--------------------------------------------+
`+`|<span class="navbar-btn1">        </span>|`+`<span class="navbar-btn2">        </span>|`+`<span class="navbar-btn3">        </span>|`+`<span class="navbar-btn4">        </span>|`+`<span class="navbar-btn5">        </span>|`+`
`+`|<span class="navbar-btn1">  Home  </span>|`+`<span class="navbar-btn2"> Storage</span>|`+`<span class="navbar-btn3">  Map   </span>|`+`<span class="navbar-btn4">  Shop  </span>|`+`<span class="navbar-btn5">   ???  </span>|`+`
`+`|<span class="navbar-btn1">        </span>|`+`<span class="navbar-btn2">        </span>|`+`<span class="navbar-btn3">        </span>|`+`<span class="navbar-btn4">        </span>|`+`<span class="navbar-btn5">        </span>|`+`
+--------------------------------------------+`;

//Element Variables
var scoreElem=document.getElementById("score");
var clickerBtn=document.getElementById("clicker");
clicker.onclick= function (){
  score+=1;
  UpdateHTML();
}
var navBar=document.getElementById("nav-bar");
navBar.innerHTML=navbarASCII;
var navbtn1List = document.querySelectorAll(".navbar-btn1");
var navbtn2List = document.querySelectorAll(".navbar-btn2");
var navbtn3List = document.querySelectorAll(".navbar-btn3");
var navbtn4List = document.querySelectorAll(".navbar-btn4");
var gameScreenElem = document.getElementById("div0");
var gameTerminalText = document.getElementById("div1");

//Game Variables
var score = 0;

//Functions
function UpdateHTML(){
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
      break;
    case 1:
      //Inventory      
      navBtnsColours[0]="initial";
      navBtnsColours[1]="#333333";
      navBtnsColours[2]="initial";
      navBtnsColours[3]="initial";
      terminal(gameTerminalText,"Inventory");
      break;
    case 2:
      //Map
      navBtnsColours[0]="initial";
      navBtnsColours[1]="initial";
      navBtnsColours[2]="#333333";
      navBtnsColours[3]="initial";
      terminal(gameTerminalText,"Atlas");
      break;
  case 3:
    //Shop
    navBtnsColours[0]="initial";
    navBtnsColours[1]="initial";
    navBtnsColours[2]="initial";
    navBtnsColours[3]="#333333";
    terminal(gameTerminalText,"Shop");
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

//~~~* MAIN LOOP *~~\\
function Main(){
  score+=1;
  UpdateHTML();
}

//Set onclick function for each spantag of id in navbar
navbtn1List.forEach(navbtn => {
  navbtn.onclick = () => NavBarSelect(0);
});
navbtn2List.forEach(navbtn => {
  navbtn.onclick = () => NavBarSelect(1);
});
navbtn3List.forEach(navbtn => {
  navbtn.onclick = () => NavBarSelect(2);
});
navbtn4List.forEach(navbtn => {
  navbtn.onclick = () => NavBarSelect(3);
});

// will execture function once every tdelay ms
var tdelay = 1000;
window.setInterval(function(){Main()}, tdelay);

