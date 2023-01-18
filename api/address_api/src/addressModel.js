// definition du model
const mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);

const addressSchema = new mongoose.Schema({
    address: String,
    zip: String,
    city: String,
    latitude: Number,
    longitude: Number,
    IDUser: String,
    UserRole: Number
});


const addressesModel = mongoose.model('addresses',addressSchema);

module.exports = addressesModel;