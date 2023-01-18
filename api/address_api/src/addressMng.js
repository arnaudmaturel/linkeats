// gère CRUD
const { db } = require('./addressModel');_deleted
const addressModel = require('./addressModel');

module.exports = {
    getAll,
    getById,
    create,
    update,
    getByUserId,
    delete: _deleted
}

//return all the addresses
async function getAll(){
    return await addressModel.find();
}

//return the address called by its ID
async function getById(id){
    return await getaddresses(id);
}

//return all the addresses from one User called by its ID
async function getByUserId(id){
    return await addressModel.find({'IDUser':id}).exec();
}

//create a new address and save it in the database
async function create(param){
    const address = new addressModel(param);
    
    await address.save();

    return address._id;
}

//update the parameters of a address
async function update(id, param){
    console.log(param);
    return await addressModel.findOneAndUpdate({'_id':id}, param,{ new: true });
}

//delete a address by its ID
async function _deleted(id){
    return await addressModel.findOneAndDelete({'_id':id}).exec();
}


//Utility
async function getaddresses(id){
    return await addressModel.findOne({'_id':id}).exec();
}