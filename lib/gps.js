/*
 * Models
 * gps.js
 */

/* Include Modules */
var rest = require('../lib/rest');

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

exports.options = options;

/* GET JSON GPS Object */
rest.getJSON(options, function(result, status_code) {
    console.log("gps rest call for /gps");
    console.log(result);
    
    exports.return_json = result;
});