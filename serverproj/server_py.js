var iopy = require("socket.io")(9090);
var serverpy = iopy.httpServer;

serverpy.on('listening', function () {

	console.log("eh ya python ya albby");
    //});
});



console.log('Ther server runs on http://127.0.0.1:' + 8080 + '/');
