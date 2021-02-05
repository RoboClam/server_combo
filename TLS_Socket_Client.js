'use strict';

var tls = require('tls');
var fs = require('fs');

const PORT = require("./config.json")["tls-server-port"];
const HOST = require("./config.json")["tls-server-address"];

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

});

client.on("data", function(data) {

    console.log('Received: %s [it is %d bytes long]',
        data.toString().replace(/(\n)/gm,""),
        data.length);

    // client.end();

});

client.on('close', function() {

    console.log("Connection closed");

});

client.on('error', function(error) {

    console.error(error);

    client.destroy();

});

client.on('ready', function() {
    console.log("client ready?");
});
client.on('session', function(session) {
    console.log("client session?");
})

client.write(JSON.stringify({'message': "I am the client sending you a message."}));
client.write(JSON.stringify({'event': 'jacob', 'data': "Jacob data"}));
