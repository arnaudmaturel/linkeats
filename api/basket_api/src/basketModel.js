// definition du model
const mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);

const basketSchema = new mongoose.Schema({
    IDClient: String,
    dishes: [
        {
            id: String,
            quantity: Number
        }
    ]
});


const basketModel = mongoose.model('baskets',basketSchema);

module.exports = basketModel;