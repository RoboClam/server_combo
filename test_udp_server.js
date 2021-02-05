const dgram = require("dgram");
const PORT = require("./config.json")['udp-server-port'];
const ADDRESS = require("./config.json")['udp-server-address'];
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening on: ${address.address}:${address.port}`);
});

server.bind(PORT);