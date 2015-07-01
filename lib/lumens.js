/*
 * Lib
 * lumens.js
 */

/* Include Modules */
var mathjs = require('mathjs')
, rest = require('../lib/rest')
, lumens = require('../lib/lumens');
math = mathjs();

/* HTTP Options */
/*var options = {
    //hostname: 'racer.soic.indiana.edu', //production
    hostname: 'silo.soic.indiana.edu', //dev
    //port: 42424, //production
    port: 14226, //dev
    //path: '/lumens', //production
    path: '/example_json/lumens.json',
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'connection': 'keep-alive'
    }
};*/

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

var status_code = 200;

// exports.options = options;

exports.compute_exposure = function(luminosity, iso) {
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

exports.compute_aperture = function(exposure, shutter) {
    //aperture = sqrt( 2^EV * shutter )
    return Math.round(math.sqrt(math.pow(2, exposure) * shutter));
}

exports.compute_shutter = function(exposure, aperture) {
    //shutter = ( aperture^2 ) / ( 2^EV )
    var shutter =  ( math.pow(aperture, 2) / math.pow(2, exposure) );
    var sRange = [960, 480, 240, 120, 60, 30, 15, 8, 4, 2, 1, 1/2, 1/4, 1/8, 1/15, 1/30, 1/60, 1/125, 1/250, 1/500, 1/1000, 1/2000, 1/4000, 1/8000, 1/15000, 1/30000, 1/60000];
    var i;

    for(i=0; (i < (sRange.length-1)) && (shutter < sRange[i]); i++);
    if(Math.abs(sRange[i] - shutter) > Math.abs(shutter - sRange[i-1])){
        return i - 1;
    } else {
        return i;
    }
}

/* GET JSON lumens Object */
//rest.getJSON(options, function(result, status_code) {
    console.log("lumens rest call for /lumens");
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
    ev = lumens.compute_exposure(lum, iso);
    ss = lumens.compute_shutter(ev, aperture);  //returns position of element in array
    ap = lumens.compute_aperture(ev, sRange[ss]);

    //computations.push({lumens: lum, exposure: ev, iso: iso, aperture: ap, shutter: sRange[ss], shutterStr: shutterStr});

    console.log("lumens: " + lum);
    console.log("iso: " + iso);
    console.log("exposure value: " + ev);
    console.log("aperture: " + ap);
    console.log("shutter speed: " + sRange[ss]);
    shutterStr = sRangeStr[sRange.indexOf(sRange[ss])];
    console.log('shutter string: ' + shutterStr);

    computations.push({lumens: lum, exposure: ev, iso: iso, aperture: ap, shutter: sRange[ss], shutterStr: shutterStr});

    result['computations'] = computations;

    exports.return_json = result;
//});
