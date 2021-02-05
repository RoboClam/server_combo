module.exports = (socket, conf) => {
    socket.on('jacob', (data) => {
        console.log("onJacob works!");
        console.log(data);
    });
    
    socket.on('data', function(data) {
        console.log('Received: %d bytes', data.length);
        try{
            let parsed = JSON.parse(data);
            console.log(parsed);
        } catch(err) {
            console.log("Data not is json format");
        }
    });
}