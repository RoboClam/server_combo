'use strict';

var tls = require('tls');
var fs = require('fs');

const PORT = require("../config.json")["tls-server-port"];
const HOST = require("../config.json")["tls-server-address"];

var options = {
    key: fs.readFileSync('../.tls/private-key.pem'),
    cert: fs.readFileSync('../.tls/public-cert.pem')
};

var server = tls.createServer(options, function(socket) {

    socket.write("I am the server sending you a message.");

    socket.on('data', function(data) {

        console.log('Received: %s [it is %d bytes long]',
            data.toString().replace(/(\n)/gm,""),
            data.length);

    });

    socket.on('end', function() {

        console.log('EOT (End Of Transmission)');

    });

});

server.listen(PORT, HOST, function() {

    console.log("I'm listening at %s, on port %s", HOST, PORT);

});

server.on('error', function(error) {

    console.error(error);

    server.destroy();

});