// import important parts of sequelize library
const { INTEGER } = require('sequelize');
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init({
	// define columns
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL(2),
		allowNull: false,
		validate: {
			isDecimal: true,
		},
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 10,
		validate: {
			isNumeric: true,
		},
	},
	categoryId: {
		type: DataTypes.INTEGER,
		// TODO: Foreign Key
	},
}, {
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'products',
});

module.exports = Product;
