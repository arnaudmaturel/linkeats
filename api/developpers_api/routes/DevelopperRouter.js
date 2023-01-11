const express = require('express');
const DevelopperMng = require('../Models/DevelopperMng')
const router = express.Router();


// get info of the developper account specified in the id
router.get('/:id', (req, res) => {
    const c = DevelopperMng.getById(req.params.id);
    c.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing found ");
    })
        .catch((err) => res.json(err));
});


// create a developper account
router.post('/register', (req, res) => {
    DevelopperMng.create(req.body)
        .then((value) => {
            console.log("Creation Sucessful!\n");
            res.status(200).send(value);
        })
        .catch((err) => {
            console.log("Error Creation : " + err.message);
            res.status(500).send(err.message);
        });
});


// update the developper information
router.put('/:id', (req, res) => {
    DevelopperMng.update(req.params.id, req.body)
        .then((value) => {
            console.log("Update sucess !");
            res.status(200).send();
        })
        .catch((err) => {
            console.log("Error updating : " + err.message);
            res.status(500).send();
        });
});


// deleted the developper account (HARD DELETED)
router.delete('/:id', (req, res) => {
    DevelopperMng.delete(req.params.id)
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

