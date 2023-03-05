//Import dependencies
const express = require('express');
const db = require('./db');
const basketController = require('./basketController');

//Initialize express
const app = express();

//Read JSON
app.use(express.json());

// const rolesChecking = require('./utils/role')

//app.use(rolesChecking.checkRole([rolesChecking.roles.Visitor, rolesChecking.roles.Client]))
app.use('/baskets', basketController);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

