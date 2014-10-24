$(function() {

  console.log("Follower");
  var socket = io();

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
