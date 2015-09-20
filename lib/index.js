var express = require('express');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var ascribe = require('./ascribe');
var _ = require('lodash');

var A = function () {
  var app = this.app = express();

  app.engine('handlebars', exphbs({defaultLayout: __dirname + '/../views/layout'}));
  app.set('view engine', 'handlebars');
  app.use(favicon(__dirname + '/../public/favicon.ico'));
  app.use('/static', express.static(__dirname +'/../public'));

  app.get('/', function (req, res) {
    ascribe.getEditions(function (data) {
      _.each(data, function (piece) {
        piece.price = Math.round(Math.random() * (100000 - 10000) + 10000, 2);
        piece.thumbnail.url_safe = piece.thumbnail.url_safe.replace('100x100', '600x600');
      });

      res.render(__dirname + '/../views/index', {
        pieces: data
      });
    });
  });
}

A.prototype.start = function (port) {
  this.app.listen(port);  
}

module.exports = A;