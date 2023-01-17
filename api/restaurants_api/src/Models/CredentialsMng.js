const { DataTypes, where } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../db');
const tokenMng = require('./RegisteryTokenMng');
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    auth: {
        user: "linkeats@outlook.fr",
        pass: "lickit8=D"
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

module.exports = {
    getById,
    create,
    update,
    delete: _deleted
}

// get the credential by the id
async function getById(id) {
    return await getCredential(id);
}

// create a credential
async function create(params) {

    const isLoginUnic = await db.Credentials.findOne({ where: { CredentialLogin: params.CredentialLogin, CredentialUserRole: 2 } });
    if (isLoginUnic) throw new Error("login already taken !");

    const isMailUnic = await db.Credentials.findOne({ where: { CredentialEmail: params.CredentialEmail, CredentialUserRole: 2 } });
    if (isMailUnic) throw new Error("E-Mail already taken !");

    const isPhoneUnic = await db.Credentials.findOne({ where: { CredentialPhone: params.CredentialPhone, CredentialUserRole: 2 } });
    if (isPhoneUnic) throw new Error("Phone already taken !");

    let mailOptions = {
        from: 'linkeats@outlook.fr',
        to: params.CredentialEmail,
        subject: 'Welcome in LinkEats !',
        text: 'That was easy!'
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

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