class Character {
    constructor(name,statsObj,position=RandomSpawnPoint()) { //health, attack, defense, speed, range, position, size, direction, colour, text, enemyTypes
      this.name           = name;
      this.text           = statsObj.text;
      this.health         = statsObj.health;
      this.attack         = statsObj.attack;
      this.defense        = statsObj.defense;
      this.speed          = statsObj.speed;
      this.range          = statsObj.range;
      this.position       = position;
      this.size           = statsObj.size;
      this.colour         = statsObj.colour;
      this.defaultColour  = this.colour;
      this.defaultSize    = this.size;
      this.direction      = statsObj.direction;
      this.focus          = undefined;
      this.enemyTypes     = statsObj.enemyTypes;
      this.type           = statsObj.type;
      this.isIndoors      = false;
      this.isAlive        = true;
      
      if(!this.position){
        this.position=this.generateRandomDestinationWithinRange();
      }
    }
  
    DrawCharacter(){ 
      // Set font size and type
      const fontSize = this.size[0];
      ctx.font = `${fontSize}px Arial`;
  
      // Calculate the position to center the emoji inside the box
      const textWidth = ctx.measureText(this.text).width;
      const textHeight = fontSize; // Assuming the height of the emoji is the same as the font size
  
      const centerX = this.position[0] + (this.size[0] - textWidth) / 2;
      const centerY = this.position[1] + (this.size[1] + textHeight) / 2;
  
      //Check if user selected.
      if (PlayerObj.selected==this){
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(centerX, centerY-textHeight, textWidth,textHeight+3.5);
  
        //Change (Size)
        //this.size=[ this.defaultSize[0]*1.5 , this.defaultSize[1]*1.5 ];
      }
  
      // Use fillText to display emoji
      ctx.fillText(this.text, centerX, centerY);
  
      // Uncomment the following line if you still want to draw a rectangle around the emoji
      //ctx.fillRect(this.position[0], this.position[1], this.size[0], this.size[1]);
    }
  
    isMouseOver(mouseX, mouseY) {
      if(this.isIndoors){return false;}
      var mouseHitBox=10;
      return (
        mouseX >= (this.position[0] - (mouseHitBox)) &&
        mouseX <= this.position[0] + this.size[0] + mouseHitBox &&
        mouseY >= (this.position[1] - mouseHitBox) &&
        mouseY <= this.position[1] + this.size[1] + mouseHitBox
      );
    }
  
    SpawnCharacter() {
      // Initialization code here
      this.DrawCharacter();
  
      //Push character to active spawned character list
      charCount+=1;
      this.name=this.name+charCount;
      ActiveCharactersArray.push(this);
      //console.log("Character "+this.name+" initialized.");
      GameLog(this.name+" spawned.");
    }
  
    //#region Movement Methods
    Movement_DVDBounce() {
      // Update position based on speed and direction
      this.position[0] += this.speed * Math.cos(this.direction);
      this.position[1] += this.speed * Math.sin(this.direction);
  
      // Bounce off walls
      if (this.position[0] < 0 || this.position[0] > canvas.width - this.size[0]) {
        this.direction = Math.PI - this.direction;
      }
      if (this.position[1] < 0 || this.position[1] > canvas.height - this.size[1]) {
        this.direction = -this.direction;
      }
    }
    generateRandomDestinationWithinRange() {
      var randomAngle = Math.random() * 2 * Math.PI;
      var randomDistance = Math.random() * this.range * 2;
  
      // Calculate the random position within the specified radius
      var destinationX = this.position[0] + randomDistance * Math.cos(randomAngle);
      var destinationY = this.position[1] + randomDistance * Math.sin(randomAngle);
  
      return [destinationX, destinationY];
    }
    //#endregion
    Movement_MoveToTarget(target) {
      if (!target) {
        // No target, do nothing
        //console.log("No Target to move to.");
        return;
      }
  
      // First, check to see if the character has reached the target
      const distanceToTarget = Math.sqrt(Math.pow(target.position[0] - this.position[0], 2) + Math.pow(target.position[1] - this.position[1], 2));
      if (distanceToTarget < (this.size[0]+5) && this.focus) {
        // The character is close enough to the target, consider it reached
        //console.log(`${this.name} reached ${this.focus.name}! Distance: ${distanceToTarget}`);
  
        //if Character Focus is a random destination (wandering), reset focus
        if("Random Destination" == this.focus.name){
          this.SetFocus(undefined);
          return;
        }
  
        //Interract with target
        this.Interact(target);
        //this.AttackTarget(target);
        return;
      }
  
      //Move to Target
      const angleToTarget = Math.atan2(target.position[1] - this.position[1], target.position[0] - this.position[0]);
      // Calculate the movement components
      const dx = this.speed * Math.cos(angleToTarget);
      const dy = this.speed * Math.sin(angleToTarget);
      // Calculate the new position
      const newPositionX = this.position[0] + dx;
      const newPositionY = this.position[1] + dy;
  
      // Check if the new position is within the canvas boundaries
      if (isPositionOnCanvas(newPositionX, newPositionY)) {
        // Update the character's position towards target
        this.position[0] = newPositionX;
        this.position[1] = newPositionY;
      } else {
        // Optionally handle the case where the new position is outside the canvas
        //console.log("Character cannot move outside the canvas.");
        //reset focus
        this.SetFocus(undefined);
      }
  
    }
  
