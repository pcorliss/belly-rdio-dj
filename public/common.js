$(function() {
  var initRdio = function(){
    rdio = $('#api').rdio($.cookie('playback'));
    $('#api').bind('ready.rdio', function(event, userInfo) {
      console.log("Rdio Ready!");
      
      //rdio.play('a997982');
    });
  };

  if (document.cookie.indexOf('playback') == -1){
    $.get('/get_token', function( data ) {
      initRdio();
    });
  } else {
    initRdio();
  }
});
