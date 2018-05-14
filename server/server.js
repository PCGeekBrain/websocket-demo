const WebSocket = require('ws');
const rug = require('random-username-generator');
const PORT = process.env.PORT || 8000;

const server = new WebSocket.Server({
    port: PORT
});

// Brodcast data to all users
server.brodcast = data => {
    server.clients.forEach( client => {
        if ( client.readyState === WebSocket.OPEN )
            client.send( data );
    })
}

server.on( 'connection', socket => {
    socket.on( 'message', data => {
        server.brodcast( `${rug.generate()}: ${data}` );
    });

    socket.on( 'close', () => {
        console.log( "A user has disconnected" )
    })
})