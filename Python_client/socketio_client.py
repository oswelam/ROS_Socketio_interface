import socketio

# standard Python
sio = socketio.Client()

@sio.event
def connect():
    print('I connected!')

@sio.on('data')
def on_message(data):
    print('I received a message!'+ data)

sio.connect('http://localhost:9090')

