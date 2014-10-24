$(function() {
  var initRdio = function(){
    $('#api').rdio(m.data.token)
  };

  if (document.cookie.indexOf('playback') == -1){
    $.get('/get_token', function( data ) {
      initRdio();
    });
  } else {
    initRdio();
  }
});
