// definition du model
const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    IDClient: String,
    dishesNumber: Number,
    isPaid: Boolean,
    totalPrice: Number,
    dishes: { 
        dishName: {
            id: String,
            quantity: Number,
            price: Number
        }
    }
});


const basketModel = mongoose.model('baskets',basketSchema);

module.exports = basketModel;