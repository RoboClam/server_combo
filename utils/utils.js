module.exports = {
    addToClientList(address, port) {
        clients.push({'address': address, 'port': port});
        console.log(clients);
    }
}