/*
 * Route
 * index.js
 */

/* GET home page */
exports.index = function(req, res){
  res.render('index', { title: 'Lux Ex Machina' });
};