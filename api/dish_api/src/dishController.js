// gère les routes

// const { json } = require('express');
const express = require('express');
const dishMng = require('./dishMng');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('image')


const router = express.Router();


const rolesChecking = require('./utils/role')

router.post('/upload', async (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log("Copy File Failed");
            res.status(500).json(err);
        }
        else {
            console.log("Copy File Success !")
            var url = `/usr/src/app/src/images/${req.params}`;
            res.status(200).send(url);
        }
    })
});


router.post('/', rolesChecking.checkRole([rolesChecking.roles.Restaurant]), (req, res) => {
    dishMng.create(req.body)
        .then((value) => {
            console.log("Sucessful creation !");
            res.send(200, value);
        })
        .catch((err) => {
            console.log("error Creation ! : " + err.message);
            res.send(500).send(err);
        });
});


router.get('/:id', rolesChecking.checkRole([rolesChecking.roles.Visitor, rolesChecking.roles.Restaurant, rolesChecking.roles.Client]), (req, res) => {
    console.log(req.params.id);
    const d = dishMng.getById(req.params.id);
    d.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing founded");
    })
        .catch((err) => res.json(err));
});


router.get('/', rolesChecking.checkRole([rolesChecking.roles.Visitor, rolesChecking.roles.Restaurant, rolesChecking.roles.Client]), (req, res) => {
    const d = dishMng.getAll();
    d.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing founded");
    })
        .catch((err) => res.json(err));
});


router.get('/by-restaurant/:id', rolesChecking.checkRole([rolesChecking.roles.Visitor, rolesChecking.roles.Restaurant, rolesChecking.roles.Client]), (req, res) => {
    console.log(req.params.id);
    const d = dishMng.getByRestaurantId(req.params.id);
    d.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing founded");
    })
        .catch((err) => res.json(err));
});


router.put('/:id', rolesChecking.checkRole([rolesChecking.roles.Restaurant]), (req, res) => {
    dishMng.update(req.params.id, req.body)
        .then((value) => {
            console.log("Sucessful update !");
            res.send(200, value);
        })
        .catch((err) => {
            console.log("error update ! : " + err.message);
            res.send(500).send(err);
        });
});


router.delete('/:id', rolesChecking.checkRole([rolesChecking.roles.Restaurant]), (req, res) => {
    console.log(req.params.id);
    dishMng.delete(req.params.id)
        .then((value) => {
            console.log("Sucessful delete !");
            res.send(200, value);
        })
        .catch((err) => {
            console.log("error delete ! : " + err.message);
            res.send(500).send(err);
        });
});

module.exports = router;