$(function() {
  console.log("Leader");
  var socket = io();

  $('#foo').on('click', function(){
    console.log("Emitting");
    socket.emit('foo', 'click');
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
