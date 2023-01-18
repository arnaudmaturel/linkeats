const express = require('express');
const deliverimanMng = require('../Models/DeliverymanMng')
const router = express.Router();

const rolesChecking = require('../utils/role')

// get info of the deliveryman account specified in the id
router.get('/:id', rolesChecking.checkRole([rolesChecking.roles.Deliveryman]), (req, res) => {
    const c = deliverimanMng.getById(req.params.id);
    c.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing found ");
    })
        .catch((err) => res.json(err));
});


// create a deliveryman account
router.post('/register', rolesChecking.checkRole([rolesChecking.roles.Visitor]), (req, res) => {
    deliverimanMng.create(req.body)
        .then(() => {
            console.log("Creation Sucessful! Welcome of deliverymen account \n");
            res.status(200).json({accessToken});
        })
        .catch((err) => {
            console.log("Error Creation : " + err.message);
            res.status(500).send();
        });
});


// update the deliveryman information
router.put('/:id', rolesChecking.checkRole([rolesChecking.roles.Deliveryman]), (req, res) => {
    deliverimanMng.update(req.params.id, req.body)
        .then((value) => {
            console.log("Update sucess !");
            res.status(200).send();
        })
        .catch((err) => {
            console.log("Error updating : " + err.message);
            res.status(500).send();
        });
});


// deleted the deliveryman account (HARD DELETED)
router.delete('/:id', rolesChecking.checkRole([rolesChecking.roles.Deliveryman]), (req, res) => {
    deliverimanMng.delete(req.params.id)
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

