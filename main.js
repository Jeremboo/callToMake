var menubar = require('menubar');
var BrowserWindow  = require('browser-window');

var mb = menubar();

mb.on('ready', function ready () {
  console.log('app is ready')
  // var debugWindow = new BrowserWindow({
  //         width  : 995,
  //         height : 600,
  //         type   : 'desktop',
  //         frame  : true
  //       });
  mb.on('after-create-window', function () {
    // debugWindow.openDevTools()
    // debugWindow.loadURL('file://' + __dirname + '/index.html')
    mb.window.loadURL('file://' + __dirname + '/app/index.html')
  })
})
