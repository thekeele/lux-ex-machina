/*
 * RESTful JSON class
 * rest.js
 */

/* Include Modules */
var http = require('http');
var https = require('https');

/*
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http/s options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options, onResult)
{
    var result = '';    // stirr der dataera
    var protocol = options.port == 443 ? https : http;

    console.log(options.method + ' ' + options.hostname + ':' + options.port + options.path);

    var req = protocol.request(options, function(res)
    {
        var status_code = res.statusCode;

        //console.log('STATUS: ' + status_code);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));    
        //console.log('HOST: ' + options.hostname); 
        
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            //console.log('BODY: ', chunk);
            result += chunk;
            //console.log('result: ', result);
        });

        res.on('end', function() {
            var object = eval('(' + result + ')');
            //console.log('object: ', object);
            onResult(object, status_code);
        });

        res.on('close', function(){
            console.log('res close');
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write('req write');

    req.end('req end');
};

/*
 * postJSON: post a JSON object to a REST service
 *
 * @param options
 * @param callback: callback to pass the results JSON object(s) back
 */
/*exports.postJSON = function(options, data, onResult)
{
    console.log('rest::postJSON');

    var protocol = options.port == 443 ? https : http;
    var req = protocol.request(options, function(res)
    {
        var result = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            result += chunk;
        });

        res.on('end', function() {
            console.log('end: ' + result);
            var obj = eval('(' + result + ')');
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.log('error: ' + err.message);
    });

    req.write(JSON.stringify(data));
    req.end();
};*/

/*
 * deleteJSON: send a delete REST request with an id to delete
 *
 * @param options: http server options object
 * @param itemId: item id to delete
 * @param callback: callback to pass the results JSON object(s) back
 */
/*exports.deleteJSON = function(options, itemId, onResult)
{
    console.log('rest::deleteJSON');

    var protocol = options.port == 443 ? https : http;
    var req = protocol.request(options, function(res)
    {
        var result = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            result += chunk;
        });

        res.on('end', function() {
            var obj = eval('(' + result + ')');
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        // res.send('error: ' + err.message);
    });

    req.end();
};*/