const db = {}

db.sequelize = require('./connection_init')

db.user = require('./user.model')

db.sequelize.sync()

module.exports = db
