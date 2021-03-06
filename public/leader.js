window.enableControls = function(track){
  var side = track == 2 ? '.right' : '.left';
  $(side + ' > .controls > .connect-light').addClass('connected');
  $(side + ' > .controls > button').attr('disabled', false)
  $(side + ' > .controls > input').attr('disabled', false)
};

$(function() {
  var room = Math.random().toString(36).substr(2, 4);

  var socket = io();
  socket.on('connect', function (data) {
    socket.emit('join', room );
  });

  socket.on('follower', function(msg){
    console.log('message: ', msg);
    switch(msg.cmd) {
      case "connect":
        console.log("Connection!");
        enableControls(2);
        break;
    }
  });

  var play = function(id){
    if(id == 1) {
      rdio.play(window.tracks[0].id);
      rdio.playing = true;
    } else {
      socket.emit('follower', {to: room, cmd: 'start', song: window.tracks[1].id});
    }
    $("#track" + id + " > .album").removeClass('paused');
  };

  var stop = function(id){
    if(id == 1 && window.rdio && rdio.playing) {
      rdio.stop();
      rdio.playing = false;
    }
    if(id == 2) {
      socket.emit('follower', {to: room, cmd: 'stop'});
    }
    $("#track" + id + " > .album").addClass('paused');
  };

  $('.start').on('click', function(){
    var id = $(this).data('track');
    play(id);
  });

  $('.stop').on('click', function(){
    var id = $(this).data('track');
    stop(id);
  });

  var changeVol = function(e) {
    var target = $(e.target)
    var id = target.data('track');

    if(id == 1){
      rdio.setVolume(target.slider('value') / 100);
    } else {
      socket.emit('follower', {cmd: 'vol', to: room, vol: target.slider('value') / 100});
    }
  }

  $('.vol').slider({
    max: 100,
    value: 100,
    orientation: "vertical",
    animate: "fast",
    change: changeVol,
    slide: changeVol
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
    stop(id);
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

  var settings = {
    minLength: 4,
    source: ajax_search,
    select: function( e, ui ) {
      var track_id = $(e.target).data('track');
      console.log("Track:", track_id);
      setTrack(track_id, ui.item);
      return ui.item.name
    }
  };

  var renderItem = function (ul, item) {
    return $("<li />")
      .data("item.autocomplete", item)
      .append("<a><img src='" + item.icon + "' />" + item.name + "</a>")
      .appendTo(ul);
  };

  $(".lookup").each(function () {
    $(this).autocomplete(settings)
      .data("ui-autocomplete")._renderItem = renderItem;
  });

  var follower = window.location.href + 'follower/' + room;
  var link = $('<a>')
    .attr('href', follower)
    .text(follower);
  $('.connect').append(link);
});
