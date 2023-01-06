const { DataTypes } = require('sequelize');

module.exports = clientModel;

function clientModel(sequelize) {
    const attributes =
    {
        ClientLinkerFeatureEnabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        ClientLastName: { type: DataTypes.STRING, allowNull: false },
        ClientFirstName: { type: DataTypes.STRING, allowNull: false },
        ClientCurrentXP: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        ClientNextLevelXP: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        ClientLevel: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        ClientWallet: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        UserID: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        UserLogin: { type: DataTypes.STRING, allowNull: false },
        UserEmail: { type: DataTypes.STRING, allowNull: false },
        UserPhone: { type: DataTypes.STRING, allowNull: false },
        UserPassword: { type: DataTypes.STRING, allowNull: false },
        UserRole: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        UserAcessTokenBlackList: { type: DataTypes.STRING, allowNull: true, defaultValue: "" },
        UserRegistreryTokenRegistreryTokenID: { type: DataTypes.UUID, allowNull: false, foreignKey: true },
        RgpdObjectIsDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        RgpdObjectCreatedAt: { type: DataTypes.DATE, allowNull: false },
        RgpdObjectLastWrite: { type: DataTypes.DATE, allowNull: false, },
    };

    const options = {
        // defaultScope: {
        //     // exclude password hash by default
        //     attributes: { exclude: ['UserPassword'] }
        // },
        // scopes: {
        //     // include hash with this scope
        //     withHash: { attributes: {}, }
        // },
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    };

    return sequelize.define('Client', attributes, options)
}