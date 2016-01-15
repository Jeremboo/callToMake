var menubar = require('menubar');
var BrowserWindow  = require('browser-window');

var mb = menubar({
  height: 800,
  width: 800
});

mb.on('ready', function ready () {
  console.log('app is ready')
  mb.on('after-create-window', function () {
    // debugWindow.openDevTools()
    // debugWindow.loadURL('file://' + __dirname + '/index.html')
    mb.window.loadURL('file://' + __dirname + '/app/index.html')
  })
})
