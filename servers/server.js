var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var say = require('say');
var RotaryPhone = require('./components/RotaryPhone');
var myEmitter = require('./components/MyEmitter');

var port = 2345;
var rotatyPhone = false;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('connected');

  socket.on('voice', function(text) {
    console.log('mon texte :', text);
    say.speak(null, text);
  });

  // ##
  // ROTARY PHONE EVENT
  myEmitter.on('hangup', function() {
    console.log('emitter hang up');
    socket.emit('hangup');
  });
  myEmitter.on('pickup', function() {
    console.log('emitter pick up');
    socket.emit('pickup');
  });
  myEmitter.on('numComposed', function(num) {
    console.log('numero composed : ' + num);
    socket.emit('channel', num);
  });

  // ##
  // ERROR
  myEmitter.on("error", function(errorMessage) {
    socket.emit("error", errorMessage);
  });
});

io.on('disconnect', function(socket){
  console.log('a user disconnected');
});

http.listen(port, function(){
  console.log('Listening on : ' + port);

  rotatyPhone = new RotaryPhone();
});
