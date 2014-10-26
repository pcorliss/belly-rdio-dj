$(function() {

  console.log("Follower");
  var socket = io();
  var location = window.location.href.split('/');
  var id = location[location.length - 1];
  console.log("ID:", id);

  socket.on('connect', function (data) {
    socket.emit('join', id );
  });

  //socket.join(id);
  //window.socket = socket;
  //window.loc = location;
  //window.id = id;

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
});
