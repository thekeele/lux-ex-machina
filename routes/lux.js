/*
 * Routes
 * lux.js
 */

/* Include Modules */
var lux = require('../models/lux');

/* GET lux page */
exports.findAll = function(req, res) {
    
    lux.return_results(function(result, computations) {
    	result['computations'] = computations;
        res.send(result);
    });
};