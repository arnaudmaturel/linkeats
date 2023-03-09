//Import dependencies
const express = require('express');
const db = require('./db');
const dishesController = require('./dishController');

//Initialize express
const app = express();

//Read JSON
app.use(express.json());

app.use('/dishes', dishesController);

app.use('/dishes/images', express.static('src/images'));

// route 
app.get('/dishes/status', (req, res) => {
    console.log('Dishes server is alive');
    res.status(200).json({ "status": "OK" });
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

