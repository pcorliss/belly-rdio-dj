$(function() {
  console.log("Leader");
  var socket = io();

  $('#start1').on('click', function(){
    rdio.play('t7695718');
  });

  $('#stop1').on('click', function(){
    rdio.stop();
  });

  $('#start2').on('click', function(){
    console.log("Emitting");
    socket.emit('follower', {cmd: 'start', song: 't2888593'});
  });

  $('#stop2').on('click', function(){
    console.log("Emitting");
    socket.emit('follower', {cmd: 'stop'});
  });

  var emitVol = function(e) {
    console.log("Emitting");
    socket.emit('follower', {cmd: 'vol', vol: $(e.target).slider('value') / 100});
  }

  var changeVol = function(e) {
    rdio.setVolume($(e.target).slider('value') / 100);
  }

  $('#vol1').slider({
    max: 100,
    value: 100,
    change: changeVol,
    slide: changeVol
  });

  $('#vol2').slider({
    max: 100,
    value: 100,
    change: emitVol,
    slide: emitVol
  });

  $('#vol').on('change', function(e){
    console.log("Emitting");
    socket.emit('follower', {cmd: 'vol', vol: $(e.target).val() / 100});
  });

  $( "#track1" ).autocomplete({
    minLength: 4,
    //source: "/track_search_proxy",
    source: function(req, resp){
      $.ajax({
        url: "/track_search_proxy",
        data: { term: req.term },
        success: function( data ) {
          var results = JSON.parse(data).data;
          var parsed = $.map(results, function(result){
            return {
              label: "<img src='"+ result.icon +"'>" + result.name,
              value: result.id
            }
          });
          resp(parsed);
        }
      });
    }

  });

});
