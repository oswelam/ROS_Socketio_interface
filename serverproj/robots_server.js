var   express = require('express');
var   app = express();
var   serverweb = require('http').createServer(app);

serverweb.listen(8080,()=>{
    console.log("Succesful web");
});

var connected_web_sockets = [];
var seq_num = 0;

var   ioweb = require('socket.io')(serverweb);


app.use(express.static(__dirname +'/robot_index'));


// Websocket
ioweb.sockets.on('connection', function (socket) {

    console.log("web client connected");
    socket.on('client_type', function(data){
        connected_web_sockets.push({
		"Socket_ID" : socket.id,
		"type":data["type"],
		"name":data["type"] + seq_num
		 });
	console.log(connected_web_sockets[seq_num]["name"]);
	seq_num +=1;
    });   


    socket.on('chat', function(data){
        ioweb.sockets.emit('chat', data);
	iopy.sockets.emit('data', JSON.stringify(data));
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});


//----------------------------------------------------------------------------------------------------------


var serverpy = require("http").createServer();

serverpy.listen(9090,()=>{
    console.log("Succesful py");
});

var iopy = require("socket.io")(serverpy);

iopy.on('connect', function(socket) {
	
	console.log('sockety ' + socket.id);
	let data_disp = {hanlde: "", message: ""} ;
	socket.on('position', function(data){	
		data_disp.handle = "Robot_Pose";
		data_disp.message = "x: " + data.x_position + "y: " + data.y_position;   
		ioweb.sockets.emit('chat', data_disp);
		});


});

// Server Details
var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second
	console.log('Ther server runs on http://127.0.0.1:' + 8080 + '/');
}, delayInMilliseconds);

//console.log('Ther server runs on http://127.0.0.1:' + 8080 + '/');






