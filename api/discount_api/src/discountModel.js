// definition du model
const mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);

const discountSchema = new mongoose.Schema({
    Name: String,
    State: Number,
    Description: String,
    Value: Number,
    IDClient: String
});

const dishesModel = mongoose.model('discount', discountSchema);

module.exports = dishesModel;