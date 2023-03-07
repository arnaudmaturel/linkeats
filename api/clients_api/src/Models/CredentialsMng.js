const { DataTypes, where } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../db');
const tokenMng = require('./RegisteryTokenMng');

module.exports = {
    getById,
    create,
    update,
    getCredByLogin,
    delete: _deleted
}

// get the credential by the id
async function getById(id) {
    return await getCredential(id);
}

async function getCredByLogin(login) {
    var cred = null;

    // check login
    cred = await db.Credentials.findOne({ where: { CredentialLogin: login.CredentialLogin, CredentialUserRole: 1 } });
    if (cred != null)
        return cred;

    // check mail
    cred = await db.Credentials.findOne({ where: { CredentialEmail: login.CredentialEmail, CredentialUserRole: 1 } });
    if (cred != null)
        return cred;

    // check phone
    cred = await db.Credentials.findOne({ where: { CredentialPhone: login.CredentialPhone, CredentialUserRole: 1 } });
    if (cred != null)
        return cred;

    return null;

}

// create a credential
async function create(params) {

    const isLoginUnic = await db.Credentials.findOne({ where: { CredentialLogin: params.CredentialLogin, CredentialUserRole: 1 } });
    if (isLoginUnic) throw new Error("login already taken !");

    const isMailUnic = await db.Credentials.findOne({ where: { CredentialEmail: params.CredentialEmail, CredentialUserRole: 1 } });
    if (isMailUnic) throw new Error("E-Mail already taken !");

    const isPhoneUnic = await db.Credentials.findOne({ where: { CredentialPhone: params.CredentialPhone, CredentialUserRole: 1 } });
    if (isPhoneUnic) throw new Error("Phone already taken !");

    const token = await tokenMng.create();
    const credential = new db.Credentials(params);
    credential.UserRegistreryTokenRegistreryTokenID = token.RegistreryTokenID;
    credential.CredentialPassword = await bcrypt.hash(params.CredentialPassword, 10);
    credential.RgpdObjectCreatedAt = new Date();
    credential.RgpdObjectLastWrite = new Date();
    credential.CredentialAcessTokenBlackList = "";
    await credential.save();

    return credential;
}


// update props of the credentials
async function update(id, params) {
    const credential = await getCredential(id);

    Object.assign(credential, params);

    await credential.save();
}


// delete the credential
async function _deleted(id) {
    const credential = await getCredential(id);
    const idToken = credential.UserRegistreryTokenRegistreryTokenID;
    await credential.destroy();
    tokenMng.delete(idToken);
}

// utility to get credential
async function getCredential(id) {
    return await db.Credentials.findOne({ where: { CredentialID: id } });

}