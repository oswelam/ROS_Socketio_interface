var socket = require("socket.io");
var serverpy = require('http');

serverpy.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080, function () {
	console.log("eh ya python ya albbssy");
});

var io = socket(serverpy);

console.log('Ther server runs on http://127.0.0.1:' + 8080 + '/');
