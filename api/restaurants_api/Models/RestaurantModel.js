const { DataTypes } = require('sequelize');

module.exports = clientModel;

function clientModel(sequelize) {
	const attributes = {
		RestaurantSiret : { type: DataTypes.STRING, allowNull: false },
		RestaurantSiren : { type: DataTypes.STRING, allowNull: false },
		RestaurantName : { type: DataTypes.STRING, allowNull: false },
		RestaurantIBAN : { type: DataTypes.STRING, allowNull: false },
		RestaurantImgIdentityPath : { type: DataTypes.STRING, allowNull: false },
		RestaurantImgBannerPath : { type: DataTypes.STRING, allowNull: false },
		RestaurantIsOpen : { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		RestaurantStars : { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
		RestaurantDeliveryRange : { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
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

    return sequelize.define('Restaurants', attributes, options)
}