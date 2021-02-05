const dgram = require("dgram");
const PORT = require("./config.json")['udp-server-port'];
const ADDRESS = require("./config.json")['udp-server-address'];
const server = dgram.createSocket('udp4');

const message = Buffer.from(`Jacob says hello from the server!`);
let remote;

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    remote = {"address": rinfo.address, "port":rinfo.port};
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening on: ${address.address}:${address.port}`);
});

server.bind(PORT);


setInterval( function() {
    if(remote.address) {
        server.send(message, remote.port, remote.address, (err) => {
        });
    }
  }, 750);