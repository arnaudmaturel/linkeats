// gère la connection à Mongo

// getting-started.js
const mongoose = require('mongoose');

main()
    .then((value)=>console.log("MongoDB Connected !"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://linkeats-dish_mongodb:27017/dishesDB');
}

