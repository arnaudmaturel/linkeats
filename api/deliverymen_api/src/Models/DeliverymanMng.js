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
    return await db.Deliveryman.findAll();
}

// get the deliveryman by the id 
async function getById(id) {
    return await getDeliveryman(id);
}

// create a deliveryman
async function create(params) {

    try {
        const newCredential = await credentialMng.create(params);
        const newDeliveryman = new db.Deliveryman(params);
        newDeliveryman.RgpdObjectLastWrite = new Date();
        newDeliveryman.RgpdObjectCreatedAt = new Date();
        newCredential.CredentialUserRole = 3;
        newDeliveryman.UserRole = 3;
        newDeliveryman.UserCredentialID = newCredential.CredentialID;
        newCredential.CredentialAssociatedUserID = newDeliveryman.UserID;

        // save the new deliveryman in database
        await newDeliveryman.save();
        await newCredential.save();

        return newDeliveryman.UserID;
    } catch (error) {
        throw error;
    }


}


// update props of the deliveryman
async function update(id, params) {
    const deliveryman = await getDeliveryman(id);

    Object.assign(deliveryman, params);

    await deliveryman.save();
}


// delete the deliveryman and the token associated
async function _deleted(id) {
    const deliveryman = await getDeliveryman(id);
    const idCredential = deliveryman.UserCredentialID;
    await deliveryman.destroy();
    credentialMng.delete(idCredential);
}

// utility to get deliveryman
async function getDeliveryman(id) {
    return await db.Deliveryman.findOne({ where: { UserID: id } });

}