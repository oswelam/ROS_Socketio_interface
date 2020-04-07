import rospy
import time
import socketio
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
import json 
import yaml


# standard Python
sioClient = socketio.Client()
ip_port = 'http://localhost:9090'
start = False

#def callback(odometry):
    
#	pose = {"x_position":odometry.pose.pose.position.x, "y_position": odometry.pose.pose.position.y}

#	sioClient.emit('position', pose)
	 


server_data = None

@sioClient.event
def connect():
    print('I connected on ' + ip_port)

@sioClient.on('data')
def on_message(data):
    print('I received a message!')
    print(type(data))
    print(type(yaml.safe_load(data)))
    print(yaml.safe_load(data))
    #print(data)
   # print((json.loads(data.encode('utf-8'))))
    global start
    global server_data
    start = True
    server_data = yaml.safe_load(data)
    server_data['message'] = yaml.safe_load(server_data['message'])
    


if __name__ == "__main__":

#	ip = raw_input("Enter your ip : ") 
#	port = raw_input("Enter your port : ") 
#	sio.connect('http://' + ip + ':' + port)
	

	sioClient.connect(ip_port)


        ros_publisher = rospy.Publisher("/cmd_vel_mux/input/teleop", Twist)
	#ros_sub = rospy.Subscriber(/odom, Odometry, callback)

        rospy.init_node("python_client", anonymous = True)
		
	my_twist = Twist()
	my_twist.linear.z = 0
	my_twist.angular.x = 0
	my_twist.angular.y = 0
	my_twist.angular.z = 0

	while True:
		print('in the while')
		print(start)
		if start:
			print('in the start')
			print(server_data['message']['x'])
			print(server_data['message']['y'])
			for i in range(20):
				my_twist.linear.x = server_data['message']['x']
				my_twist.linear.y = server_data['message']['y']		
				ros_publisher.publish(my_twist)		# Send message
				rospy.sleep(0.1)

			
			my_odom = rospy.wait_for_message("/odom", Odometry)
			pose_x_y = {"x_position":my_odom.pose.pose.position.x, "y_position": my_odom.pose.pose.position.y}
			sioClient.emit('position', pose_x_y)
			start = False
		time.sleep(1)
