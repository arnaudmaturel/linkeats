const express = require('express');
const restaurantMng = require('../Models/RestaurantMng')
const router = express.Router();


// get info of the restaurant account specified in the id
router.get('/', (req, res) => {
    const c = restaurantMng.getAll();
    c.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing found ");
    })
        .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
    const c = restaurantMng.getById(req.params.id);
    c.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing found ");
    })
        .catch((err) => res.json(err));
});


// create a restaurant account
router.post('/register', (req, res) => {
    restaurantMng.create(req.body)
        .then((value) => {
            console.log("Creation Sucessful!\n");
            res.status(200).send(value);
        })
        .catch((err) => {
            console.log("Error Creation : " + err.message);
            res.status(500).send();
        });
});


// update the restaurant information
router.put('/:id', (req, res) => {
    restaurantMng.update(req.params.id, req.body)
        .then((value) => {
            console.log("Update sucess !");
            res.status(200).send();
        })
        .catch((err) => {
            console.log("Error updating : " + err.message);
            res.status(500).send();
        });
});


// deleted the restaurant account (HARD DELETED)
router.delete('/:id', (req, res) => {
    restaurantMng.delete(req.params.id)
        .then((value) => {
            console.log("Delete Sucess !");
            res.status(200).send();
        })
        .catch((err) => {
            console.log("Error deleting : " + err.message);
            res.status(500).send();
        });
});


module.exports = router;

