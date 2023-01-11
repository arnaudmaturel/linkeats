const { DataTypes } = require('sequelize');

module.exports = clientModel;

function clientModel(sequelize) {
	const attributes = {
		ClientLinkerFeatureEnabled : { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		ClientLastName : { type: DataTypes.STRING, allowNull: false },
		ClientFirstName : { type: DataTypes.STRING, allowNull: false },
		ClientCurrentXP : { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		ClientNextLevelXP : { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		ClientLevel : { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		ClientWallet : { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		UserID : { primaryKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		UserCredentialID : { foreignKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		UserRole : { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		RgpdObjectIsDeleted : { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		RgpdObjectCreatedAt : { type: DataTypes.DATE, allowNull: false },
		RgpdObjectLastWrite : { type: DataTypes.DATE, allowNull: false }
	};

    const options = {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    };

    return sequelize.define('Client', attributes, options)
}