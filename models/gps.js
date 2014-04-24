/*
 * Models
 * gps.js
 */

/* Include Modules */
var rest = require('../lib/rest');
var json_object = '';

/* HTTP Options */
var options = {
    hostname: 'silo.soic.indiana.edu',
    port: 14226,
    path: '/example_json/gps.json',
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

	/* export object to be used in other files */
	exports.return_json = function(onResult) {
		console.log(json_object.toString());
		onResult(json_object);
	}
});