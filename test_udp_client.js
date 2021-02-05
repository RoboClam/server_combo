const dgram = require('dgram');
const message = Buffer.from(`Jacob's warm seat...`);
const client = dgram.createSocket('udp4');
client.send(message, 41234, '127.0.0.1', (err) => {
  client.close();
});