const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	process.env.PROJECT_GDO_DATABASE,
	process.env.PROJECT_GDO_DATABASE_USERNAME,
	process.env.PROJECT_GDO_DATABASE_PASSWORD, {
	host: process.env.PROJECT_GDO_DATABASE_HOST,
	port: process.env.PROJECT_GDO_DATABASE_PORT,
	dialect: process.env.PROJECT_GDO_DATABASE_DIALECT,
});

module.exports = sequelize;