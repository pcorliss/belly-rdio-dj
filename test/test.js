var assert = require("assert");
var should = require('should');
var request = require('request');
var sinon = require('sinon');
var path = require('path');
var fs = require('fs');
var port = 3333;
process.env.PORT = port;

var testURL = function(path){
  return "http://localhost:" + port + path;
};

describe("Server", function(){
  before (function (done) {
    app = require('../index');
    done();
  });

  it('should exist', function (done) {
    should.exist(app);
    done();
  });

  it('should be listening at localhost:' + port, function (done) {
    request(testURL('/'), function (err, res, body) {
      res.statusCode.should.eql(200);
      done();
    });
  });

  describe("GET /get_token", function(){
    var expectedResponse = {
      "data":{
        "object_type":"playback_token",
        "playback_token":"GAlUTp5d_____3h4NWV0bXZiNThiNDRqOGVmOXQ3cG4zdWxvY2FsaG9zdPUeJNBhW50Z13n0Wo2szr8=",
        "domain":"localhost"
      }
    };

    before(function(done){
      sinon
        .stub(request, 'post')
        .yields(null, { statusCode: 201 }, JSON.stringify(expectedResponse));
      done();
    });

    after(function(done){
      request.post.restore();
      done();
    });

    it("makes a post request to belly's rdio-service", function(done){
      request(testURL('/get_token'), function (err, res, body) {
        request.post.called.should.be.equal(true);
        done();
      });
    });

    it('should return 200', function(done){
      request(testURL('/get_token'), function (err, res, body) {
        res.statusCode.should.eql(200);
        done();
      });
    });

    it('should set a playback cookie', function(done){
      request(testURL('/get_token'), function (err, res, body) {
        var expectedCookie = encodeURIComponent(expectedResponse.data.playback_token);
        res.headers['set-cookie'][0].indexOf('playback=' + expectedCookie).should.not.eql(-1);
        done();
      });
    });
  });

  describe("GET /track_search_proxy", function(){
    var expectedResponse = {
      "data":[{
        "object_type":"search_result",
        "id":"t2888593",
        "name":"More Than a Feeling",
        "url":"/artist/Boston/album/Greatest_Hits/track/More_Than_a_Feeling/",
        "length":31,
        "radio_id":"sr2888593",
        "type":"track",
        "icon":"http://img00.cdn2-rdio.com/album/2/7/1/000000000003a172/square-200.jpg"
      }]
    };

    before(function(done){
      sinon
        .stub(request, 'get')
        .yields(null, null, JSON.stringify(expectedResponse));
      done();
    });

    after(function(done){
      request.get.restore();
      done();
    });

    it("makes a get request to belly's rdio-service", function(done){
      request(testURL('/track_search_proxy'), function (err, res, body) {
        request.get.called.should.be.equal(true);
        done();
      });
    });

    it('should return 200', function(done){
      request(testURL('/track_search_proxy'), function (err, res, body) {
        res.statusCode.should.eql(200);
        done();
      });
    });

    it('should return the JSON response', function(done){
      request(testURL('/track_search_proxy'), function (err, res, body) {
        res.body.should.eql(JSON.stringify(expectedResponse));
        done();
      });
    });
  });

  describe("GET /follower/:id", function(){
    it('should return 200', function(done){
      request(testURL('/follower/asdf'), function (err, res, body) {
        res.statusCode.should.eql(200);
        done();
      });
    });

    it('should return the contents of follower.html', function(done){
      request(testURL('/follower/asdf'), function (err, res, body) {
        fs.readFile('follower.html', 'utf8', function (err, data) {
          body.should.eql(data);
          done();
        });
      });
    });
  });

  describe("GET /", function(){
    it('should return 200', function(done){
      request(testURL('/'), function (err, res, body) {
        res.statusCode.should.eql(200);
        done();
      });
    });

    it('should return the contents of index.html', function(done){
      request(testURL('/'), function (err, res, body) {
        fs.readFile('index.html', 'utf8', function (err, data) {
          body.should.eql(data);
          done();
        });
      });
    });
  });

  describe("Sockets", function(){});
});
