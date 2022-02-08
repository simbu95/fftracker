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
                else if(dat['KI']){
                    out  = dat['KI'].toString(2)
                    order = [3,9,6,7,10,5,8,4,0,13,1,11,12,2,14,15,16]
                    KI = [out[i] for i in order]
                    for(x in KI){
                        if(KI[x] == 1 && keyitems[x]==0){	
                            keyitems[x] = KI[x];	
                        }	
                    }	
                    out1 = dat['Loc1'].toString(2)
                    out2 = dat['Loc2'].toString(2)
                    out = out1 + out2
                    order = [14,1,5,19,4,2,15,16,7,57,3,8,6,11,13,17,18,9,10,12,20,21,23,27,22,25,24]
                    Locs = [out[i] for i in order]
                    for(x in Locs){	
                        if(Locs[x] == 1 ){	
                          keyitemlocations[x] = 2;	
                        }	
                    }
                    ApplyChecks();
                }
            });
        });
    }

    return methods;
}
