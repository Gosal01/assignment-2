const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, 
{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: 
  {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, 
{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

// Initialize models
db.Contacts = require("./contact.model.js")(sequelize, Sequelize);
db.Phones = require("./phone.model.js")(sequelize, Sequelize);

// Define model associations
db.Contacts.hasMany(db.Phones, { as: "phones", foreignKey: "contactId" });
db.Phones.belongsTo(db.Contacts, { foreignKey: "contactId" });

// Export sequelize instances and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
