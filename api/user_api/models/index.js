const db = {}

db.sequelize = require('./connection_init')

db.user = require('./user.model')

module.exports = db
