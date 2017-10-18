dowOpening = require('../lib/dow_opening')
dowJson = require('./support/dow.json')

describe 'dowOpening', ->
  it 'should return the correct data for the given symbol and key', ->
    (expect dowOpening(dowJson)).toEqual '6128.9126'
