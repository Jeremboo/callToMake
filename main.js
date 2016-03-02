var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3334;

var exec = require('child_process').exec;

var menubar = require('menubar');
var BrowserWindow  = require('browser-window');

// ##
// START APP
var mb = menubar({
  height: 500,
  width: 300
});

mb.on('ready', function() {
  console.log('app is ready');
  mb.showWindow();
});

mb.on('after-create-window', function () {
  mb.window.loadURL('file://' + __dirname + '/app/index.html')
});


// ##
// NODE SERVE FOR DESCKTOP
io.on('connection', function(socket){
  console.log('connected to the App');

  socket.on('sleepnow', function(socket){
    console.log("sleepnow");
    exec("pmset sleepnow");
  });

  socket.on('toggleWifi', function(active){
    console.log('toogleWifi to : ' + active);
    if(active){
      exec("networksetup -setairportpower en0 on");
    } else {
      exec("networksetup -setairportpower en0 off");
    }
  });

  socket.on('screenCapture', function(socket){
    exec("screencapture -P callToMake_capture.jpg");
  });

  socket.on('imagesnap', function(socket){
    console.log("imageSnap");
    exec("imagesnap & open calltomake_snapshot.jpg");
  });


  socket.on('openApp', function(name){
    console.log("Open "+name);
    exec('open -a "' + name +'"');
  });

  socket.on('channel', function(channel){
    console.log('test');
    mb.showWindow();
  });

  socket.emit('connected');
});


http.listen(port, function(){
  console.log('Listening on : ' + port);
});
