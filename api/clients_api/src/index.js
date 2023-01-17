const express = require('express');
const deliverymanAccount = require('./routes/ClientController');
const app = express();

// need to read json
app.use(express.json())

// health link
app.get('/clients/status', (req, res) => {
    console.log("he's alive !");
    res.status(200).send();
});


// route clients
app.use('/clients', deliverymanAccount);


app.listen(3000, () => console.log('Server started: 3000'));
