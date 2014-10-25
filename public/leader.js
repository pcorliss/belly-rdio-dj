$(function() {
  console.log("Leader");
  var socket = io();

  $('#start1').on('click', function(){
    rdio.play('t7695718');
    $("#track1 > .album").removeClass('paused');
  });

  $('#stop1').on('click', function(){
    rdio.stop();
    $("#track1 > .album").addClass('paused');
  });

  $('#start2').on('click', function(){
    console.log("Emitting");
    socket.emit('follower', {cmd: 'start', song: 't2888593'});
    $("#track2 > .album").removeClass('paused');
  });

  $('#stop2').on('click', function(){
    console.log("Emitting");
    socket.emit('follower', {cmd: 'stop'});
    $("#track2 > .album").addClass('paused');
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
    orientation: "vertical",
    animate: "fast",
    change: changeVol,
    slide: changeVol
  });

  $('#vol2').slider({
    max: 100,
    value: 100,
    orientation: "vertical",
    animate: "fast",
    change: emitVol,
    slide: emitVol
  });

  $('#vol').on('change', function(e){
    console.log("Emitting");
    socket.emit('follower', {cmd: 'vol', vol: $(e.target).val() / 100});
  });

  //$( "#track1" ).autocomplete({
    //minLength: 4,
    ////source: "/track_search_proxy",
    //source: function(req, resp){
      //$.ajax({
        //url: "/track_search_proxy",
        //data: { term: req.term },
        //success: function( data ) {
          //var results = JSON.parse(data).data;
          //var parsed = $.map(results, function(result){
            //return {
              //label: "<img src='"+ result.icon +"'>" + result.name,
              //value: result.id
            //}
          //});
          //resp(parsed);
        //}
      //});
    //}

  //});

});
