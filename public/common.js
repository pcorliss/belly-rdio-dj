$(function() {
  var initRdio = function(){
    window.rdio = $('#api').rdio($.cookie('playback'));
    $('#api').bind('ready.rdio', function(event, userInfo) {
      console.log("Rdio Ready!");
      window.enableControls();
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
