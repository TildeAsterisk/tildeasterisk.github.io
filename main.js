var character = "o<br>~|~<br>/'\\";
var bits = 0;
var tdelay = 1000;

function addPlayer(){
        if(bits >= 8){
        document.getElementById("player").innerHTML = "<pre>" + character + "</pre>";
        bits = bits - 8;
    }
}

function mainLoop(){
    bits=bits+1;
    document.getElementById("bitCount").innerHTML = bits;
    document.getElementById("bps").innerHTML = (tdelay/1000) + " bits/s";
    
    if(bits >= 8){
        document.getElementById("charbtn").disabled = false;
    }
    else{
        document.getElementById("charbtn").disabled = true;
    }
}

// will execture function once every tdelay ms
window.setInterval(function(){mainLoop()}, tdelay);
