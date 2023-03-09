const express = require('express');
const restaurantRouter = require('./routes/RestaurantController');
const app = express();

// need to read json
app.use(express.json())

// health link
app.get('/restaurants/status', (req, res) => {
    console.log("he's alive !");
    res.status(200).send();
});

app.use('/restaurants/images', express.static('src/images'));
// route restaurants
app.use('/restaurants', restaurantRouter);


app.listen(3000, () => console.log('Server started: 3000'));