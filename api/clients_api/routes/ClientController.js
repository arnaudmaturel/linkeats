const express = require('express');
const clientMng = require('../Models/ClientMng')
const router = express.Router();


// get info of the client account specified in the id
router.get('/:id', (req, res) => {
    const c = clientMng.getById(req.params.id);
    c.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing found ");
    })
        .catch((err) => res.json(err));
});


// create a client account
router.post('/register', (req, res) => {
    clientMng.create(req.body)
        .then((value) => {
            console.log("Creation Sucessful!\n");
            res.status(200).send(value);
        })
        .catch((err) => {
            console.log("Error Creation : " + err.message);
            res.status(500).send();
        });
});


// update the client information
router.put('/:id', (req, res) => {
    clientMng.update(req.params.id, req.body)
        .then((value) => {
            console.log("Update sucess !");
            res.status(200).send();
        })
        .catch((err) => {
            console.log("Error updating : " + err.message);
            res.status(500).send();
        });
});


// deleted the client account (HARD DELETED)
router.delete('/:id', (req, res) => {
    clientMng.delete(req.params.id)
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

