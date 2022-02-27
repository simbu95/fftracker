let network_kis = null;
let network_objectives = null;
let timerID = null;
let objectivesTimerID = null;

let ki_map = {
  0x00: KeyItem.PACKAGE,
  0x01: KeyItem.SANDRUBY,
  0x02: KeyItem.LEGEND,
  0x03: KeyItem.BARON_KEY,
  0x04: KeyItem.TWINHARP,
  0x05: KeyItem.EARTH_CRYSTAL,
  0x06: KeyItem.MAGMA_KEY,
  0x07: KeyItem.TOWER_KEY,
  0x08: KeyItem.HOOK,
  0x09: KeyItem.LUCA_KEY,
  0x0A: KeyItem.DARKNESS_CRYSTAL,
  0x0B: KeyItem.RAT_TAIL,
  0x0C: KeyItem.ADAMANT,
  0x0D: KeyItem.PAN,
  0x0E: KeyItem.SPOON,
  0x0F: KeyItem.PINK_TAIL,
  0x10: KeyItem.CRYSTAL
}

let ki_location_map = {
  0x002E: KeyItemCheck.ADAMANT,
  0x0021: KeyItemCheck.ANTLION,
  0x0025: KeyItemCheck.BARON_KING,
  0x0024: KeyItemCheck.BARON_INN,
  0x0033: KeyItemCheck.BARON_ODIN,
  0x0022: KeyItemCheck.FABUL_DEFEND,
  0x002F: KeyItemCheck.FABUL_SYLPH,
  0x0030: KeyItemCheck.FABUL_PAN,
  0x0027: KeyItemCheck.MAGNES,
  0x0059: KeyItemCheck.MIST,
  0x0023: KeyItemCheck.MT_ORDEALS,
  0x0026: KeyItemCheck.TOROIA,
  0x0028: KeyItemCheck.TOWER_ZOT,
  0x002B: KeyItemCheck.DWARF,
  0x002D: KeyItemCheck.FEY_CHEST,
  0x0031: KeyItemCheck.FEY_ASURA,
  0x0032: KeyItemCheck.FEY_LEVIATHAN,
  0x0029: KeyItemCheck.LOWER_BABIL_BOSS,
  0x002A: KeyItemCheck.LOWER_BABIL_CANNON,
  0x002C: KeyItemCheck.SEALED_CAVE,
  0x0034: KeyItemCheck.SYLPH_CAVE,
  0x0035: KeyItemCheck.BAHAMUT,
  0x0037: KeyItemCheck.MOON_CRYSTAL,
  0x0036: KeyItemCheck.MOON_MURASAME,
  0x003B: KeyItemCheck.MOON_MASAMUNE,
  0x0039: KeyItemCheck.MOON_RIBBON,
  0x003A: KeyItemCheck.MOON_RIBBON,
  0x0038: KeyItemCheck.MOON_WHITE
}

function getConnected() {
  var x = getParameterByName('p');
  if(x ==null){
    network_kis = create_network(console, isReact=false);
    network_kis.onConnect().then(
      () => { console.log("Connected") },
      () => {console.log("Failure") }
    );
  }
  else{
    autotrackingport=x;
    network_kis = create_network_mecha(console, x, isReact=false);
    network_kis.onConnect().then(
      () => { timerID = setInterval( keep_updating_kis, 5000) },
      () => {console.log("Failure") }
    );
    network_characters = create_network_mecha(console, x, isReact=false);
    network_kis.onConnect().then(
      () => { timerID = setInterval( keep_updating_characters, 7000) },
      () => {console.log("Failure") }
    );
    network_objectives = create_network_mecha(console, x, isReact=false);
    network_objectives.onConnect().then(
      () => { setTimeout(get_objectives_from_metadata, 1000);
              objectiveTimerID = setInterval( keep_updating_objectives, 5000) },
      () => {console.log("Failure on objectives connection") }
    );
  }
  
}

function disconnect() {
    if (timerID) {
      clearInterval(timerID);
    }
    if (objectiveTimerID) {
      clearInterval(objectiveTimerID);
    }
    network_kis.disconnect();
    network_objective.disconnect();
  }

