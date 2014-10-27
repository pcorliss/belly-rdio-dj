var assert = require("assert");
var should = require('should');
var request = require('request');
var path = require('path');
var fs = require('fs')
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

  describe("GET /get_token", function(){});
  describe("GET /track_search_proxy", function(){});
  describe("GET /follower/:id", function(){});
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
