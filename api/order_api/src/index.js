//Import dependencies
const express = require('express');


//Initialize express
const app = express();


// Read JSON
app.use(express.json());


// Importing the routes
const orderRoutes = require('./router')


// Handling routes request
app.use('/orders', orderRoutes)


// Server setup
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});