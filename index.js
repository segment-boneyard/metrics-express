
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
    res.jsonp(metrics.keys());
  });

  app.get('/:name', function (req, res, next) {
    var name = req.param('name');
    var val = metrics.get(name);
    if (!val) {
      res.jsonp(404, {
        error: { message: 'Failed to find metric "' + name + '"'}
      });
    } else {
      res.jsonp(val);
    }
  });

  return app;
};