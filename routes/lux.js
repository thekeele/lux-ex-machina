/*
 * Routes
 * lux.js
 */

/* Include Modules */
var lux = require('../lib/lux');

/* GET lux page */
exports.findAll = function(req, res) {
    /* render json objects */
	res.send(lux.return_json);
};