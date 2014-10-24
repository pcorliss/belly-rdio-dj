$(function() {
  console.log("Leader");
  var socket = io();

  $('#foo').on('click', function(){
    console.log("Emitting");
    socket.emit('foo', 'click');
  });

});
