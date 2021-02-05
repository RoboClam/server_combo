'use strict';

var tls = require('tls');
var fs = require('fs');

const CONF = require("./config.json");
const PORT = CONF["tls-server-port"];
const HOST = CONF["tls-server-address"];

const socketCallbacks = require("./socket_callbacks");
const utils = require('./utils/utils');

var options = {
    key: fs.readFileSync('.tls/private-key.pem'),
    cert: fs.readFileSync('.tls/public-cert.pem'),
    rejectUnauthorized: false //Only because we are using self signed certs!!!
};

global.clients = [];

var websocket = tls.createServer(options, function(socket) {

    socketCallbacks(socket, CONF);

    // socket.write("I am the websocket server sending you a message.");

    socket.on('secureConnect', () => {
        console.log("A new secure socket has been established...");
    });

    socket.on('end', function() {
        console.log('EOT (End Of Transmission)');
    });

    socket.on('error', (err) => {
        console.log("Socket error: " + err);
        socket.destroy();
    });

});

websocket.on('secureConnection', (tlsSocket) => {
    console.log("A new secure connection has been established...");
    console.log(tlsSocket.remoteAddress + ":" + tlsSocket.remotePort);
    utils.addToClientList(tlsSocket.remoteAddress, tlsSocket.remotePort);
});

websocket.on('error', function(error) {
    console.error("Websocket Error: " + error);
    websocket.destroy();
});

websocket.listen(PORT, HOST, function() {
    console.log("I'm listening at %s, on port %s", HOST, PORT);
});


