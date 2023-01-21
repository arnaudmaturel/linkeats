// definition du model
const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    IDClient: String,
    dishesNumber: Number,
    totalPrice: Number,
    dishes: { 
        idDish: {
            IDRestaurant: {
                type: String,
                required: true
            },
            nameDish: String,
            quantity: Number,
            price: Number,
            weightDish: Number
        }
    }
});

const basketModel = mongoose.model('baskets',basketSchema);

module.exports = basketModel;