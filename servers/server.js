var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var say = require('say');

io.on('connection', function(socket){
  console.log('a user connected');
  setTimeout(function() {
    say.speak('Alex', 'whats up, dog?');
  }, 10000);
});

io.on('disconnect', function(socket){
  console.log('a user disconnected');
});

http.listen(7777, function(){
  console.log('listening on *:7777');
});
