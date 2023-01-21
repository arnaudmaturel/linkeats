const mongoose = require('mongoose')
const uuid = require('node-uuid');

const OrderSchema = {
    OrderID: {
        type: String, 
        default: function genUUID() {
            return uuid.v4()  
        },
        required: true,
    },
    Items: {
        DishesNumber: Number,
        Dishes: { 
            IdDish: {
                NameDish: String,
                Quantity: Number,
                Price: Number,
                WeightDish: Number
            }
        }
    },
    ClientId: {
        type: String,
        required: true
    },
    RestaurantId: {
        type: String,
        required: true
    },
    DeliveryManId: {
        type: String,
        required: false
    },
    OrderStatus: {
        type: Number,
        required: true
    },
    OrderFinalPrice: {
        type: Number,
        required: true,
    },
    ItemsPrice: {
        type: Number,
        required: true,
    },
    OrderLinkEatsPart: {
        type: Number,
        required: true,
    },
    OrderDeliveryCost: {
        type: Number,
        required: true,
    },
    OrderDistance: {
        type: Number,
        required: true,
    },
    OrderPaymentInfo: {
        type: String,
        required: true,
    },
    OrderedAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    CookedAt: {
        type: Date,
        required: false,
    },
    PickedAt: {
        type: Date,
        required: false,
    },
    DeliveredAt: {
        type: Date,
        required: false,
    },
    RgpdObjectIsDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    RgpdObjectCreatedAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    RgpdObjectLastWrite: {
        type: Date,
        default: Date.now(),
        required: true,
    }  
}

const OrderModel = mongoose.model(
    'Order',
    new mongoose.Schema(OrderSchema)
);

module.exports = {OrderModel, OrderSchema}