// gère CRUD
const { db } = require('./dishModel');
const dishModel = require('./dishModel');

module.exports = {
    getAll,
    getById,
    create,
    update,
    getByRestaurantId,
    delete: _deleted
}

//return all the dishes
async function getAll(){
    return await dishModel.find();
}

//return the dish called by its ID
async function getById(id){
    return await getDishes(id);
}

//return all the dishes from one restaurant called by its ID
async function getByRestaurantId(id){
    return await dishModel.find({IDRestaurant: id}).exec();
}

//create a new dish and save it in the database
async function create(param){
    const dish = new dishModel(param);
    
    await dish.save();

    return dish._id;
}

//update the parameters of a dish
async function update(id, param){
    console.log(param);
    return await dishModel.findOneAndUpdate({_id:id}, param,{ new: true });
}

//delete a dish by its ID
async function _deleted(id){
    return await dishModel.findOneAndDelete({_id:id}).exec();
}


//Utility
async function getDishes(id){
    return await dishModel.findOne({_id:id}).exec();
}