const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const deliverymanAccount = require('./routes/deliverymanController');
const app = express();

// need to read json
app.use(express.json())

// for swagger doc
//app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// route clients
app.use('/deliverymen', deliverymanAccount);

// health link
app.get('/deliverymen-status', (req, res) => { 
    console.log("he's alive !"); 
    res.status(200).send(); 
});



app.listen(5555, () => console.log('Server started: 5555'));
