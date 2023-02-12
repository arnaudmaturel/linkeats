// definition du model
const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    IDClient: String,
    dishesNumber: Number,
    totalPrice: Number,
    dishes: [
        {
            idDish: { type: String, required: true },
            quantity: { type: Number, require: true, default: 1 },
            notes: { type: String, required: false, default: "" },
        }
    ]
});

const basketModel = mongoose.model('baskets', basketSchema);

module.exports = basketModel;