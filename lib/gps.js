/*
 * Models
 * gps.js
 */

/* Include Modules */
var rest = require('../lib/rest');
var json_object = '';

/* HTTP Options */
var options = {
    //hostname: 'racer.soic.indiana.edu', //production
    hostname: 'silo.soic.indiana.edu', //dev
    //port: 42424, //production
    port: 14226, //dev
    //path: '/gps', //production
    path: '/example_json/gps.json', //dev
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'connection': 'keep-alive'
    }
};

/* GET JSON Object */
rest.getJSON(options, function(result, status_code) {
    //console.log("gps rest call");
    //console.log(result);

	// export object to be used in other files 
	exports.return_json = function(onResult) {
		onResult(result);
	}
});
