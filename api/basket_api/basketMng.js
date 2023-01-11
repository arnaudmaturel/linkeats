// gère CRUD
const { db } = require('./basketModel');
const basketModel = require('./basketModel');

module.exports = {
    getAll,
    getById,
    create,
    update,
    getByClientId,
    delete: _deleted
}

//return all the basket
async function getAll(){
    return await basketModel.find();
}

//return the basket called by its ID
async function getById(id){
    return await getbasket(id);
}

//return all the basket from one client called by its ID
async function getByClientId(id){
    return await basketModel.find({'IDClient':id}).exec();
}

//create a new basket and save it in the database
async function create(param){
    const basket = new basketModel(param);
    
    await basket.save();

    return basket._id;
}

//update the parameters of a basket
async function update(id, param){
    console.log(param);
    return await basketModel.findOneAndUpdate({'_id':id}, param,{ new: true });
}

//delete a basket by its ID
async function _deleted(id){
    return await basketModel.findOneAndDelete({'_id':id}).exec();
}


//Utility
async function getbasket(id){
    return await basketModel.findOne({'_id':id}).exec();
}