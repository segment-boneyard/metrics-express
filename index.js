
var express = require('express');
var timeago = require('timeago');
var bodyParser = require('body-parser');

/**
 * Expose metrics serving app.
 *
 * @param {metrics} metrics
 * @return {ExpressApp}
 */

module.exports = function (metrics) {
  var app = express();
  app.use(bodyParser.json());

  // Return all keys
  app.get('/', function (req, res, next) {
    res.status(200).jsonp(metrics.keys());
  });

  // Return value for a single metric
  app.get('/:name', get, function (req, res, next) {
    var human = {};
    var values = req.metric.values();
    Object.keys(values).forEach(function (t) {
      human[timeago(new Date(parseInt(t)))] = values[t];
    });
    res.status(200).jsonp(human);
  });

  // Return value for a single metric with the given timestamp
  app.get('/:name/:timestamp', get, function (req, res, next) {
    var timestamp = req.params.timestamp;
    res.status(200).jsonp(req.metric.from(timestamp));
  });

  // Add a value for a metric, creating it if necessary
  app.post('/:name', function (req, res, next) {
    console.log(req.body);
    body = req.body;
    metrics.set(req.params.name, body.value, body.timestamp);
    res.send('added  ' + req.params.name);
  });

  // middleware to parse the metric from the :name parameter.
  function get (req, res, next) {
    var name = req.params.name;
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
