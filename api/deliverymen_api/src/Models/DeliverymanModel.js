const { DataTypes } = require('sequelize');

module.exports = clientModel;

function clientModel(sequelize) {
	const attributes = {
		DeliverymanIsActif: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		DeliverymanFirstName: { type: DataTypes.STRING, allowNull: false },
		DeliverymanLastName: { type: DataTypes.STRING, allowNull: false },
		DeliverymanIBAN: { type: DataTypes.STRING, allowNull: false },
		DeliverymanStars: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
		DeliverymanActionRange: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
		Latitude: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
		Longitude: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
		UserID: { primaryKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		UserCredentialID: { foreignKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		UserRole: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 3 },
		RgpdObjectIsDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		RgpdObjectCreatedAt: { type: DataTypes.DATE, allowNull: false },
		RgpdObjectLastWrite: { type: DataTypes.DATE, allowNull: false }
	};

	const options = {
		freezeTableName: true,
		createdAt: false,
		updatedAt: false,
	};

	return sequelize.define('Deliverymen', attributes, options)
}