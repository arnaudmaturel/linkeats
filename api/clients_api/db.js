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
    const ClientSchema = require('./Models/ClientModel')(sequelize);
    const RegisteryTokenSchema = require('./Models/RegisteryTokenModel')(sequelize);

    //ClientSchema.hasOne(RegisteryTokenSchema, { foreignKey: { name: 'UserRegistreryTokenRegistreryTokenID' } });
    //RegisteryTokenSchema.belongsTo(ClientSchema);

    db.Client = ClientSchema;
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

            // // creation of the database creation request
            // const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
            // const request = new tedious.Request(createDbQuery, (err) => {
            //     if (err) {
            //         console.log("Request DB Error : " + err);
            //         reject(`Create DB Query Failed : ${err.message}`);
            //     }

            //     // query executed seccessfully
            //     resolve();
            // });
            // conection.execSql(request);
            resolve();
        })
    });
}