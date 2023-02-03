const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init({
	
}, {
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'product_tags',
});

module.exports = ProductTag;
