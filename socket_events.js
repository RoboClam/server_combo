module.exports = (jsonData) => {
    switch(jsonData.event) {
        case 'jacob':
            console.log("Jacob data event successful!");
            jacobEvent();
            break;
        case 'position':
            console.log("Position data event successful!");
            break;
        
    }
}

function jacobEvent() {
    console.log("Jacob method");
}