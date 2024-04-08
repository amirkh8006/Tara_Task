
const { Sequelize } = require('sequelize');
const {
    db
} = require('../config/config');

const sequelize = new Sequelize(db.dbName, db.username, db.password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
})


module.exports = {
    sequelize
}

require('../models/models')
