'use strict';

var tls = require('tls');
var fs = require('fs');

const PORT = 1337;
const HOST = '127.0.0.1'

// Pass the certs to the server and let it know to process even unauthorized certs.
var options = {
    // key: fs.readFileSync('.tls/private-key.pem'),
    cert: fs.readFileSync('.tls/public-cert.pem'),
    rejectUnauthorized: false //Only because we are using self signed certs!!!
};

var client = tls.connect(PORT, HOST, options, function() {

    if (client.authorized) {
        console.log("Connection authorized by a Certificate Authority.");
    } else {
        console.log("Connection not authorized: " + client.authorizationError)
    }

    client.write("I am the client sending you a message.");

});

client.on("data", function(data) {

    console.log('Received: %s [it is %d bytes long]',
        data.toString().replace(/(\n)/gm,""),
        data.length);

    client.end();

});

client.on('close', function() {

    console.log("Connection closed");

});

client.on('error', function(error) {

    console.error(error);

    client.destroy();

});