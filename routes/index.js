/*
 * Route
 * index.js
 */

/* Include Modules */
var lux = require('../models/lux');

/* GET home page */
exports.index = function(req, res){

  lux.return_results(function(result, computations) {

  	/* agreed standards for shutter speeds */
  	var sRange = [1/1000, 1/500, 1/250, 1/125, 1/60, 1/30, 1/15, 1/8, 1/4, 1/2, 1];
  	var sRangeStr = ['1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15', '1/8', '1/4', '1/2', '1'];

  	var shutterStr = sRangeStr[sRange.indexOf(computations[0].shutter)];

    res.render('index', { title: 'Lux Ex Machina', aperture: computations[0].aperture, shutterStr: shutterStr, shutter: computations[0].shutter, iso: computations[0].iso });
  });
};