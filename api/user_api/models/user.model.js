const { DataTypes } = require('sequelize');
const sequelize = require('./connection_init') 

const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });

module.exports = User
