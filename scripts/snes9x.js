function snes9x() {
    ki_map = {KeyItem.PACKAGE,KeyItem.SANDRUBY,KeyItem.LEGEND,KeyItem.BARON_KEY,KeyItem.TWINHARP,KeyItem.EARTH_CRYSTAL,KeyItem.MAGMA_KEY,
			  KeyItem.TOWER_KEY,KeyItem.HOOK, KeyItem.LUCA_KEY,KeyItem.DARKNESS_CRYSTAL,KeyItem.RAT_TAIL,KeyItem.ADAMANT,KeyItem.PAN,
			  KeyItem.SPOON,KeyItem.PINK_TAIL,KeyItem.CRYSTAL
			}
    const methods = {};

    let ws = null;
    let busy = false;

    methods.get_ws = get_ws;
    function get_ws() {
        return ws;
    }

    methods.clearBusy = clearBusy;
    function clearBusy() {
        busy = false;
    }
    
    methods.connect = connect;
    function connect(url) {
        return new Promise(function (resolve, reject) {
            if (busy) {
                reject("BUSY");
            }

            busy = true;
            var socket = new WebSocket(url);
            socket.onopen = function () {
                ws = socket;
                busy = false;
                resolve(socket);
            };

            socket.onerror = function (err) {
                busy = false;
                reject(err);
            };
            
            socket.addEventListener('message', function (event) {
                console.log('Message from server ', event.data);
                dat=JSON.parse(event.data)
                if(dat['metadata']){
                    flags=dat['metadata']['flags'].toUpperCase()
                    Objectives=dat['metadata']['objectives']
                    SetModes();
                    ApplyChecks();
                }
                else if(dat['KI']){
                    out=[]
                    for(let i = 0; i < 17; i++){
                        out[i] = (dat['KI'] >> i) & 1;
                    }
                    for(x in out){
                        if(out[x] == 1 && keyitems[ki_map[x]]==0){	
                            keyitems[ki_map[x]] = out[x];	
                        }	
                    }
                    for(let i = 0; i < 32; i++){
                        out[i] = (dat['Loc1'] >> i) & 1;
                        out[i+32] = (dat['Loc2'] >> i) & 1;
                    }
                    order = [14,1,5,19,4,2,15,16,7,57,3,8,6,11,13,17,18,9,10,12,20,21,23,27,22,25,24]
                    for(x in out){	
                        if(out[x] == 1 ){	
                          keyitemlocations[order[x]] = 2;	
                        }	
                    }
                    ApplyChecks();
                }
            });
        });
    }

    return methods;
}
