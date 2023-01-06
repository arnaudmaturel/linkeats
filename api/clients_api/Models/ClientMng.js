const { DataTypes, where } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../db');
const registerTokenMng = require('./RegisteryTokenMng');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _deleted
}

async function getAll() {
    return await db.Client.findAll();
}

// get the client by the UserID
async function getById(id) {
    return await getClient(id);
}

// create user
async function create(params) {
    const client = await db.Client.findOne({ where: { UserLogin: params.UserLogin, UserEmail: params.UserEmail } });
    if (client) throw new Error('can\'t create a new client with this login and mail');

    const token = await registerTokenMng.create();

    if (token) {
        console.log('The token ' + token.RegistreryTokenID + ' associated for ' + params.ClientFirstName + "  " + params.ClientLastName + " aka " + params.UserLogin);
    }
    else {
        throw err = 'Error token null';
    }

    Object.defineProperty(params, 'UserRegistreryTokenRegistreryTokenID', {
        value: token.RegistreryTokenID,
        writable: false
    });

    Object.defineProperty(params, 'UserID', {
        value: DataTypes.UUIDV4.value,
        writable: false
    });


    const newClient = new db.Client(params);

    //hash password
    newClient.UserPassword = await bcrypt.hash(params.UserPassword, 10);


    newClient.UserRegistreryTokenRegistreryTokenID = token.RegistreryTokenID;

    console.log("\n\n\nNewClient created : " + newClient.UserRegistreryTokenRegistreryTokenID);
    // save the newUser in database
    await newClient.save();

    return newClient.UserID;
}


// update props of the clients
async function update(id, params) {
    const client = await getClient(id);

    Object.assign(client, params);

    await client.save();
}


// delete the client and the token associated
async function _deleted(id) {
    const client = await getClient(id);
    const idToken = client.UserRegistreryTokenRegistreryTokenID;
    await client.destroy();
    await registerTokenMng.delete(idToken);
}

// utility to get client
async function getClient(id) {
    return await db.Client.findOne({ where: { UserID: id } });

}