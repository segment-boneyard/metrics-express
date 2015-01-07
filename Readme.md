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

### `GET /`

Fetch a list of all [Metric](https://github.com/segmentio/metrics#new-metric) keys.

![image](https://cloud.githubusercontent.com/assets/658544/3076432/04583784-e3dd-11e3-8c30-daa171f3a1da.png)

### `GET /:name`

Get a list of all valid [Metric](https://github.com/segmentio/metrics#new-metric) timestamps and values.

```
GET /:name/:timestamp
```

Get a [Metric](https://github.com/segmentio/metrics#new-metric) value at a specific `timestamp`.

`timestamp` values could be specific timestamps, or  human [date.js](https://github.com/MatthewMueller/date#examples) strings, like `today` or `2 weeks from wednesday`.

## License

MIT