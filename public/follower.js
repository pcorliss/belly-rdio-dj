console.log("Follower");
var socket = io();
var loc = window.location.href.split('/');
var id = loc[loc.length - 1];
console.log("ID:", id);

window.enableControls = function(){
  socket.emit('follower', {to: id, cmd: 'connect'});
};

socket.on('connect', function (data) {
  socket.emit('join', id );
});

socket.on('follower', function(msg){
  console.log('message: ', msg);
  switch(msg.cmd) {
    case "start":
      rdio.play(msg.song);
      break;
    case "stop":
      rdio.stop();
      break;
    case "vol":
      rdio.setVolume(msg.vol);
      break;
  }
});
