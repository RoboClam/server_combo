'use strict';

var tls = require('tls');
var fs = require('fs');

const CONF = require("./config.json");
const PORT = CONF["tls-server-port"];
const HOST = CONF["tls-server-address"];

const socketCallbacks = require("./socket_callbacks");
const utils = require('./utils/utils');

const udpStart = require('./test_udp_server');

global.clients = [];
global.remoteUDP = {};

var options = {
    key: fs.readFileSync('.tls/private-key.pem'),
    cert: fs.readFileSync('.tls/public-cert.pem'),
    rejectUnauthorized: false //Only because we are using self signed certs!!!
};
const message = Buffer.from(`Jacob says hello from the udp server!`);

// var udpServer = new ();

setInterval( function() {
    if(remoteUDP.address) {
        udpStart.send(message, remoteUDP.port, remoteUDP.address, (err) => {
        });
    }
  }, 750);

var websocket = tls.createServer(options, function(socket) {
    socketCallbacks(socket);
    // socket.write("I am the websocket server sending you a message.");
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


