let network_kis;

function getConnected() {
  network_kis = create_network(console, isReact=false);
  network_kis.onConnect().then(
    () => { console.log("Connected") },
    () => {console.log("Failure") }
  );
}

function disconnect() {
  network_kis.disconnect();
}
