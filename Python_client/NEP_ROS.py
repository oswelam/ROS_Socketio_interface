import nep
import time
import socketio

# standard Python
sioClient = socketio.Client()
ip_port = 'http://localhost:9090'

server_data = None

@sioClient.event
def connect():
    print('I connected on ' + ip_port)

@sioClient.on('data')
def on_message(data):
    print('I received a message!'+ data)
    server_data = data
    


if __name__ == "__main__":

#	ip = raw_input("Enter your ip : ") 
#	port = raw_input("Enter your port : ") 
#	sio.connect('http://' + ip + ':' + port)
	

	sioClient.connect(ip_port)

	node = nep.node('python_client', 'ROS')
	pub = node.new_pub('python_client',msg_type = "string")



	while True:
		# Here is your code ...
		#msg = {'message':'hello'}	# An example of message
		msg = "hello"
		pub.publish(msg)		# Send message

		time.sleep(1)
