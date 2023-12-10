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

  var animArray1 = [
      ">   ", 
      " >  ", 
      "  > ", 
      "   >", 
      "   <", 
      "  < ", 
      " <  ",
      "<   "
  ];
  var animArray2 = ["///","|||","\\\\\\","|||"];
  var animArray3 = [".(^-^)'","-(^-^)-","'(^-^).","-(^o^)-",".(^-^)'","-(^-^)-","'(^-^).","-(^-^)-"];
  var animArray4 = [
      "[>    ]",
      "[>>   ]",
      "[>>>  ]",
      "[ >>> ]",
      "[  >>>]",
      "[   >>]",
      "[    >]",
      "[     ]"
  ];
  var animArray5 = [
      "+--+\n" + 
      "|> |\n" +
      "|  |\n" +
      "+--+",
      "+--+\n" + 
      "| >|\n" +
      "|  |\n" +
      "+--+",
      "+--+\n" + 
      "| v|\n" +
      "|  |\n" +
      "+--+",
      "+--+\n" + 
      "|  |\n" +
      "| v|\n" +
      "+--+",
      "+--+\n" + 
      "|  |\n" +
      "| <|\n" +
      "+--+",
      "+--+\n" + 
      "|  |\n" +
      "|< |\n" +
      "+--+",
      "+--+\n" + 
      "|  |\n" +
      "|^ |\n" +
      "+--+",
      "+--+\n" + 
      "|^ |\n" +
      "|  |\n" +
      "+--+",
  ];
var dancing_in_the_rain_by_jgs=[
/*`
   _O/                   ,
     \                  /           \O_
     /\_             `\_\        ,/\/
     \  `       ,        \         /
     `       O/ /       /O\        \
             /\|/\.                `
`,*/
 `
    _O/  
      \\    
      /\\_ 
      \\  \`
      \`
 
 `,
 `
    
     
      
     , 
 O/ /  
/\\|/\\.
`,
`
    ,
    /     
 \`\\_\\    
      \\ 
    /O\\  
   
 `,
 `
 
   \\O_
,/\\/
  /
  \\
  \`
 `

]

  var myAnimation = new ASCIIAnimation(dancing_in_the_rain_by_jgs, 500);