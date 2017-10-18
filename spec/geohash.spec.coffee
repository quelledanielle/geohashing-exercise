geohash = require('../lib/geohash')

describe 'geohash', ->
  respond = (data) -> JSON.stringify(data)

  it 'should return geohashed destination coordinates', ->
    (expect geohash(37.421542, -122.085589, '2005-05-26-10458.68', respond))
      .toEqual '{"lat":37.857713,"lon":-122.544543}'
