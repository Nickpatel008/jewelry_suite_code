const { Sequelize } = require('sequelize');
const path = require('path');

const sqlConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    dialect: 'mysql',
    logging: false,
}

console.log("Local DB Server Structure Model");
const sqlReader = {
    ...sqlConfig,
    host: process.env.DB_HOST_READER,
    timezone: '+05:00'
}

// Connection
const dbReader = {
    sequelize: new Sequelize(
        sqlConfig.database,
        sqlConfig.username,
        sqlConfig.password,
        sqlReader
    )
}

var DbInstance = [{
    'name': dbReader
}]

DbInstance.forEach(element => {
    // Model Map    
    element.name['admin'] = require(path.join(__dirname, './adminModel'))(element.name['sequelize'], Sequelize);
    element.name['adminPermissions'] = require(path.join(__dirname, './adminPermissionModel'))(element.name['sequelize'], Sequelize);
    element.name['JewelryType'] = require(path.join(__dirname, './JewelryTypeModel'))(element.name['sequelize'], Sequelize);
    element.name['JewelrySubType'] = require(path.join(__dirname, './JewelrySubTypeModel'))(element.name['sequelize'], Sequelize);
    element.name['metals'] = require(path.join(__dirname, './metalsModel'))(element.name['sequelize'], Sequelize);
    element.name['jewelry'] = require(path.join(__dirname, './jewelryModel'))(element.name['sequelize'], Sequelize);
    element.name['metalsPrices'] = require(path.join(__dirname, './metalsPricesModel'))(element.name['sequelize'], Sequelize);
    element.name['jewelryMetadata'] = require(path.join(__dirname, './jewelryMetadataModel'))(element.name['sequelize'], Sequelize);


    // Model Association
    Object.keys(element.name).forEach(function (modelName) {
        if ('associate' in element.name[modelName]) {
            element.name[modelName].associate(element.name);
        }
    });
});

dbReader.Sequelize = Sequelize
module.exports = { dbReader };