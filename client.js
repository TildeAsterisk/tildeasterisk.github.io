


/*	
	usage: ASCIIAnimation(param1, param2, param3)
	
	param1 - array of animation 'frames' (strings)
	param2 - speed of animation in ms
	param3 - DOM target, inserts animation to .innerHTML (retains spaces)
	
	ex: 
	var anim1 = new ASCIIAnimation(["1","2","3"], 100, div1);
*/
function ASCIIAnimation(animArray, speed) {
  var DOMtarget=document.getElementById("ASCIIAnimDiv");
  var currentFrame = 0;
	for(var i = 0; i < animArray.length; i++) {
    //if(animArray[i]!=null){}
		animArray[i] = animArray[i].replace(/ /g,"&nbsp;");
		animArray[i] = "<pre>" + animArray[i] + "</pre>";
	}
	DOMtarget.innerHTML = animArray[0];
	currentFrame++;
	this.animation = setInterval(function() {
		DOMtarget.innerHTML = animArray[currentFrame];
		currentFrame++;
		if(currentFrame >= animArray.length) currentFrame = 0;
	}, speed);
	this.getCurrentFrame = function() {
		return currentFrame;
	}
  }
  
  ASCIIAnimation.prototype.stopAnimation = function() {
      clearInterval(this.animation);
  }
  
  function makeDiv() { 
    tmpdiv=document.createElement("div");
    tmpdiv.add('ASCIIanim');
    return tmpdiv; }
  function bodyAppend(element) { document.body.appendChild(element); }

var tai_chi=[
document.getElementById("kata_tai_chi:yang_form_1.f1").textContent,
document.getElementById("kata_tai_chi:yang_form_1.f2").textContent,
document.getElementById("kata_tai_chi:yang_form_1.f3").textContent,
document.getElementById("kata_tai_chi:yang_form_1.f4").textContent,
document.getElementById("kata_tai_chi:yang_form_1.f5").textContent,
document.getElementById("kata_tai_chi:yang_form_1.f6").textContent,
document.getElementById("kata_tai_chi:yang_form_1.f7").textContent,
document.getElementById("kata_tai_chi:yang_form_1.f8").textContent,
document.getElementById("kata_tai_chi:yang_form_1.f9").textContent,
];


var myAnimation = new ASCIIAnimation(tai_chi, 500);



