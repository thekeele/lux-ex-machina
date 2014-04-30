/*
 * Models
 * lux.js
 */

/* Include Modules */
var rest = require('../lib/rest')
    , mathjs = require('mathjs');

/* HTTP Options */
var options = {
    hostname: 'racer.soic.indiana.edu', //production
    //hostname: 'silo.soic.indiana.edu', //dev
    port: 42424, //production
    //port: 14226, //dev
    path: '/lux', //production
    //path: '/example_json/lux.json',
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'connection': 'keep-alive'
    }
};

function compute_exposure(luminosity, iso) {
    //exposure = logbase2( luminosity / 2.5 )
    var ev, raw_ev;
    luminosity = parseInt(luminosity, 10);
    raw_ev = math.log((luminosity/2.5), 2);
    ev = math.round(raw_ev, 0);

    switch (iso) {
        case 200:
            return ev + 1;
        case 400:
            return ev + 2;
        case 800:
            return ev + 3;
        case 1600:
            return ev + 4;
        case 3200:
            return ev + 5;
        default:
            return ev;
    }
}

function compute_aperture(exposure, shutter) {
    //aperture = sqrt( 2^EV * shutter )
    return math.sqrt(math.pow(2, exposure) * shutter);
}

function compute_shutter(exposure, aperture) {
    //shutter = ( aperture^2 ) / ( 2^EV )
    return ( math.pow(aperture, 2) / math.pow(2, exposure) );
}

/* GET JSON Object */
rest.getJSON(options, function(result, status_code) {
    var i;
    var ev;
    var ap;
    var ss;
    var iso = 100;
    var aperture = 2;
    var lum = result.luminosity[0].value;
    var latest = result.luminosity[0].timestamp;
    var computations = [];
    math = mathjs();

    for (i=0; i < result.luminosity.length; i++) {
        if (result.luminosity[i].timestamp > latest) {
            latest = result.luminosity[i].timestamp;
            lum = result.luminosity[i].value;
        }
    }

    ev = compute_exposure(lum, iso);
    ss = compute_shutter(ev, aperture); //initial guess for aperture
    ap = compute_aperture(ev, ss);
    ss = compute_shutter(ev, ap);

    computations.push({lumens: lum, iso: iso, exposure: ev, aperture: ap, shutter: ss});

    console.log(result);
    console.log("lumens: " + lum);
    console.log("iso: " + iso);
    console.log("exposure value: " + ev);
    console.log("aperture: " + ap);
    console.log("shutter speed: " + ss);

	// export object to be used in other files 
	exports.return_results = function(onResult) {
        onResult(result, computations);
	}
});
