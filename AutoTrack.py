import asyncio
import websockets
import json
import threading
import socketserver

connected = set()
globe = {}

async def handle_client(reader, writer):
    request = None
    global globe
    global connected
    while request != 'quit':
        request = (await reader.readline()).decode('utf8')
        print(request)
        x=json.loads(request)
        print(json.dumps(x, sort_keys=True, indent=4))
        if 'metadata' in x:
            globe=x
        for ws in connected:
            try:
                await ws.send(json.dumps(x, sort_keys=True, indent=4))
            except:
                print("Error, a connection was dropped")
    writer.close()

async def run_server():
    server = await asyncio.start_server(handle_client, 'localhost', 54321)
    async with server:
        await server.serve_forever()

async def handler(websocket, path):
    global connected
    global globe
    connected.add(websocket)
    try:
        await websocket.send(json.dumps(globe, sort_keys=True, indent=4))
        while True:
            name = await websocket.recv()
            print("< {}".format(name))
            
    except:
        connected.remove(websocket)
        
def Thread1():
    asyncio.run(run_server())
    

x = threading.Thread(target=Thread1)
x.start()

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

start_server = websockets.serve(handler, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
