const { DataTypes, where } = require('sequelize');
const db = require('../db');
const credentialMng = require('./CredentialsMng');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _deleted,
    getByIdFiltered
}

async function getAll(filters = {}, filteredColumns = '') {
    return await db.Restaurant.findAll(filters, filteredColumns);
}

// get the restuant by the id 
async function getById(id) {
    return await getRestaurant(id);
}

async function getByIdFiltered(id, filteredColumns) {
    return await getRestaurantFiltered(id, filteredColumns);
}

// create a restaurant
async function create(params) {

    try {
        const newCredential = await credentialMng.create(params);
        const newResto = new db.Restaurant(params);
        newResto.RgpdObjectLastWrite = new Date();
        newResto.RgpdObjectCreatedAt = new Date();
        newResto.RestaurantImgIdentityPath = "";
        newResto.RestaurantImgBannerPath = "";
        newResto.RestaurantIsOpen = false;
        newResto.RestaurantStars = 0;
        newResto.RestaurantDeliveryRange = 10;
        newResto.UserRole = 2;
        newCredential.CredentialUserRole = 2;
        newResto.UserCredentialID = newCredential.CredentialID;
        newCredential.CredentialAssociatedUserID = newResto.UserID;

        // save the new restaurant in database
        await newResto.save();
        await newCredential.save();

        return newResto.UserID;
    } catch (error) {
        throw error;
    }
}


// update props of the restaurant
async function update(id, params) {
    const resto = await getRestaurant(id);

    Object.assign(resto, params);

    await resto.save();
}


// delete the restaurant and the token associated
async function _deleted(id) {
    const resto = await getRestaurant(id);
    const idCredential = resto.UserCredentialID;
    await resto.destroy();
    credentialMng.delete(idCredential);
}

// utility to get restaurant
async function getRestaurant(id) {
    return await db.Restaurant.findOne({ where: { UserID: id } });
}

async function getRestaurantFiltered(id, filteredColumns) {
    return await db.Restaurant.findOne({ where: { UserID: id } }, filteredColumns);
}