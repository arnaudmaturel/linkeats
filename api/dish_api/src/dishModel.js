// definition du model
const mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);

const dishSchema = new mongoose.Schema({
    name: String,
    price: Number,
    PicturePaths: String,
    Description: String,
    Tags: String,
    Allergens: String,
    Wheight: Number,
    IDRestaurant: String
});


const dishesModel = mongoose.model('dishes',dishSchema);

module.exports = dishesModel;