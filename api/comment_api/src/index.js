//Import dependencies
const express = require('express');
const db = require('./db');
const commentController = require('./commentController');

//Initialize express
const app = express();

//Read JSON
app.use(express.json());

app.use('/comments', commentController);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

