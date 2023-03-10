// gère la connection à Mongo

// getting-started.js
const mongoose = require('mongoose');

main()
    .then((value) => console.log("MongoDB Connected !"))
    .catch(err => console.log("MongoDB Connection ERROR :" + err.message));

async function main() {
    //await mongoose.connect('mongodb://localhost:27019/dishesDB');
    await mongoose.connect('mongodb://linkeats-dish_mongodb:27017/dishesDB');
}

