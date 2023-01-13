const { Sequelize } = require('sequelize');
const tedious = require('tedious');

const { dbName, dbConfig } = require('./Models/config.json');

module.exports = db = {};

initialize();

async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    // create the database if doesn't exist
    await ensureDbExist(dbName);

    // conexion to data base
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    // init models and add them to the expoxted db object
    const RestaurantSchema = require('./Models/RestaurantModel')(sequelize);
    const CredentialsSchema = require('./Models/CredentialsModel')(sequelize);
    const RegisteryTokenSchema = require('./Models/RegisteryTokenModel')(sequelize);

    db.Restaurant = RestaurantSchema;
    db.Credentials = CredentialsSchema;
    db.RegisteryToken = RegisteryTokenSchema;


    // synchronisation of models with data base
    await sequelize.sync();
    console.log("Synchroisation done !");
}

async function ensureDbExist(dbName) {
    return new Promise((resolve, reject) => {
        const conection = new tedious.Connection(dbConfig);
        conection.connect((err) => {
            // check if the connection was in error
            if (err) {
                console.log("Connection DB Error : " + err);
                reject(`Connection failed : ${err.message}`);
                return;
            }
            else
                console.log("SQL Server connected !");

            resolve();
        })
    });
}