express = require('express');
app     = express();

const dowOpening = require('./lib/dow_opening');
const geohash = require('./lib/geohash');

app.get('/geohash', function(req, res, next) {
  respond = function(data){
    res.json(data);
  };

  let date = new Date();
  let dateString = date.toLocaleDateString();
  let opening = dowOpening(require('./spec/support/dow.json'));
  let dateOpening = `#{dateString}-#{opening}`;

  let geohashed = geohash(req.query.lat, req.query.lon, dateOpening, respond);
  res.status(200).send(geohashed);
});

console.log("api listening on 8000");

app.listen(8000);

module.exports = app;
