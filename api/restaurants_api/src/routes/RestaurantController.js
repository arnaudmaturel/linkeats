const express = require('express');
const restaurantMng = require('../Models/RestaurantMng')
const router = express.Router();
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


const rolesChecking = require('../utils/role');


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

router.get('/', (req, res) => {
    const c = restaurantMng.getAll({}, "RestaurantName RestaurantIsOpen RestaurantStars RestaurantDeliveryRange");
    c.then((value) => {
        if (value)
            res.status(200).json(value)
        else
            res.status(404).send();
    })
        .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
    const c = restaurantMng.getByIdFiltered(req.params.id, "RestaurantName RestaurantIsOpen RestaurantStars RestaurantDeliveryRange");
    c.then((value) => {
        if (value)
            res.json(value)
        else
            res.send("Nothing found ");
    })
        .catch((err) => res.json(err));
});

// get info of the restaurant account specified in the id
router.get('/:id/account', (req, res) => {
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

