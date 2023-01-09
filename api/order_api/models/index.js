const db = {}

db.mongoose = require('./connection_init')

db.sensor = require('./sensor.model')

module.exports = db
