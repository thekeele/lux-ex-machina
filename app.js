/*
 * Server
 * app.js
 */

/* Include Modules */
var express = require('express')
	, routes = require('./routes')
	, gps = require('./routes/gps')
	, lumens = require('./routes/lumens')
	, http = require('http')
	, path = require('path');

/* Create App */
var app = express();

// app.set('ip', 'localhost');
app.set('ip', '10.132.213.230');
app.set('port', process.env.PORT || 8003);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/* All Available Routes */
app.get('/', routes.index);
app.get('//gps', gps.findAll);
app.get('//lumens', lumens.findAll);

/* Create HTTP Server and Listen on a Port */
http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
	console.log('Node server lending an ear on port ' + app.get('port') + ' and IP ' + app.get('ip'));
});
