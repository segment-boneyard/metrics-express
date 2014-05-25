
# metrics-express

An [express](https://github.com/segmentio/aws-billing) app to serve your [segmentio/metrics](https://github.com/segmentio/metrics) as an internal API.

## Installation

    $ npm install metrics-express

## Example

```js
var Metrics = require('metrics');
var serve = require('metrics-express');

var metrics = Metrics()
  .every('10m', charges('stripe-key')
  .every('10m', subscriptions('stripe-key')
  .every('1d', awsBilling(accountId, key, secret, bucket, region))
  .every('10m', helpscout('helpscout-key', ['mailbox']));

express()
  .use('/', serve(metrics))
  .listen(7002);
```

After your server starts, you'll be able to access a list of your metrics at:

```
GET /
```
![image](https://cloud.githubusercontent.com/assets/658544/3076432/04583784-e3dd-11e3-8c30-daa171f3a1da.png)

And get the detailed metric value at this route:

```
GET /:name
```
![image](https://cloud.githubusercontent.com/assets/658544/3076433/1e4900ec-e3dd-11e3-8d45-04765e5d67ea.png)

## License

MIT