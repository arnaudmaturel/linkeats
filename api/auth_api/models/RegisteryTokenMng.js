const { DataTypes } = require('sequelize');
const db = require('../db');

module.exports = {
    getById,
    enableToken,
    disableToken,
}


async function getById(id) {
    return await getRegisteryToken(id);
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


// utility get token
async function getRegisteryToken(id) {
    return await db.RegisteryToken.findOne({ where: { RegistreryTokenID: id } });
}