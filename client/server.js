var express = require('express');
var path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/'));

app.get( '*', ( req, res ) => {
    console.log( `${req.method} ${req.originalUrl} - ${req.ip}` );
    res.sendFile( path.join( __dirname + "/index.html" ) );
});

app.listen( PORT, () => {
    console.log( `Serving index.html on http://localhost:${PORT}` );
})