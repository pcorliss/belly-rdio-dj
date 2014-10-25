$(function() {
  var socket = io();

  $('#start1').on('click', function(){
    rdio.play(window.tracks[0].id);
    $("#track1 > .album").removeClass('paused');
  });

  $('#stop1').on('click', function(){
    rdio.stop();
    $("#track1 > .album").addClass('paused');
  });

  $('#start2').on('click', function(){
    socket.emit('follower', {cmd: 'start', song: window.tracks[1].id});
    $("#track2 > .album").removeClass('paused');
  });

  $('#stop2').on('click', function(){
    socket.emit('follower', {cmd: 'stop'});
    $("#track2 > .album").addClass('paused');
  });

  var emitVol = function(e) {
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
    socket.emit('follower', {cmd: 'vol', vol: $(e.target).val() / 100});
  });

  var ajax_search = function(req, resp) {
    $.ajax({
      url: "/track_search_proxy",
      data: { term: req.term },
      success: function( data ) {
        var results = JSON.parse(data).data;
        var parsed = $.map(results, function(result){
          return {
            icon: result.icon,
            name: result.name,
            id: result.id,
            value: result.name
          }
        });
        resp(parsed);
      }
    });
  };

  var setTrack = function(id, track) {
    if(window.tracks === undefined){
      window.tracks = [];
    }
    window.tracks[id - 1] = track;
    $( "#track" + id + "_lookup" ).val(track.name);
    $( "#track" + id + " > .album" ).attr('src', track.icon);
  };

  setTrack(1, {
    id: 't7695718',
    icon: "http://img00.cdn2-rdio.com/album/1/7/0/000000000003a071/square-200.jpg",
    name: "Don't Stop Believin'"
  });

  setTrack(2, {
    id: 't2888593',
    icon: "http://rdio3img-a.akamaihd.net/album/4/f/f/000000000049dff4/1/square-200.jpg",
    name: "More Than a Feeling"
  });

  // TODO need to clear the val on focus
  $(".lookup").autocomplete({
    minLength: 4,
    source: ajax_search,
    select: function( e, ui ) {
      var track_id = $(e.target).data('track');
      console.log("Track:", track_id);
      setTrack(track_id, ui.item);
      return ui.item.name
    }
  }).data("ui-autocomplete")._renderItem = function (ul, item) {
    return $("<li />")
      .data("item.autocomplete", item)
      .append("<a><img src='" + item.icon + "' />" + item.name + "</a>")
      .appendTo(ul);
  };
});
