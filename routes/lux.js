/*
 * Routes
 * lux.js
 */

/* Include Modules */
var rest = require('../lib/rest');
var json_object = '';

/* Store JSON Options */
var options = {
    hostname: 'silo.soic.indiana.edu',
    port: 14226,
    path: '/example_json/lux.json',
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'connection': 'keep-alive'
    }
};

/* GET JSON Object */
rest.getJSON(options, function(result, status_code) {
	console.log('STATUS: '+ status_code + ' JSON: ' + JSON.stringify(result));
	json_object = JSON.stringify(result);
});

/* GET lux page */
exports.findAll = function(req, res) {
    res.send(json_object);
};