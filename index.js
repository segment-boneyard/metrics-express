
var express = require('express');

/**
 * Expose metrics serving app.
 *
 * @param {metrics} metrics
 * @return {ExpressApp}
 */

module.exports = function (metrics) {
  var app = express();

/**
 * Return all keys
 */

  app.get('/', function (req, res, next) {
    res.jsonp(metrics.keys());
  });

/**
 * GET: Return the value of a key
 */
 
  app.get('/:name', function (req, res, next) {
    
    var name = req.param('name');
    var val = metrics.get(name);
    
    if(!val) {
      res.status(404).jsonp({ 
      					error: { message: 'Failed to find metric "' + name + '"'}});
      } else {
      res.jsonp(val);
    }
  });
  
/**
 * POST: Add a value to an existing metric 
 * (eg New Value = Old Value + Posted Value)
 */
 
  app.post('/:name/:newVal', function (req, res, next) {
  	
  	var name = req.param('name');
  	var newVal = req.param('newVal');
  	
  	if(!metrics.get(name)){
      res.status(404).jsonp({ 
      					error: { message: 'Failed to find metric "' + name + '"'}});
  	  } else if(isNaN(newVal)){
  	  	res.status(400).jsonp({ 
      					error: { message: 'Bad value provided'}});
  	  }else{
  	  	var totalVal = +metrics.get(name) + +newVal;
  	  	var val = metrics.set(name, totalVal);
  		res.send("Your new " + name + " is " + totalVal + "\n");
  	  }
  });

  return app;

};