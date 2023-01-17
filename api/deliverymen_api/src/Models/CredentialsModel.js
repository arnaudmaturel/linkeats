const { DataTypes } = require('sequelize');

module.exports = clientModel;

function clientModel(sequelize) {
	const attributes = {
		CredentialID: { primaryKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		UserRegistreryTokenRegistreryTokenID: { foreignKey: true, type: DataTypes.UUID, allowNull: false },
		CredentialLogin: { type: DataTypes.STRING, allowNull: false },
		CredentialEmail: { type: DataTypes.STRING, allowNull: false },
		CredentialPhone: { type: DataTypes.STRING, allowNull: false },
		CredentialPassword: { type: DataTypes.STRING, allowNull: false },
		CredentialAssociatedUserID: { foreignKey: true, type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
		CredentialAcessTokenBlackList: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
		CredentialUserRole: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		RgpdObjectIsDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		RgpdObjectCreatedAt: { type: DataTypes.DATE, allowNull: false },
		RgpdObjectLastWrite: { type: DataTypes.DATE, allowNull: false }
	};

	const options = {
		freezeTableName: true,
		createdAt: false,
		updatedAt: false,
	};

	return sequelize.define('Credentials', attributes, options)
}