function keep_updating_characters(){
  network_objectives.snes.send(JSON.stringify({
       "Opcode" : "GetAddress",
       "Space" : "SNES",
       "Operands": ["0xF51000", '140']
    })).then(
      (event) => {
       return event.data.arrayBuffer()
     }).then(
    (partydata) => {
      let x = new Uint8Array(partydata);
      let party=[]
      let order = [0,1,2,3,4,5,6,7,8,0,9,2,10,11];
      partymembers = [-1, -1, -1, -1, -1];
      
      ApplyChecks();
      for( let i = 0; i<5;i++){
        if(x[0x40*i]!=0){
          partymembers[i]=order[x[0x40*i+1]&0x0f]
        }
      }
      partymembers.sort()
      partymembers.reverse()
      ApplyChecks();
       return;
   });
}
      
function get_objectives_from_metadata() {
    network_objectives.snes.send(JSON.stringify({
       "Opcode" : "GetAddress",
       "Space" : "SNES",
       "Operands": ["0x1FF000", '400']
    })).then(
      (event) => {
       return event.data.arrayBuffer()
     }).then(
     (metadata) => {
       let x = new Uint8Array(metadata);
       let bytes = x[0] + 256 * x[1];
       let meta = new TextDecoder("utf-8").decode(x.slice(4,bytes+4));
       Objectives = JSON.parse(meta).objectives;
       flags = JSON.parse(meta).flags.toUpperCase();
       SetModes();
       ApplyChecks();
       return;
   });
}

function keep_updating_objectives() {
    if (!objectives) {
      return;
    }
    let count = objectives.length.toString(16);
    network_objectives.snes.send(JSON.stringify({
       "Opcode" : "GetAddress",
       "Space" : "SNES",
       "Operands": ["0xF51520", count]
    })).then(
      (event) => {
       return event.data.arrayBuffer()
     }).then(
       (ab) => {
         let objectiveFlags = new Uint8Array(ab);
         for (let i=0; i < Objectives.length; i++) {
            set_objective(i, !!objectiveFlags[i]);
         }
         ApplyChecks();
       },
       (err) => { /* console.log("bleh" + err) */ });
  }

function set_objective(index, truth=True) {
  if(!Objectives)
    return;
  let x = objectivenames.indexOf(Objectives[index])
  if (objectives[x] === 0 && truth){
    checkOffObjective(x);
  }
  else if (objectives[x] === 1 && !truth){
    checkOffObjective(x);
  }
}

function keep_updating_kis() {
  network_kis.snes.send(JSON.stringify({
     "Opcode" : "GetAddress",
     "Space" : "SNES",
     "Operands": ["0xF51500", "20"]
  })).then(
    (event_ki) => {
     return event_ki.data.arrayBuffer()
   }).then(
     (ab_ki) => {
       let memory_ki = new Uint8Array(ab_ki);
       for (let i = 0; i <= 2; i++) {
          for (let b = 0; b < 8; b++) {
            let index = (i * 8 + b);
            if (index > 0x10) continue;
            let truth = !!(memory_ki[i] & (1 << b));
            set_ki(index, truth);
          }
        }
        /* for (let i = 3; i <= 5; i++) {
           for (let b = 0; b < 8; b++) {
             let index = (i * 8 + b) - 24;
             if (index > (0x10)) continue;
             let truth = !!(memory_ki[i] & (1 << b));
             set_used_ki(index, truth);
           }
         } */
         for (let i = 0x14; i <= 0x1B; i++) {
           for (let b = 0; b < 8; b++) {
             let index = (i * 8 + b) - 0x14*8;
             if (index > (0x5D)) continue;
             let truth = !!(memory_ki[i] & (1 << b));
             set_loc_ki(index + 0x20, truth);
           }
         }
         ApplyChecks();
   },
   (err) => { /* console.log("bleh" + err) */ })
  }

function set_ki(index, truth=True) {
  keyitems[ki_map[index]] = truth;
}

function set_loc_ki(index, truth=True) {
  if (ki_location_map[index] !== undefined) {
      if (keyitemlocations[ki_location_map[index]] == 1 && truth) {
          SwapKeyItemLocation(ki_location_map[index])
      }
  }
}

