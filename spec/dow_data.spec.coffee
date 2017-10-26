DowData = require('../lib/dow_data')
dowJson = require('./support/dow.json')

describe 'DowData.open', ->
  it 'should return the correct ^NDX Open value', ->
    (expect DowData.open(dowJson)).toEqual '6128.9126'
