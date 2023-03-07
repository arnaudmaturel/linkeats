//Import dependencies
const express = require('express');
const db = require('./db');
const disscoutCtrl = require('./discountController');

//Initialize express
const app = express();

//Read JSON
app.use(express.json());

app.use('/discount', disscoutCtrl);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

