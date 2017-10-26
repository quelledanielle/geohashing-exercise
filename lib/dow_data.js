const https = require('https');
const URL_OPTIONS = {
  host: 'query.yahooapis.com',
  path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5ENDX%22%2C%22INDU%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
};

const SYMBOL = '^NDX';
const OPEN = 'Open';

class DowData {
  fetchData() {
    return new Promise((resolve, reject) => {
      let req = https.get(URL_OPTIONS, (res) => {
        var chunks = [];
        res
          .on('data', (chunk) => { chunks.push(chunk); })
          .on('end', () => { resolve(Buffer.concat(chunks)); });
      });

      req.on('error', (err) => { return reject(err); });
    });
  }

  fetchJson() {
    return this.fetchData().then((data) => { return JSON.parse(data); }, console.error);
  }
}

DowData.open = (json) => {
  let quotes = json['query']['results']['quote'];
  let quote = quotes.find((q) => q['symbol'] === SYMBOL);
  return quote[OPEN];
}

module.exports = DowData;
