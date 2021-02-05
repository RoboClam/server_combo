const dgram = require('dgram');

const DESTINATION_PORT = require("./config.json")['udp-server-port'];
const DESTINATION_ADDRESS = require("./config.json")['udp-server-address'];
const LOCAL_PORT = require("./config.json")['udp-client-port'];
const LOCAL_ADDRESS = require("./config.json")['udp-client-address'];

const message = Buffer.from(`Jacob says hello from the client!`);

const client = dgram.createSocket('udp4');

client.bind(LOCAL_PORT, LOCAL_ADDRESS, () => {
  console.log("bind callback");
});

// client.connect(DESTINATION_PORT, DESTINATION_ADDRESS, () => {
//   console.log("client connecting...");
// });

client.on('connect', () => {
  console.log("client is connected");
})

client.on('message', (msg, rinfo) => {
  console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

client.on('listening', () => {
  console.log(`client listening...`);
});

setInterval( function() {
  client.send(message, DESTINATION_PORT, DESTINATION_ADDRESS, (err) => {
  });
}, 500);