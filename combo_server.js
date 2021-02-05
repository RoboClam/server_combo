'use strict';

const udpServer = require('./udp/udpServer');
const secureWebsocket = require('./wss/secureWebsocket');

global.clients = [];
global.remoteUDP = {};

const message = Buffer.from(`Jacob says hello from the udp server!`);

setInterval( function() {
    if(remoteUDP.address) {
        udpServer.send(message, remoteUDP.port, remoteUDP.address, (err) => {
        });
    }
  }, 750);
