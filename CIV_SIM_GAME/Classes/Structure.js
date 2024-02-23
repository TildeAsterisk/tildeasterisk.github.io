class Structure extends Character{
    constructor(name, statsObj){
      //Call base constructure with super()
      super(name,statsObj);
      //set type
      this.type           = "Structure";
      this.capacity       = statsObj.capacity;
      this.indoorCount    = 0;
      this.contents       = [];
    }
    UpdatePosition(){
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
    }
    DrawCharacter(){
      //Check if user selected.
      if (PlayerObj.selected==this){
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.position[0]-(this.size[0]/2)-(this.size[0]*0.1), this.position[1]-(this.size[1]/2)-(this.size[1]*0.1), this.size[0]*1.2, this.size[1]*1.2);
  
        //Change (Size)
        //this.size=[ this.defaultSize[0]*1.5 , this.defaultSize[1]*1.5 ];
      }
  
      ctx.fillStyle = "grey";
      ctx.fillRect(this.position[0]-(this.size[0]/2), this.position[1]-(this.size[1]/2), this.size[0], this.size[1]);
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
  }
  