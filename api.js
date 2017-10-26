express = require('express');
app     = express();

const DowData = require('./lib/dow_data');
const geohash = require('./lib/geohash');

app.get('/geohash', function(req, res, next) {
  respond = function(data){
    res.json(data);
  };

  let dowData = new DowData();
  dowData.fetchJson().then((json) => {
    let date = new Date();
    let dateString = date.toLocaleDateString();

    let open = DowData.open(json);
    let dateOpenString = `#{dateString}-#{open}`;

    let geohashed = geohash(req.query.lat, req.query.lon, dateOpenString, respond);
    res.status(200).send(geohashed);
  }, console.error);
});

console.log("api listening on 8000");

app.listen(8000);

module.exports = app;
