$(function() {

  console.log("Follower");
  var socket = io();

  socket.on('foo', function(msg){
    console.log("Foooo");
    console.log('message: ' + msg);
  });
});
