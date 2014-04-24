/*
 * Routes
 * lux.js
 */

/* Include Modules */
var lux = require('../models/lux');

/* GET lux page */
exports.findAll = function(req, res) {
    
    lux.return_json(function(result) {
        console.log(result);
        res.send(result);  
    });
};