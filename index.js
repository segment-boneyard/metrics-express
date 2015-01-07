
var express = require('express');

/**
 * Expose metrics serving app.
 *
 * @param {metrics} metrics
 * @return {ExpressApp}
 */

module.exports = function (metrics) {
  var app = express();

  app.get('/', function (req, res, next) {
    res.status(200).jsonp(metrics.keys());
  });

  app.get('/:name', get, function (req, res, next) {
    res.status(200).jsonp(req.metric.values());
  });

  app.get('/:name/:timestamp', get, function (req, res, next) {
    var timestamp = req.param('timestamp');
    res.status(200).jsonp(req.metric.from(timestamp));
  });    
  
  // middleware to parse the metric from the :name parameter.
  function get (req, res, next) {
    var name = req.param('name');
    var metric = metrics.get(name);
    if (!metric) {
      res.status(404)
         .jsonp({ error: { message: 'Failed to find metric "' + name + '"'} });
    } else {
      req.metric = metric;
      next();
    }
  }

  return app;
};
