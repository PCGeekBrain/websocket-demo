const { app, BrowserWindow, Menu } = require( 'electron' );

const template = require( './menu' );

const express = require('../client/server');
const wsserver = require('../server/server');

// define the window in the global scope to prevent garbage collection
let win;

// const menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);

function createWindow() {
    // create a browser window
    win = new BrowserWindow({ width: 800, height: 600, autoHideMenuBar: true });

    // load the client side app
    win.loadFile( __dirname + '/../client/index.html' );

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // when the window closes, garbage collect the old window
    win.on( 'closed', () => { win = null } );
}

// render the window when the app is opened
app.on( 'ready', createWindow );

// do not quit on MacOS
app.on( 'window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        wsserver.close();
        express.close();
    }
})

// reopen on macos
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})