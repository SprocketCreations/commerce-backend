const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model { }

Tag.init({
	name: {
		type: DataTypes.STRING,
	},
}, {
	sequelize,
	timestamps: false,
	freezeTableName: true,
	underscored: true,
	modelName: 'tags',
});

module.exports = Tag;
