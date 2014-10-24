var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var request = require('request');

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

var getToken = function(req, cb){
  request.post({
    url: 'http://rdio-service.herokuapp.com/playback_tokens',
    form: { 'domain': req.hostname },
  }
  , function(err, response, body){
      if (!err && response.statusCode == 201) {
        var info = JSON.parse(body);
        cb(info.data.playback_token);
      }
    }
  );
};

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Need a unique way of generating URLs
app.get('/follower', function(req, res){
  res.sendFile(path.join(__dirname, 'follower.html'));
});

app.get('/get_token', function(req, res){
  getToken(req, function(token) {
    res.cookie('playback', token, { maxAge: 86400000, httpOnly: false });
    res.send({token: token});
  });
});

// This would be easier if the API used JSONP
app.get('/track_search_proxy', function(req, res){
  request(
    'http://rdio-service.herokuapp.com/search?type=track&q=' + req.query.term,
    function (error, response, body) {
      res.send(body)
    }
  );
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('foo', function(msg){
    socket.broadcast.emit('foo', msg);
  });
});
