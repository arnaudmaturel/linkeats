const { DataTypes } = require('sequelize');

module.exports = RegisteryTokenModel;

function RegisteryTokenModel(sequelize) {
    const attributes = {
        RegistreryTokenEnabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        RegistreryTokenID: { primaryKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        RegistreryTokenExpiredDate: { type: DataTypes.DATE, allowNull: false }
    };

    const options = {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    };

    return sequelize.define('RegistreryToken', attributes, options)
}