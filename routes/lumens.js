/*
 * Routes
 * lumens.js
 */

/* Include Modules */
var lumens = require('../lib/lumens');

/* GET lumens page */
exports.findAll = function(req, res) {
    /* render json objects */
	res.send(lumens.return_json);
};
