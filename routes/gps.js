/*
 * Routes
 * gps.js
 */

/* Include Modules */
var gps = require('../models/gps');

/* GET gps page */
exports.findAll = function(req, res) {
	
	gps.return_json(function(result) {
        console.log(result);
        res.send(result);  
    });
};