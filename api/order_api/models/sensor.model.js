const mongoose = require('mongoose')

const Sensor = mongoose.model(
    "Sensor",
    new mongoose.Schema({
        id : Number,
        type : String,
        datas : Array,
        metrics: Boolean
    })
);

module.exports = Sensor