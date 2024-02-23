
class Player{
    constructor(){
      this.selected = undefined;
      this.building = false;
      this.mode     = undefined;
    }
  
    ChangeSelectedUnit(unit){
      if(unit === undefined){
          this.selected = undefined;
          gameTxtMsg1Elem.innerHTML="Nothing selected";
          return;
      }
    
      this.selected = unit;
      //unit.selected=true;
      this.UpdateUnitStatsHTML();
    }
  
    UpdateUnitStatsHTML(){
      //console.log(type);
      switch (this.selected.type){
        case "Structure":
          gameTxtMsg1Elem.innerHTML=`Selected: ${this.selected.name} ${this.selected.text}<br>
          HP : ${this.selected.health}<br>
          DEF: ${this.selected.defense}<br>
          Contains: ${this.selected.indoorCount} Units`;
          break;
        default:
          //console.log(type);
          if(!this.selected.focus){
            gameTxtMsg1Elem.innerHTML=`Selected: ${this.selected.name} ${this.selected.text}<br>
            HP : ${this.selected.health}<br>
            ATK: ${this.selected.attack}<br>
            DEF: ${this.selected.defense}`;
          }
          else{
            gameTxtMsg1Elem.innerHTML=`Selected: ${this.selected.name} ${this.selected.text}<br>
            HP : ${this.selected.health}<br>
            ATK: ${this.selected.attack}<br>
            DEF: ${this.selected.defense}<br>
            FCS: ${this.selected.focus.name}`;
          }
          break;
      }
    }
    
    GenerateControlPanelHTML(){
      //controlPanelElem.innerHTML = controlPanelElem.innerHTML+" <button> </button> ";
      var playerModeButtonsHTML = `
      <button onclick="UpdatePlayerMode('Inspecting')">    Select<br>&nbsp;&nbsp;Unit&nbsp;&nbsp;&nbsp;</button>
      <button onclick="UpdatePlayerMode('Spawn Character')">Spawn<br>Character</button>
      `;
      var buildMenuHTML=`<br/>
      <label for="build-selection">Item List:</label>
      <select id="build-selection" name="build-selection">
          <option value="Wall"    >Wall</option>
          <option value="Shelter" >Shelter</option>
      </select>
      <button onclick="UpdatePlayerMode('Build Mode')">Build</button>
      `;
      var gameTxtElem=`<div id="GameTxtMsg1">Select Mode</div>`;
      var gameLogElem=`<div id="GameLog"><hr><i>Log</i><br></div>`;
      return playerModeButtonsHTML+buildMenuHTML+gameTxtElem+gameLogElem;
    }
  
  }
  