const dgram = require('dgram');
const DESTINATION_PORT = require("./config.json")['udp-server-port'];
const DESTINATION_ADDRESS = require("./config.json")['udp-server-address'];
const message = Buffer.from(`Jacob's warm seat...`);
const client = dgram.createSocket('udp4');
client.send(message, DESTINATION_PORT, DESTINATION_ADDRESS, (err) => {
  client.close();
});