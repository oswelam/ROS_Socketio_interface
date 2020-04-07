var   express = require('express');
var   app = express();
var   serverweb = require('http').createServer(app);

serverweb.listen(8080,()=>{
    console.log("Succesful web");
});

var   ioweb = require('socket.io')(serverweb);


app.use(express.static(__dirname +'/Public'));


// Websocket
ioweb.sockets.on('connection', function (socket) {

    console.log("web portal connected");


    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
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

});

// Server Details
var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second
	console.log('Ther server runs on http://127.0.0.1:' + 8080 + '/');
}, delayInMilliseconds);

//console.log('Ther server runs on http://127.0.0.1:' + 8080 + '/');






