var express = require('express');
var app = express();
var projectDir = '/src';

app.configure(function(){

  app.use('/css', express.static(__dirname + projectDir + '/css'));
  app.use('/images', express.static(__dirname + projectDir + '/images'));
  app.use('/javascript', express.static(__dirname + projectDir + '/javascript'));

});

app.all('/*', function(req, res) {
  res.sendfile('index.html', { root: __dirname + projectDir });
});

module.exports = app;
