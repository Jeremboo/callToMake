var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var say = require('say'),

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
  console.log('a user connected');
  say.speak('Alex', 'whats up, dog?');
});

io.on('disconnect', function(socket){
  console.log('a user disconnected');
});

http.listen(7777, function(){
  console.log('listening on *:7777');
});
