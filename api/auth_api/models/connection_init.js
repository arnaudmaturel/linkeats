const { Sequelize } = require('sequelize');

// `Integrated Security=True;TrustServerCertificate=True`

const sequelize = new Sequelize(process.env.MSSQL_DB, process.env.MSSQL_USER , process.env.MSSQL_PASSWORD, {
    host: process.env.MSSQL_HOST,
    port: process.env.MSSQL_PORT,
    dialect: 'mssql'
});

try { 
    sequelize.authenticate();
    console.log('Connecté à la base de données SQL Server!'); 
} catch (error) {   
    console.error('Impossible de se connecter, erreur suivante :', error); 
}

module.exports = sequelize
