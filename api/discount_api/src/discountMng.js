// gère CRUD
const { db } = require('./discountModel');
const discountModel = require('./discountModel');

module.exports = {
    getAll,
    getById,
    create,
    update,
    getByClientId,
    delete: _deleted
}

//return all the dishes
async function getAll() {
    return await discountModel.find();
}

//return the dish called by its ID
async function getById(id) {
    return await getDiscount(id);
}

//return all the dishes from one restaurant called by its ID
async function getByClientId(id) {
    return await discountModel.find({ IDClient: id }).exec();
}

//create a new dish and save it in the database
async function create(param) {
    const dish = new discountModel(param);

    await dish.save();

    return dish._id;
}

//update the parameters of a dish
async function update(id, param) {
    console.log(param);
    return await discountModel.findOneAndUpdate({ _id: id }, param, { new: true });
}

//delete a dish by its ID
async function _deleted(id) {
    return await discountModel.findOneAndDelete({ _id: id }).exec();
}


//Utility
async function getDiscount(id) {
    return await discountModel.findOne({ _id: id }).exec();
}