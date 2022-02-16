function snes9x() {
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
                else if(dat['KI']!=undefined){
                    out=[]
                    for(let i = 0; i < 17; i++){
                        out[i] = (dat['KI'] >> i) & 1;
                    }
                    order = [3,9,6,7,10,5,8,4,0,13,1,11,12,2,14,15,16]
                    for(x in out){
                        if(out[order[x]] == 1 && keyitems[x]==0){	
                            keyitems[x] = out[order[x]];	
                        }	
                    }
                    for(let i = 0; i < 32; i++){
                        out[i] = (dat['Loc1'] >> i) & 1;
                        out[i+32] = (dat['Loc2'] >> i) & 1;
                    }
                    order = [14,1,5,19,4,2,15,16,7,57,3,8,6,11,13,17,18,9,10,12,20,21,23,27,22,25,24]
                    for(x in out){	
                        if(out[order[x]] == 1 ){	
                          keyitemlocations[x] = 2;	
                        }	
                    }
                    ApplyChecks();
                }
                else if(dat['P']!=undefined){
                    party=dat['P'];
                    members=party.split(",");
                    order = [0,1,2,3,4,5,6,7,8,0,9,2,10,11];
                    partymembers= {-1, -1, -1, -1, -1};
                    for(p in members){
                        partymembers[p]=parseInt(order[members[p]]);
                    }
                    ApplyChecks();
                }
                else if(dat['T']!=undefined){
                    if(dat['T'] !=0 && ! timerStarted){
                        timerSecondsElapsed=3500;
                        StartTimer();
                    }
                    else{
                        PauseTimer();
                    }
                }
            });
        });
    }

    return methods;
}
