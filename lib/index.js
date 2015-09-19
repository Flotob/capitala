var express = require('express');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');

var A = function () {
  var app = this.app = express();

  app.engine('handlebars', exphbs({defaultLayout: __dirname + '/../views/layout'}));
  app.set('view engine', 'handlebars');
  app.use(favicon(__dirname + '/../public/favicon.ico'));
  app.use('/static', express.static(__dirname +'/../public'));

  app.get('/', function (req, res) {
    res.render(__dirname + '/../views/index', {});
  });
}

A.prototype.start = function (port) {
  this.app.listen(port);  
}

module.exports = A;