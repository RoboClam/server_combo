const socketEvent = require('./socket_events');
module.exports = (socket) => {

    socket.on('secureConnect', () => {
        console.log("A new secure socket has been established...");
    });

    socket.on('end', function() {
        console.log('EOT (End Of Transmission)');
    });

    socket.on('error', (err) => {
        console.log("Socket error: " + err);
        socket.destroy();
    });
    
    socket.on('data', function(data) {
        console.log('Received: %d bytes', data.length);
        try{
            let parsed = JSON.parse(data);
            console.log(parsed);
            socketEvent(parsed);
        } catch(err) {
            console.log("Data not is json format" + err);
        }
    });
}