//ASCII ART
var navbarASCII=`+--------------------------------------------+
`+`|<span class="navbar-btn1">        </span>|`+`<span class="navbar-btn2">        </span>|`+`<span class="navbar-btn3">        </span>|`+`<span class="navbar-btn4">        </span>|`+`<span class="navbar-btn5">        </span>|`+`
`+`|<span class="navbar-btn1">  Home  </span>|`+`<span class="navbar-btn2"> Storage</span>|`+`<span class="navbar-btn3">  Map   </span>|`+`<span class="navbar-btn4">        </span>|`+`<span class="navbar-btn5">        </span>|`+`
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

//Game Variables
var score = 0;

//Functions
function UpdateHTML(){
  //Update score html element content
  scoreElem.innerHTML=score.toFixed(2)+"&#442";
}

// 0 = Home, 1 = Inventory, 2 = Map
function NavBarSelect(dest){
  switch (dest){
    case 0:
      //Go to Home
      alert("Selected Home");
      document.querySelector(".navbar-btn1").style.backgroundColor = "#333333";
      document.querySelector(".navbar-btn2").style.backgroundColor = "initial";
      document.querySelector(".navbar-btn3").style.backgroundColor = "initial";
      terminal(clickerBtn,"Home");
      break;
    case 1:
      //Inventory
      alert("Selected inventory");
      document.querySelector(".navbar-btn1").style.backgroundColor = "initial";
      document.querySelector(".navbar-btn2").style.backgroundColor = "#333333";
      document.querySelector(".navbar-btn3").style.backgroundColor = "initial";
      terminal(clickerBtn,"Inventory");
      break;
    case 2:
      //Map
      alert("Selected map");
      document.querySelector(".navbar-btn2").style.backgroundColor = "initial";
      document.querySelector(".navbar-btn1").style.backgroundColor = "initial";
      document.querySelector(".navbar-btn3").style.backgroundColor = "#333333";
      terminal(clickerBtn,"Atlas");
      break;
  }
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

var navbtn2 = document.querySelector("#navbar-btn2");
document.querySelector(".navbar-btn1").onclick = () => NavBarSelect(0);
document.querySelector(".navbar-btn2").onclick = () => NavBarSelect(1);
document.querySelector(".navbar-btn3").onclick = () => NavBarSelect(2);


// will execture function once every tdelay ms
var tdelay = 1000;
window.setInterval(function(){Main()}, tdelay);

