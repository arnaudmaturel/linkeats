//Import dependencies
const express = require('express');
require('dotenv').config()


//Initialize router
const router = express.Router()

const db = require('./models/index')
const orderStatuses = require('./models/orderStatuses')

//Routes
router.get('/', (req, res) => {
    try {
        db.order.OrderModel.find()
            .then((orders)=>{
                res.status(200).send(orders);
            }).catch((err)=>{
                res.status(404).json({error:'Order not existing'});
            });
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/:id', (req, res) => {
    try {
        var orderId = req.params.id;
        db.order.OrderModel.findOne({orderId: orderId})
            .then((order)=>{
                res.status(200).send(order);
            }).catch((err)=>{
                res.status(404).json({message:'Order not existing'});
            });
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.post('/', (req, res) => {
    checkAllRequiredKeys(req.body, db.order.OrderSchema) 

    newOrder = req.body
    db.order.OrderModel.create(newOrder)
        .then(()=>{
            res.status(201).json({message:`Order ${newOrder._id} created`})
        })
        .catch((error)=>{
            res.status(500).json({error: error});
        });
});

router.put('/:id', (req, res) => {
    try {
        checkAllRequiredKeys(req.body, db.order.OrderSchema)

        var orderId = req.params.id;
        db.order.OrderModel.findOneAndUpdate(
            {orderId: orderId},
            req.body,
            { ReturnDocument : "before" }
        )
            .then(()=>{
                res.status(200).json({message:`Order updated`});
            }).catch((err)=>{
                res.status(404).json({message:`Order not found`})
            }); 
    } catch (error) {
        res.status(500).json({error: error});
    }

});

router.delete('/:id', (req, res) => {
    try {
        let orderId = req.params.id
        db.order.OrderModel.findOneAndUpdate(
            {orderId: orderId},
            {RgpdObjectIsDeleted: true}
        )
            .then((success)=>{
                res.status(200).json({message:`Order deleted`});
            })
            .catch((err)=>{
                res.status(404).json({message:`Order not found`});
            });
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/statuses', (req, res) => {
    try {
        res.status(200).send(orderStatuses);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

function checkAllRequiredKeys(reqBody, schema) {
    const reqBodyKeys = Object.keys(reqBody);
    const schemaKeys = Object.keys(schema);


    for (const reqBodyKey of reqBodyKeys) {
        if (!schemaKeys.includes(reqBodyKey)) {
            return res.status(400).json({error: `Unknown key "${reqBodyKey}" provided`});
        }
    } 

    for (const schemaKey of schemaKeys) {
        if (
            schema.schemaKey.required && schema.schemaKey.default === undefined &&
            (!reqBodyKeys.includes(schemaKey) || reqBody.schemaKey === "")
        ) {
            return res.status(400).json({error: `Missing value for key "${schemaKey}"`});
        }
    }
}


module.exports = router;