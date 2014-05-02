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
		var iso = 100; //base iso value
		var aperture = 2; //initial guess for aperture
		var lum = result.luminosity[0].value;
		var latest = result.luminosity[0].timestamp;
		var computations = [];
		var sRange = [960, 480, 240, 120, 60, 30, 15, 8, 4, 2, 1, 1/2, 1/4, 1/8, 1/15, 1/30, 1/60, 1/125, 1/250, 1/500, 1/1000, 1/2000, 1/4000, 1/8000, 1/15000, 1/30000, 1/60000];
 		var sRangeStr = ['960', '480', '240', '120', '60', '30', '15', '8', '4', '2', '1', '1/2', '1/4', '1/8', '1/15', '1/30', '1/60', '1/125', '1/250', '1/500', '1/1000', '1/2000', '1/4000', '1/8000', '1/15000', '1/30000', '1/60000'];

		for (i=0; i < result.luminosity.length; i++) {
			if (result.luminosity[i].timestamp > latest) {
				latest = result.luminosity[i].timestamp;
				lum = result.luminosity[i].value;
			}
		}

		lum = 700;
		ev = lux.compute_exposure(lum, iso);
	    ss = lux.compute_shutter(ev, aperture);  //returns position of element in array
	    ap = lux.compute_aperture(ev, sRange[ss]);

	    computations.push({lumens: lum, iso: iso, exposure: ev, aperture: ap, shutter: sRange[ss]});

	    console.log(result);
	    console.log("lumens: " + lum);
	    console.log("iso: " + iso);
	    console.log("exposure value: " + ev);
	    console.log("aperture: " + ap);
	    console.log("shutter speed: " + sRange[ss]);
		var shutterStr = sRangeStr[sRange.indexOf(computations[0].shutter)];
		console.log('sStr: ' + shutterStr);

		res.render('index', { title: 'Lux Ex Machina', aperture: computations[0].aperture, shutterStr: shutterStr, shutter: computations[0].shutter, iso: 1 });
	});
};