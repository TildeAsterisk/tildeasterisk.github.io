class Structure extends Character{
    constructor(name, statsObj){
      //Call base constructure with super()
      super(name,statsObj);
      //set type
      this.type           = "Structure";
      this.capacity       = statsObj.capacity;
      this.indoorCount    = 0;
      this.contents       = [];
      this.level          = 1;
      this.storage        = { food:0};
      this.maxStorage     = 20;
      this.text           = "🏠";

      this.actionCooldowns = {primaryAction:{
        cooldownTime : 5000,
        lastActionTime : 0
      }
    };


      // Add a cooldown property (in milliseconds)
      this.cooldownTime = 5000; // Example: 5 seconds cooldown
      this.lastActionTime = 0; // Initialize with zero (no cooldown)
    }
    UpdatePosition(){
      //STRUCTURE DEFENSE
      // Check for nearby targets and set character focus
      if(!this.focus){
        this.SetFocus(this.FindTargetInRange("isAlive"));
      }
      else {
        //calcukate distance
        const distance = Math.sqrt(
          Math.pow(this.focus.position[0] - this.position[0], 2) +
          Math.pow(this.focus.position[1] - this.position[1], 2)
        );
        //if has focus AND (focus is dead OR focus is out of range), reset focus
        if(!this.focus.isAlive || distance > this.range){
          this.SetFocus(undefined);
          return;
        }
        //Deploy unit to combat enemy
        GameLog(this.focus.name+" detected near structure");
        //Set deploy unit and set its focus to enemy
        
        var nonUndefinedElement = this.contents.find((element) => element !== undefined);
        if(this.contents.length>0 && this.contents.includes(nonUndefinedElement)){
          //Set focus of char in contents before exiting from structure. Reference pops from contents array
          //nonUndefinedElement.SetFocus( this.focus);
          //nonUndefinedElement.SetFocus(this.focus);
          this.ExitCharacterFromStructure(nonUndefinedElement, this.focus);
          //console.log("Defense unit "+nonUndefinedElement.name+" deployed from "+this.name+" with focus "+nonUndefinedElement.focus.name);
        }
      }

      //SGTRUCTURE PROCUDE FOOD
      if(this.contents.length==this.capacity){
        //Level up structure
        //this.LevelUp();
        this.ProduceFoodOnCooldown();
      }

      //STRUCTURE LEVEL UP
      if(this.storage.food >= this.maxStorage && this.contents.length == this.capacity)
        this.LevelUp();
    
    }

    DrawCharacter() {
      // Check if user selected.

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

      }
  
      // Use fillText to display emoji
      ctx.fillText(this.text, centerX, centerY);

      
      // Draw structure text (level)
      /*
      const levelText = "LVL" + this.level; // Replace with the actual level value
      ctx.font = `${fontSize/5}px Arial`;
      //ctx.textAlign = "center"; // Center-align horizontally
      //ctx.textBaseline = "middle"; // Align vertically to the middle
  
      // Draw the text
      ctx.fillStyle = "black"; // Set text color
      ctx.fillText(levelText, this.position[0], this.position[1]);
      */
      
    }
    
  
    EnterCharacterIntoStructure(char){
      if (this.contents.includes(char)){
        //Character is already inside structure
        console.log("character is already inside structure");
        return;
      }
      //check capacity
      if (this.indoorCount>=this.capacity){
        //Structure is at max capacity, character cannot enter
        char.SetFocus(undefined);
        GameLog("Your people need more houses.");
        return;
      } 
      //Enter character inside
      this.contents.push(char);
      this.indoorCount+=1;
      char.isIndoors=true;
      char.SetFocus(this);
      console.log(char.name+" exits "+this.name);
    }
    ExitCharacterFromStructure(char, newFocus=undefined){
      if (!this.contents.includes(char)){
        console.log("Cannot exit "+char.name+" because they aren't inside structure "+this.name);
        return;
      }
      if(this.contents.length>0){
        var index = this.contents.indexOf(char);
        this.contents.splice(index, 1);
        //this.contents.pop(char);
        this.indoorCount-=1;
        char.isIndoors=false;
        char.position=GenerateRandomPositionInRange(this.position,20);
        //char.position=[this.position[0],this.position[1]];
        char.SetFocus(newFocus);
        console.log(char.name+" enters "+this.name);
      }
      
    }

    LevelUp(){
      this.level+=1;

      this.capacity+=2;
      this.maxStorage+=10;

      //SPAWN NEW STRUCTURE NEXTDOOR
      const newStructure = new Structure(
        "Basic Structure",
        basicStructureStats
      );
      newStructure.position = GenerateRandomPositionInRange(this.position,this.size[0]*5);
      newStructure.SpawnCharacter();

      console.log(this.name+" has leveled up!");
    }

    // Method to check if the cooldown has passed
    isCooldownExpired () {
      const currentTime = Date.now();
      return currentTime - this.actionCooldowns.primaryAction.lastActionTime >= this.actionCooldowns.primaryAction.cooldownTime;
    }

    // Method to perform an action (e.g., deploy unit)
    ProduceFoodOnCooldown() {
      if (this.isCooldownExpired()) {
          //STRUCTURE FOOD PRODUCTION
          this.contents.forEach(char => {
            //for each player inside structure produce food
            //PRODUCE FOOD ON COOLDOWN
            this.storage.food += 1;
          });

          // Update the last action timestamp
          this.lastActionTime = Date.now();
      } else {
          //console.log("Action is on cooldown. Wait a bit.");
      }
    }

  }
  