// definition du model
const mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);

const commentSchema = new mongoose.Schema({
    Title: String,
    Rate: Number,
    Description: String,
    IDClient: String,
    IDOrderAssociated: String,
    IDUserNoted: String
});

const dishesModel = mongoose.model('comment', commentSchema);

module.exports = dishesModel;