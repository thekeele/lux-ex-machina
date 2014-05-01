/*
 * Routes
 * index.js
 */

 /* Include Modules */
 var rest = require('../lib/rest')
 , lux = require('../lib/lux')
 , gps = require('../lib/gps');

 /* GET home page */
 exports.index = function(req, res){

	/* GET JSON Object */
	rest.getJSON(lux.options, function(result, status_code) {
		console.log("lux rest call");
		var i, ev, ap, ss;
		var iso = 400; //base iso value
		var aperture = 2; //initial guess for aperture
		var lum = result.luminosity[0].value;
		var latest = result.luminosity[0].timestamp;
		var computations = [];

		for (i=0; i < result.luminosity.length; i++) {
			if (result.luminosity[i].timestamp > latest) {
				latest = result.luminosity[i].timestamp;
				lum = result.luminosity[i].value;
			}
		}

		lum = 80;
		ev = lux.compute_exposure(lum, iso);
	    ss = lux.compute_shutter(ev, aperture);
	    ap = lux.compute_aperture(ev, ss);
	    //ss = 0.125;
	    //ap = 2;

	    computations.push({lumens: lum, iso: iso, exposure: ev, aperture: ap, shutter: ss});

	    console.log(result);
	    console.log("lumens: " + lum);
	    console.log("iso: " + iso);
	    console.log("exposure value: " + ev);
	    console.log("aperture: " + ap);
	    console.log("shutter speed: " + ss);

	 	// agreed standards for shutter speeds 
		var sRange = [1/1000, 1/500, 1/250, 1/125, 1/60, 1/32, 1/15, 1/8, 1/4, 1/2, 1];
		var sRangeStr = ['1/1000', '1/500', '1/250', '1/125', '1/60', '1/32', '1/15', '1/8', '1/4', '1/2', '1'];
		var shutterStr = sRangeStr[sRange.indexOf(computations[0].shutter)];
		console.log('num: ' + computations[0].shutter);
		console.log('str: ' + shutterStr);

		res.render('index', { title: 'Lux Ex Machina', aperture: computations[0].aperture, shutterStr: shutterStr, shutter: computations[0].shutter, iso: computations[0].iso });
	});
};