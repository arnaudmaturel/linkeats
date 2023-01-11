//Import dependencies
const express = require('express');
const db = require('./db');
const basketController = require('./basketController');

//Initialize express
const app = express();

//Read JSON
app.use(express.json());


// route 
app.get('/baskets/status', (req,res) => {
    console.log('basket server is alive');
    res.status(200).json({"status":"OK"});
});


app.use('/baskets', basketController);


app.listen(3005, () => {
    console.log('Server is running on port 3005');
});

