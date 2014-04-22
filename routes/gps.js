/* Include Modules */
//var rest = require('../lib/rest');

/* GET JSON Options */
/*var options = {
    host: 'http://silo.cs.indiana.edu',
    port: 42424,
    path: '/u/mkeele/apache/htdocs/example_json/gps',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};*/

/* GET JSON Object */
/*rest.getJSON(options, function(statusCode, result) {
	console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
	res.statusCode = statusCode;
	res.send(result);
});*/

/*
 * GET gps page 
 */
exports.findAll = function(req, res) {
    res.send([{name:'gps1'}, {name:'gps2'}, {name:'gps3'}]);
};