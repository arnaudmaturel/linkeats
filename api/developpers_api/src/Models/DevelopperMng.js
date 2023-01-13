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
    return await db.Developper.findAll();
}

// get the developper by the id 
async function getById(id) {
    return await getDevelopper(id);
}

// create a developper
async function create(params) {

    try {
        const newCredential = await credentialMng.create(params);
        const newDev = new db.Developper(params);
        newDev.RgpdObjectLastWrite = new Date();
        newDev.RgpdObjectCreatedAt = new Date();
        newCredential.CredentialUserRole = 4;
        newDev.UserRole = 4;
        newDev.UserCredentialID = newCredential.CredentialID;
        newCredential.CredentialAssociatedUserID = newDev.UserID;

        // save the new developper in database
        await newDev.save();
        await newCredential.save();

        return newDev.UserID;
    } catch (error) {
        throw error;
    }
}


// update props of the developper
async function update(id, params) {
    const developper = await getDevelopper(id);

    Object.assign(developper, params);

    await developper.save();
}


// delete the developper and the token associated
async function _deleted(id) {
    const developper = await getDevelopper(id);
    const idCredential = developper.UserCredentialID;
    await developper.destroy();
    credentialMng.delete(idCredential);
}

// utility to get developper
async function getDevelopper(id) {
    return await db.Developper.findOne({ where: { UserID: id } });

}