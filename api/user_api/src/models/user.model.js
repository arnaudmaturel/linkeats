const { DataTypes} = require('sequelize');
const sequelize = require('./connection_init') 

const User = sequelize.define('User', {
    UserID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
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
