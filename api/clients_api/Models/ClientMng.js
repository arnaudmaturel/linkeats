const { DataTypes, where } = require('sequelize');
const db = require('../db');
const credentialMng = require('./CredentialsMng');

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

// get the deliveryman by the id 
async function getById(id) {
    return await getClient(id);
}

// create a deliveryman
async function create(params) {

    try {
        const newCredential = await credentialMng.create(params);
        const newClient = new db.Client(params);
        newClient.RgpdObjectLastWrite = new Date();
        newClient.RgpdObjectCreatedAt = new Date();
        newClient.ClientWallet = 0;
        newClient.ClientLevel = 1;
        newClient.ClientNextLevelXP = 0;
        newClient.ClientCurrentXP = 100;
        newCredential.CredentialUserRole = 1;
        newClient.UserRole = 1;
        newClient.UserCredentialID = newCredential.CredentialID;
        newCredential.CredentialAssociatedUserID = newClient.UserID;

        // save the new deliveryman in database
        await newClient.save();
        await newCredential.save();

        return newClient.UserID;
    } catch (error) {
        throw error;
    }
}


// update props of the client
async function update(id, params) {
    const client = await getClient(id);

    Object.assign(client, params);

    await client.save();
}


// delete the client and the token associated
async function _deleted(id) {
    const client = await getClient(id);
    const idCredential = client.UserCredentialID;
    await client.destroy();
    credentialMng.delete(idCredential);
}

// utility to get client
async function getClient(id) {
    return await db.Client.findOne({ where: { UserID: id } });
}