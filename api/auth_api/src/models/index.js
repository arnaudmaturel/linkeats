const db = {}

db.sequelize = require('./connection_init')

db.user = require('./CredentialsModel')

db.sequelize.sync()

module.exports = db
