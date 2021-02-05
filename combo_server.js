'use strict';

var tls = require('tls');
var fs = require('fs');

const PORT = require("./config.json")["tls-server-port"];
const HOST = require("./config.json")["tls-server-address"];

var options = {
    key: fs.readFileSync('.tls/private-key.pem'),
    cert: fs.readFileSync('.tls/public-cert.pem'),
    rejectUnauthorized: false //Only because we are using self signed certs!!!
};

var server = tls.createServer(options, function(socket) {

    socket.write("I am the websocket server sending you a message.");

    socket.on('secureConnect', () => {
        console.log("A new secure socket has been established...");
    })

    socket.on('data', function(data) {
        console.log('Received: %s [it is %d bytes long]',
            data.toString().replace(/(\n)/gm,""),
            data.length);
    });

    socket.on('end', function() {
        console.log('EOT (End Of Transmission)');
    });

    socket.on('error', (err) => {
        console.log("Socket error: " + err);
        socket.destroy();
    });

});

server.listen(PORT, HOST, function() {
    console.log("I'm listening at %s, on port %s", HOST, PORT);
});

server.on('secureConnection', (tlsSocket) => {
    console.log("A new secure connection has been established...");
    console.log(tlsSocket.remoteAddress + ":" + tlsSocket.remotePort);

})

server.on('error', function(error) {
    console.error(error);
    server.destroy();
});

