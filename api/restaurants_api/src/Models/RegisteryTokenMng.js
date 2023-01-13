const { DataTypes } = require('sequelize');
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


module.exports = {
    getAll,
    getById,
    create,
    enableToken,
    disableToken,
    delete: _deleted
}

async function getAll() {
    return await db.registerToken.findAll();
}

async function getById(id) {
    return await getRegisteryToken(id);
}

// create token
async function create() {

    const params = {
        RegistreryTokenEnabled: false,
        RegistreryTokenID: uuidv4(),
        RegistreryTokenExpiredDate: new Date()
        //.setFullYear(new Date().getFullYear() + 1)
    }

    const token = new db.RegisteryToken(params);
    console.log("TokenMng : token (" + token.RegistreryTokenID + ") created");

    // save the newUser in database
    await token.save();

    return token;
}

// enable the token=> add 1 year of validity
async function enableToken(id) {
    const token = await getRegisteryToken(id);

    const params = {
        RegistreryTokenEnabled: true,
        RegistreryTokenExpiredDate: new Date().setFullYear(new Date().getFullYear() + 1)
    }

    Object.assign(token, params);

    await token.save();
}

// enable the token => set the token validity to today
async function disableToken(id) {
    const token = await getRegisteryToken(id);

    const params = {
        RegistreryTokenEnabled: false,
        RegistreryTokenExpiredDate: new Date()
    }

    Object.assign(token, params);

    await token.save();
}

// deleted token 
async function _deleted(id) {
    const registerToken = await getRegisteryToken(id);
    await registerToken.destroy();
}


// utility get token
async function getRegisteryToken(id) {
    return await db.RegisteryToken.findOne({ where: { RegistreryTokenID: id } });
}