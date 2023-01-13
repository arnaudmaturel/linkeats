const db = {}

db.mongoose = require('./connection_init')

db.order = require('./order.model')

module.exports = db
