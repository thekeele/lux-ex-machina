/*
 * Routes
 * gps.js
 */

/* Include Modules */
var gps = require('../lib/gps');

/* GET gps page */
exports.findAll = function(req, res) {
	
	gps.return_json(function(result) {
        res.send(result);  
    });
};