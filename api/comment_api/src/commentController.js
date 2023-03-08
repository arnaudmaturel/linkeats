// gère les routes

// const { json } = require('express');
const express = require('express');
const dishMng = require('./commentMng');
const router = express.Router();

router.post('/', async (req, res) => {

    try {
        const id = await dishMng.create(req.body);
        console.log(`creation of comment ${id} Successful !`);
        res.status(200).json(id);
    }
    catch (err) {
        console.log("error Creation ! : " + err.message);
        res.send(500).json(err);
    }
});


// route 
router.get('/status', (req, res) => {
    console.log('Comments server is alive');
    res.sendStatus(200);
});

router.get('/:id', async (req, res) => {

    try {
        const comment = await dishMng.getById(req.params.id);
        console.log(`Comment ${req.params.id} found Sucessful !`);
        res.status(200).json(comment);
    }
    catch (err) {
        console.log(`Error Comment ${req.params.id} not fount ` + err.message);
        res.status(404).send();
    }
});


router.get('/', async (req, res) => {

    try {
        const comments = await dishMng.getAll();
        console.log(`${comments.length} coments found Sucessful !`)
        res.status(200).json(comments);

    }
    catch (err) {
        console.log(`Error no comment found : ` + err.message)
        res.status(500).json(err);
    }
});


router.get('/by-userNoted/:id', async (req, res) => {

    try {
        const comments = await dishMng.getByNotedUserId(req.params.id);
        console.log(`${comments.length} comments fount for the user ${req.params.id} `)
        res.status(200).json(comments);
    }
    catch (err) {
        console.log(`Error : no comment found for the user ${req.params.id} : ` + err.message)
        res.status(500).json(err);
    }

});

router.get('/by-client/:id', async (req, res) => {

    try {
        const comments = await dishMng.getByClientId(req.params.id);
        console.log(`${comments.length} comments fount for the client ${req.params.id} `)
        res.status(200).json(comments);
    }
    catch (err) {
        console.log(`Error : no comment found for the client ${req.params.id} : ` + err.message)
        res.status(500).json(err).send();
    }
});

router.get('/by-order/:id', async (req, res) => {

    try {
        const comments = await dishMng.getByOrderId(req.params.id);
        console.log(`${comments.length} comments fount for the order ${req.params.id} `)
        res.status(200).json(comments);
    }
    catch (err) {
        console.log(`Error : no comment found for the order ${req.params.id} : ` + err.message)
        res.status(500).json(err);
    }
});


router.put('/:id', async (req, res) => {

    try {
        await dishMng.update(req.params.id, req.body);
        console.log(`comment ${req.params.id} successfuly updated ! `);
        res.status(200).send();
    }
    catch (err) {
        console.log(`Error the comment ${req.params.id} update failed ! `);
        res.status(500).send();
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await dishMng.delete(req.params.id);
        console.log(`comment ${req.params.id} successfuly deleted ! `);
        res.status(200).send();
    }
    catch (err) {
        console.log(`Error the comment ${req.params.id} delete failed ! `);
        res.status(500).send();
    }
});

module.exports = router;