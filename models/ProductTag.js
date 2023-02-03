const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init({
	productId: {
		type: DataTypes.INTEGER,
		// TODO: Foreign Key.
	},
	tagId: {
		type: DataTypes.INTEGER,
		// TODO: Foreign Key.
	}
}, {
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'product_tags',
});

module.exports = ProductTag;
