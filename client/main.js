const url = "ws://localhost:8000";
const websocket = new WebSocket( url );

const message = document.querySelector("#message");
const chat = document.querySelector("#chat");

// handle the socket opening
websocket.onopen = () => {
    console.log( "Web Socket Opened" );
    websocket.send( "Hello Everyone!" );
};

// append the message to the UI
websocket.onmessage = message => {
    chat.innerText += message.data.toString();
    chat.innerHTML += '<br/>';
}

// and send a message to the client
function sendMessage() {
    const data = message.value;
    if ( data ) {
        message.value = "";
        websocket.send( data );
    }
}

// send a message when the send button is pressed
document.querySelector("#new-message").addEventListener(
    'click', sendMessage
);

// support pressing enter to send
message.onkeydown = event => {
    if (event.keyCode === 13)
        sendMessage();
}
