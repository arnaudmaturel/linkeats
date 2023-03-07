// gère les routes

// const { json } = require('express');
const express = require('express');
const dishMng = require('./discountMng');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const id = await dishMng.create(req.body)
        console.log("Sucessful creation !" + id);
        res.status(200).json(id);
    }
    catch (err) {
        console.log("error Creation ! : " + err.message);
        res.status(500).json(err);
    }
});

// route 
router.get('/status', (req, res) => {
    console.log('Discount server is alive');
    res.sendStatus(200);
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const discount = await dishMng.getById(req.params.id);
        console.log(`Discount ${req.params.id} found Succesfully !`)
        res.status(200).json(discount);
    }
    catch (err) {
        console.log(`Error :${req.params.id} not found !`);
        res.status(404).json(err);
    }
});


router.get('/', async (req, res) => {

    try {
        const discounts = await dishMng.getAll();
        console.log(`${discounts.length} Discounts found Succesfully !`)
        res.status(200).json(discounts)
    }
    catch (err) {
        res.send("Nothing founded");
        res.status(500).json(err);
    }

});


router.get('/by-client/:id', async (req, res) => {
    try {
        const discounts = await dishMng.getByClientId(req.params.id);
        console.log(`${discounts.length} Discounts for the client ${req.params.id} found Succesfully !`)
        res.status(200).json(discounts)
    }
    catch (err) {
        console.log(`Nothing founded for the client ${req.params.id}`);
        res.status(404).json(err);
    }

});


router.put('/:id', async (req, res) => {
    try {
        await dishMng.update(req.params.id, req.body);
        console.log(`Discount ${req.params.id} Sucessful updated !`);
        res.status(200).send();
    }
    catch (err) {
        console.log(`Error Updating for Discount ${req.params.id} :` + err.message);
        res.send(500).send(err);
    }

});


router.delete('/:id', async (req, res) => {
    try {
        await dishMng.delete(req.params.id)
        console.log(`Sucess : Discount ${req.params.id} deleted !`);
        res.send(200).send();
    }
    catch (err) {
        console.log(`Error deleting Discount ${req.params.id} :` + err.message);
        res.send(500).send(err);
    }
});

module.exports = router;