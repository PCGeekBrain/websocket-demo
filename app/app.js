const { app, BrowserWindow } = require( 'electron' );

require('../client/server');
require('../server/server');

// define the window in the global scope to prevent garbage collection
let win;

function createWindow() {
    // create a browser window
    win = new BrowserWindow({ width: 800, height: 600 })

    // load the client side app
    win.loadURL( 'http://127.0.0.1:3000' )

    // when the window closes, garbage collect the old window
    win.on( 'closed', () => { win = null } );
}

// render the window when the app is opened
app.on( 'ready', createWindow );

// do not quit on MacOS
app.on( 'window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// reopen on macos
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})