
var assert = require('assert');
var serve = require('..');
var Metrics = require('metrics');
var request = require('supertest');

describe('metrics-express', function () {

  var date = new Date();
  var val = 3;
  var key = 'test';
  var metrics = Metrics().set(key, val, date);

  it('should be able to get all metric keys', function (done) {
    request(serve(metrics))
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        assert.deepEqual(res.body, [key]);
        done();
      });
  });

  it('should be able to 404 on an unknown metric', function (done) {
    request(serve(metrics))
      .get('/unknown')
      .expect(404)
      .end(done);
  });

  it('should be able to resolve a specific metric', function (done) {
    request(serve(metrics))
      .get('/' + key)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        var values = {};
        values[date.getTime()] = val;
        assert.deepEqual(res.body, values);
        done();
      });
  });

  it('should be able to resolve /metric/timestamp', function (done) {
    request(serve(metrics))
      .get('/' + key + '/' + date.getTime())
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        assert.deepEqual(res.body, val);
        done();
      });
  });

  it('should be able to resolve /metric/today', function (done) {
    request(serve(metrics))
      .get('/' + key + '/today')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        assert.deepEqual(res.body, val);
        done();
      });
  });
});
