let network_kis;

function getConnected() {
  var x = getParameterByName('p')
  if(x ==null){
  network_kis = create_network(console, isReact=false);
  }
  else{
    network_kis = create_network_mecha(console, x, isReact=false);
    network_kis.onConnect().then(
      () => { this.timerID = setInterval( keep_updating_kis, 100) },
      () => {console.log("Failure") }
    );
  }
  network_kis.onConnect().then(
    () => { console.log("Connected") },
    () => {console.log("Failure") }
  );
}

function disconnect() {
  network_kis.disconnect();
}

  module.keep_updating_kis = keep_updating_kis
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
          for (let i = 3; i <= 5; i++) {
             for (let b = 0; b < 8; b++) {
               let index = (i * 8 + b) - 24;
               if (index > (0x10)) continue;
               let truth = !!(memory_ki[i] & (1 << b));
               set_used_ki(index, truth);
             }
           }
           for (let i = 0x14; i <= 0x1B; i++) {
             for (let b = 0; b < 8; b++) {
               let index = (i * 8 + b) - 0x14*8;
               if (index > (0x5D)) continue;
               let truth = !!(memory_ki[i] & (1 << b));
               set_loc_ki(index + 0x20, truth);
             }
           }
           module.auto_update_func()
     },
     (err) => { /* console.log("bleh" + err) */ })
   }

   module.auto_set_ki = (a,b) => {}
   module.set_ki = set_ki
    function set_ki(index, truth=True) {
      module.auto_set_ki(index, truth);
      //console.log("ki:" + index + ":" + truth);
    }
    module.auto_set_used_ki = (a,b) => {}
    module.set_used_ki = set_used_ki
    function set_used_ki(index, truth=True) {
      module.auto_set_used_ki(index, truth);
      //console.log("uki:" + index + ":" + truth);
    }
    module.auto_set_loc_ki = (a,b) => {}
    module.set_loc_ki = set_loc_ki
    function set_loc_ki(index, truth=True) {
      module.auto_set_loc_ki(index, truth);
      //console.log("lki:" + index + ":" + truth);
    }

    return module;
}
