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
    OrderStatus: {
        type: Number,
        required: true
    },
    OrderFinalPrice: {
        type: Number,
        required: true,
    },
    OrderTotalPrice: {
        type: Number,
        required: true,
    },
    OrderRestaurantPart: {
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
    OrderTips: {
        type: Number,
        required: true,
    },
    OrderPaymentInfo: {
        type: String,
        required: true,
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