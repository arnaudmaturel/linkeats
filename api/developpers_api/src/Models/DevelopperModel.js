const { DataTypes } = require('sequelize');

module.exports = clientModel;

function clientModel(sequelize) {
	const attributes = {
		DevelopperFirstName: { type: DataTypes.STRING, allowNull: false },
		DevelopperLastName: { type: DataTypes.STRING, allowNull: false },
		DevelopperApiKey: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		UserID: { primaryKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		UserCredentialID: { foreignKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		UserRole: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 4 },
		RgpdObjectIsDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		RgpdObjectCreatedAt: { type: DataTypes.DATE, allowNull: false },
		RgpdObjectLastWrite: { type: DataTypes.DATE, allowNull: false }
	};

	const options = {
		freezeTableName: true,
		createdAt: false,
		updatedAt: false,
	};

	return sequelize.define('Developpers', attributes, options)
}