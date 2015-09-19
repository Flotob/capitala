var express = require('express');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: __dirname + '/../views/layout'}));
app.set('view engine', 'handlebars');
app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use('/static', express.static(__dirname +'/../public'));
app.listen(3000);

module.exports = app;