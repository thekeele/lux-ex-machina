/*
 * Lib
 * lux.js
 */

/* Include Modules */
var mathjs = require('mathjs');
math = mathjs();

/* HTTP Options */
var options = {
    //hostname: 'racer.soic.indiana.edu', //production
    hostname: 'silo.soic.indiana.edu', //dev
    //port: 42424, //production
    port: 14226, //dev
    //path: '/lux', //production
    path: '/example_json/lux.json',
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'connection': 'keep-alive'
    }
};

exports.options = options;

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