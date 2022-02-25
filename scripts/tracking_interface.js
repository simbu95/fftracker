let network_kis;

function getConnected() {
  var x = getParameterByName('p')
  if(x ==null){
  network_kis = create_network(console, isReact=false);
  }
  else{
    network_kis = create_network_mecha(console, x, isReact=false);
  }
  network_kis.onConnect().then(
    () => { console.log("Connected") },
    () => {console.log("Failure") }
  );
}

function disconnect() {
  network_kis.disconnect();
}
