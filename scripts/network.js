function create_network(parent, isReact = true) {
    const snes = new snes9x();

    let socket = null;
    let disconnecting = true;
    const device = initial_device();

    updateState();

    function initial_device() {
        return {
            state: 0,
            app_version: '',
            list: [],
            attached: -1, // Index of attached
        };
    }

    function updateState() {
        if (isReact) {
          parent.setState(_.cloneDeep(device));
        }
    }

    function socket_onclose() {
        parent.log('Connection closed');
        snes.clearBusy();

        if (device.state !== 0) {
            setTimeout(onConnect, 1000);
            parent.log('Trying to reconnect');
        }

        Object.assign(device, initial_device());
        updateState();
    }

    async function onConnect() {
        disconnecting = false;
        try {

            socket = await snes.connect('ws://localhost:8765');
            socket.onclose = socket_onclose;

            parent.log('Connected to websocket');
            device.state = 1;
            updateState();

        }
        catch (error) {
            parent.log(`Could not connect to the websocket, retrying: ${error}`);
            device.state = 0;
            device.attached = -1;
            updateState();
            setTimeout(onConnect, 2000);
        }
    }

    async function disconnect() {
      disconnecting = true;
      device.state = 0;
      device.attached = -1;
      socket.close();
      updateState();
    }

    return { onConnect , disconnect,  snes };
}
