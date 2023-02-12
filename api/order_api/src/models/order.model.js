const mongoose = require('mongoose')
const uuid = require('node-uuid');

const OrderSchema = {
    // OrderID: { type: mongoose.ObjectId, default: new mongoose.Types.ObjectId(), required: true, },
    Items: [
        {
            DisheID: mongoose.ObjectId,
            NameDish: String,
            Quantity: Number,
            Price: Number,
            WeightDish: Number
        }
    ],
    ItemsDone: [],
    ClientId: { type: String, required: true },
    RestaurantId: { type: String, required: true },
    DeliveryManId: { type: String, required: false },
    RestaurantLocation: { type: { Longitude: Number, Latitude: Number, Address: String }, required: true },
    ClientLocation: { type: { Longitude: Number, Latitude: Number, Address: String }, required: true },
    OrderStatus: { type: Number, required: true },
    OrderFinalPrice: { type: Number, required: true, },
    ItemsPrice: { type: Number, required: true, },
    OrderLinkEatsPart: { type: Number, required: true, },
    OrderDeliveryCost: { type: Number, required: true, },
    OrderDistance: { type: Number, required: true, },
    OrderPaymentInfo: { type: String, required: true, },
    OrderedAt: { type: Date, default: Date.now(), required: true, },
    CookedAt: { type: Date, required: false, },
    PickedAt: { type: Date, required: false, },
    DeliveredAt: { type: Date, required: false, },
    RgpdObjectIsDeleted: { type: Boolean, default: false, required: true, },
    RgpdObjectCreatedAt: { type: Date, default: Date.now(), required: true, },
    RgpdObjectLastWrite: { type: Date, default: Date.now(), required: true, }
}

const OrderModel = mongoose.model(
    'Order',
    new mongoose.Schema(OrderSchema)
);

module.exports = { OrderModel, OrderSchema }