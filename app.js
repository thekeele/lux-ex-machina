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

/* Load configuration file */
var config = require('./config.json')[app.get('env')];

app.set('port', config.luxPort);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.errorHandler(config.errorHandlerOptions));

/* Let express load static assets for development
   nginx will load static assets for production */
if ('development' == app.get('env')) {
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.static(path.join(__dirname, 'public')));
}

/* All Available Routes */
app.get('/', routes.index);
app.get('//gps', gps.findAll);
app.get('//lumens', lumens.findAll);

/* Create HTTP Server and Listen on a Port */
http.createServer(app).listen(config.luxPort, config.luxHost, function(){
	console.log('Node ' + app.get('env')  + ' server lending an ear on port ' + config.luxPort + ' and IP ' + config.luxHost);
});
