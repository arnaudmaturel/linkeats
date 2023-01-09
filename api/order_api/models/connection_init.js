const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//MONGODB Connect

mongoose
    .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch(err => {
        console.error(err);
        process.exit()
    });

module.exports = mongoose