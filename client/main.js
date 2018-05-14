var url = "ws://localhost:8000";
var websocket = new WebSocket( url );

websocket.onopen = () => {
    console.log( "Web Socket Opened" );
    websocket.send( "Hello Everyone!" );
};

websocket.onmessage = message => {
    $("#chat").append( `${message.data.toString()}<br/>` );
}

function sendMessage() {
    const data = $("#message").val();
    $("#message").val("");
    if ( data ) websocket.send( data );
}

$("#new-message").click( sendMessage );
// send the message on enter
$("#message").keydown( event => {
    if( event.keyCode === 13 ) sendMessage();
})