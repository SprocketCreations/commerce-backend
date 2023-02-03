const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  console.log('\n----- DATABASE SYNCED -----\n');
  await sequelize.sync({ force: true });
  console.log('\n----- CATEGORIES SEEDED -----\n');
  await seedCategories();

  console.log('\n----- PRODUCTS SEEDED -----\n');
  await seedProducts();

  console.log('\n----- TAGS SEEDED -----\n');
  await seedTags();

  console.log('\n----- PRODUCT TAGS SEEDED -----\n');
  await seedProductTags();

  process.exit(0);
};

seedAll();
