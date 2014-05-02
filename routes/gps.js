/*
 * Routes
 * gps.js
 */

/* Include Modules */
var gps = require('../lib/gps');

/* GET gps page */
exports.findAll = function(req, res) {
	/* render json objects */
	res.send(gps.return_json);
};