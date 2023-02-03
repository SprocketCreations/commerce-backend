const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model { }

Category.init({
	// define columns
	categoryName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'categories',
});

module.exports = Category;
