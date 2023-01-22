//Import dependencies
const express = require('express');
const db = require('./db');
const addressesController = require('./addressController');

//Initialize express
const app = express();

//Read JSON
app.use(express.json());

app.use('/addresses', addressesController);

// route 
app.get('/addresses/status', (req,res) => {
    console.log('addresses server is alive');
    res.status(200).json({"status":"OK"});
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

