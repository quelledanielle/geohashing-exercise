const Decimal = require('decimal.js');
const crypto = require('crypto');

function hash(string) {
  let hash = crypto.createHash('md5');
  hash.update(string);
  return hash.digest('hex');
}

function decimalString(hashPart) {
  return new Decimal('0x0.'+ hashPart).toPrecision(6);
}

function fractionString(hashPart) {
  return decimalString(hashPart).slice(1);
}

function fractionStrings(string) {
  let hashed = hash(string);
  let sliced = [hashed.slice(0, 16), hashed.slice(16)];
  return {
    lat: fractionString(sliced[0]),
    lon: fractionString(sliced[1])
  };
}

function geohash(lat, lon, dowString, respond) {
  let fractions = fractionStrings(dowString);
  return respond({
    lat: parseFloat(Math.trunc(lat) + fractions.lat),
    lon: parseFloat(Math.trunc(lon) + fractions.lon)
  });
}

module.exports = geohash;