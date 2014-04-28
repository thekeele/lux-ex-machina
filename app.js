/*
 * Server
 * app.js
 */

/* Include Modules */
var express = require('express')
	, routes = require('./routes')
	, gps = require('./routes/gps')
	, lux = require('./routes/lux')
	, http = require('http')
	, path = require('path');

/* Create App */
var app = express();

app.set('port', process.env.PORT || 42424);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/* All Available Routes */
app.get('/', routes.index);
app.get('/gps', gps.findAll);
app.get('/lux', lux.findAll);

/* Create HTTP Server and Listen on a Port */
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
