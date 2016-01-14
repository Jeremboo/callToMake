var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var say = require('say');
var RotaryPhone = require('./components/RotaryPhone');
var myEmitter = require('./components/MyEmitter');

var rotatyPhone = false;

io.on('connection', function(socket){
  console.log('a user connected');
  say.speak('Alex', 'whats up, dog?');
});

io.on('disconnect', function(socket){
  console.log('a user disconnected');
});

http.listen(7777, function(){
  console.log('listening on *:7777');

  rotatyPhone = new RotaryPhone();
});

// ##
// ROTARY PHONE EVENT
myEmitter.on('hangup', function() {
  console.log('emitter hang up');
});

myEmitter.on('pickup', function() {
  console.log('emitter pick up');
});

myEmitter.on('numComposed', function(num) {
  console.log('numero composed : ' + num);
});
