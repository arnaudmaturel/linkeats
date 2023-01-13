const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const restaurantRouter = require('./routes/RestaurantController');
const app = express();

// need to read json
app.use(express.json())

// for swagger doc
//app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// health link
app.get('/restaurants/status', (req, res) => {
    console.log("he's alive !");
    res.status(200).send();
});


// route restaurants
app.use('/restaurants', restaurantRouter);


app.listen(3000, () => console.log('Server started: 3000'));