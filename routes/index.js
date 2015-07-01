/*
 * Routes
 * index.js
 */

 /* Include Modules */
 var rest = require('../lib/rest')
 , lux = require('../lib/lux')
 , gps = require('../lib/gps')
 , mail = require('../lib/mail')

 /* GET home page */
 exports.index = function(req, res){

 	var result = {
	    "luminosity": [
	    {
	        "value": "0.31",
	        "timestamp": "1398107511"
	    },{
	        "value": "640",
	        "timestamp": "1398163230"
	    },{
	        "value": "330000",
	        "timestamp": "1398193250"
	    }]
	};

	/* GET JSON LUX Object */
	// rest.getJSON(lux.options, function(result, status_code) {
		console.log("lux rest call");
		console.log(result);
		var i, ev, ap, ss;
		var iso = 100; //base iso value
		var gps_data;
	 	var computations = [];
	 	var exif = [];
	 	var shutterStr;
	 	var aperture = 2; //initial guess for aperture
		var lum = result.luminosity[0].value;
		var latest = result.luminosity[0].timestamp;
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

	    console.log("lumens: " + lum);
	    console.log("iso: " + iso);
	    console.log("exposure value: " + ev);
	    console.log("aperture: " + ap);
	    console.log("shutter speed: " + sRange[ss]);
		shutterStr = sRangeStr[sRange.indexOf(computations[0].shutter)];
		console.log('shutter string: ' + shutterStr);

		/* GET JSON GPS Object */
		// rest.getJSON(gps.options, function(result, status_code) {

		var result = {
		    "gps": [
		    {
		        "latitude": "39.162222",
		        "longitude": "-86.529167",
		        "timestamp": "1398113986"
		    },{
		        "latitude": "35.0117",
		        "longitude": "-135.7683",
		        "timestamp": "1398114108"
		    },{
		        "latitude": "34.05",
		        "longitude": "-118.25",
		        "timestamp": "1398114170"
		    }]
		};

			console.log("gps rest call");
			console.log(result);
			var i, gps;
			var latest = result.gps[0].timestamp;

			for (i=0; i < result.gps.length; i++) {
				if (result.gps[i].timestamp > latest) {
					latest = result.gps[i].timestamp;
					gps_data = result.gps[i];
				}
			}
			exif.push({lumens: lum, iso: iso, exposure: ev, aperture: ap, shutter: sRange[ss], latitude: gps_data.latitude, longitude: gps_data.longitude});
			exif = JSON.stringify(exif);
			var transport = mail.smtpTransport;

			// setup e-mail data with unicode symbols
			var mailOptions = {
			    from: "Node JS Server ✔ <server@node.com>", // sender address
			    to: "m.keele88@gmail.com", // list of receivers
			    subject: "Node Says ✔", // Subject line
			    html: exif
			}

			// send mail with defined transport object
			transport.sendMail(mailOptions, function(error, response){
			    if(error) {
			        console.log(error);
			    } else {
			        console.log("Message sent: " + response.message);
			    }
			    transport.close(); // shut down the connection pool, no more messages
			});

			res.render('index', { title: 'Lux Ex Machina', aperture: computations[0].aperture, shutterStr: shutterStr, shutter: computations[0].shutter, iso: 1, latitude: gps_data.latitude, longitude: gps_data.longitude, lumens: lum, exposure: ev});
		// });
	// });
};
