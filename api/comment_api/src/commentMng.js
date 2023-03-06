// gère CRUD
const { db } = require('./commentModel');
const dishModel = require('./commentModel');

module.exports = {
    getAll,
    getById,
    create,
    update,
    getByNotedUserId,
    getByClientId,
    getByOrderId,
    delete: _deleted
}

//return all the dishes
async function getAll() {
    return await dishModel.find();
}

//return the dish called by its ID
async function getById(id) {
    return await getComment(id);
}

//return all the dishes from one restaurant called by its ID
async function getByClientId(id) {
    return await dishModel.find({ IDClient: id }).exec();
}

//return all the dishes from one restaurant called by its ID
async function getByNotedUserId(id) {
    return await dishModel.find({ IDUserNoted: id }).exec();
}

//return all the dishes from one restaurant called by its ID
async function getByOrderId(id) {
    return await dishModel.find({ IDOrderAssociated: id }).exec();
}

//create a new dish and save it in the database
async function create(param) {
    const comment = new dishModel(param);

    await comment.save();

    return comment._id;
}

//update the parameters of a dish
async function update(id, param) {
    return await dishModel.findOneAndUpdate({ _id: id }, param, { new: true });
}

//delete a dish by its ID
async function _deleted(id) {
    return await dishModel.findOneAndDelete({ _id: id }).exec();
}


//Utility
async function getComment(id) {
    return await dishModel.findOne({ _id: id }).exec();
}