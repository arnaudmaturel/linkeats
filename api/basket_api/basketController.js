// gère les routes

const { json } = require('express');
const express = require('express');
const basketMng = require('./basketMng');
const router = express.Router();


router.post('/',(req,res)=>
{
    basketMng.create(req.body)
    .then((value)=>{
        console.log("Sucessful creation !");
        res.send(200,value);
    })
    .catch((err)=>
    {
        console.log("error Creation ! : "+err.message);
        res.send(500).send(err);
    });
});

router.get('/:id', (req,res) => {
    console.log(req.params.id);
    const d = basketMng.getById(req.params.id);
    d.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing founded");
    })
        .catch((err) => res.json(err));
});


router.get('/', (req,res) => {
    const d = basketMng.getAll();
    d.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing founded");
    })
        .catch((err) => res.json(err));
});


//WIP à mettre dans l'API Restaurant
router.get('/by-client/:id', (req,res) => {
    console.log(req.params.id);
    const d = basketMng.getByClientId(req.params.id);
    d.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing founded");
    })
        .catch((err) => res.json(err));
});


router.put('/:id',(req,res)=>
{
    basketMng.update(req.params.id, req.body)
    .then((value)=>{
        console.log("Sucessful update !");
        res.send(200,value);
    })
    .catch((err)=>
    {
        console.log("error update ! : "+err.message);
        res.send(500).send(err);
    });
});


router.delete('/:id', (req,res) => {
    console.log(req.params.id);
    basketMng.delete(req.params.id)
    .then((value)=>{
        console.log("Sucessful delete !");
        res.send(200,value);
    })
    .catch((err)=>
    {
        console.log("error delete ! : "+err.message);
        res.send(500).send(err);
    });
});

module.exports = router;