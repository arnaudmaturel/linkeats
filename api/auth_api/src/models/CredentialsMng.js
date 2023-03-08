const { DataTypes, where } = require('sequelize');
const db = require('../db');

const regexPhone = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
const regexMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

module.exports = {
    getById,
    getByUserName,
    update,
}

// get the credential by the id
async function getById(id) {
    return await db.Credentials.findOne({ where: { CredentialID: id } });
}

async function getByUserName(username, userRole) {
    if (!username)
        return;
    else if (username.match(regexMail))
        return await getByMail(username, userRole);
    else if (username.match(regexPhone))
        return await getByPhone(username, userRole);
    else
        return await getByLogin(username, userRole);
}

// update props of the credentials
async function update(id, params) {
    const credential = await getCredential(id);

    if (!credential) {
        return res.status(404).json({ error: 'User not found' });
    }

    Object.assign(credential, params);

    await credential.save();
}


//////////////////////////////// utilities //////////////////////////////////////////////////
async function getByMail(mail, userRole) {
    return await db.Credentials.findOne({ where: { CredentialEmail: mail, CredentialUserRole: userRole } });
}

async function getByPhone(phone, userRole) {
    return await db.Credentials.findOne({ where: { CredentialPhone: phone, CredentialUserRole: userRole } });
}

async function getByLogin(login, userRole) {
    return await db.Credentials.findOne({ where: { CredentialLogin: login, CredentialUserRole: userRole } });
}

// utility to get credential
async function getCredential(id) {
    return await db.Credentials.findOne({ where: { CredentialID: id } });
}