    UpdatePosition(){
      /* Check if no focus then search for nearby viable targets and set character focus
      if(!this.focus){
        this.focus = this.FindTargetInRange("isAlive,Structure");
      }
      */
  
      //if focus is now set move to focus
      if (this.focus){
        if(!this.focus.isAlive /*&& this.focus.name!="Random Destination"*/){
          //check if focus is dead
         this.SetFocus(undefined);
         return;
        }
  
        /*var distanceToTarget = Math.sqrt(Math.pow(this.focus.position[0] - this.position[0], 2) + Math.pow(this.focus.position[1] - this.focus.position[1], 2));
        if(distanceToTarget>this.range){
          this.SetFocus(undefined);
          return;
        }*/
        
        this.Movement_MoveToTarget(this.focus);
      }
      else{ //if focus is not set, set random destination
        this.SetFocus(this.FindTargetInRange("isAlive,Structure"));
        //set temp desination focus
        //Random decision to walk
        if( [Math.round(Math.random()*5)] != 1){
          return;
        }
        var randomPos = this.generateRandomDestinationWithinRange();
        var tmpDestFocus = new Focus("Random Destination", [randomPos[0], randomPos[1]]);
        this.SetFocus(tmpDestFocus);
        //console.log(this.focus);
        //console.log("moving to random");
        this.Movement_MoveToTarget(this.focus);
      }
      
    }
  
    SetFocus(target){
      if (target == undefined){
        //console.log(this.name+" cannot set focus.");
        this.focus = undefined;
        return;
      }
  
      if(target.isAlive || target.name=="Random Destination"){
        //console.log(this.name+" is targeting "+target.name);
        this.focus = target;
      }
    }
  
    FindTargetInRange(filter=undefined) {
      const targets = ActiveCharactersArray.filter((target) => {
        // Exclude self
        if (target == this)  {
          return false;
        }
        //exclude if enemytypes do not match and if taret us indoors and if target is dead
        if (!this.enemyTypes.includes(target.type) || target.isIndoors)  {
          return false;
        }
  
        if(filter!=undefined){
          switch (filter){
            case filter.includes("isAlive"):
              if(!target.isAlive){return false;}
            case filter.includes("Structure"):
              if(target.type=="Structure"){return false;}
  
              break;
            default:
              break;
          }
        }
  
  
        // Calculate distance between characters
        const distance = Math.sqrt(
          Math.pow(target.position[0] - this.position[0], 2) +
          Math.pow(target.position[1] - this.position[1], 2)
        );
  
        // Check if the target is within range
        return distance <= this.range;
      });
  
      // Return the first target found, or null if no target is in range
      return targets.length > 0 ? targets[0] : null;
    }
  
    Interact(target){
      switch (target.type){
        case "Enemy":
        case "Ally":
          //Attack if enemy
          if(this.enemyTypes.includes(target.type) && target.isAlive){
            GameLog(this.name+" is attacking "+this.focus.name);
            this.AttackTarget(target);
          }
          break;
        case "Structure":
          //Enter if non enemy structure
          if(!target.enemyTypes.includes(this.type)){
            target.EnterCharacterIntoStructure(this);
          }
          else{
            //Structure is hostile to this character
            this.AttackTarget(target);
          }
          break;
        default:
          break;
      }
      //non combat interraction
  
    }
  
    AttackTarget(target){
      // For example, decrease the target's health
      target.health -= this.attack;
  
      //console.log(`${target.name} health: ${target.health}`);
      if(target.health<=0){
        console.log(`${this.name} has killed ${target.name}.`);
        GameLog(`${this.name} has killed ${target.name}.`);
        target.Die();
        this.SetFocus(undefined);
      }
    }
  
    Die() {
      //set to skull emoji
      this.text="💀";
      this.DrawCharacter();
      this.isAlive=false;
  
      // Find the index of the character in the ActiveCharactersArray
      const index = ActiveCharactersArray.indexOf(this);
  
      if (index !== -1) {
        // Remove the character from the array
        ActiveCharactersArray.splice(index, 1);
  
        // Optionally, perform additional cleanup or animations
        //console.log(`${this.name} has been killed.`);
  
        // Remove HTML elements or perform other cleanup if needed
  
        // If you want to remove the associated HTML elements, assuming you have a reference to the element
        // const characterElement = document.getElementById(this.name);
        // characterElement.parentNode.removeChild(characterElement);
      } else {
        //console.log(`${this.name} not found in ActiveCharactersArray.`);
      }
  
      //canvas.removeEventListener("click", event);
      delete this;
    }
  
    //END OF CHARACTER CLASS
  }
  