$(function() {
  var initRdio = function(){
    window.rdio = $('#api').rdio($.cookie('playback'));
    $('#api').bind('ready.rdio', function(event, userInfo) {
      console.log("Rdio Ready!");
      if(window.location.href.indexOf('follower') == -1){
        $('#track1_connect').addClass('connected');
        $('.left > .controls > button').attr('disabled', false)
        $('.left > .controls > input').attr('disabled', false)
      } else {
        
      }
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
