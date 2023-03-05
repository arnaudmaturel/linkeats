//Import dependencies
const express = require('express');
require('dotenv').config()


//Initialize router
const router = express.Router()

const db = require('./models/index')
const orderStatuses = require('./models/orderStatuses');


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



//Routes
router.get('/', (req, res) => {
    try {
        db.order.OrderModel.find()
            .then((orders) => {
                res.status(200).send(orders);
            })
    } catch (error) {
        console.log("Get All Faild : ", error)
        res.status(500).json({ error: error });
    }
});

router.get('/:id', (req, res) => {
    try {
        var orderId = req.params.id;
        db.order.OrderModel.findOne({ _id: orderId })
            .then((order) => {
                res.status(200).send(order);
            }).catch((err) => {
                console.log("Get by id Faild ", err);
                res.status(404).json({ message: 'Order not existing' });
            });
    } catch (error) {
        console.log("Get by id Faild ", error);
        res.status(500).json({ error: error });
    }
});


router.get('/by-restaurant/:id', (req, res) => {
    try {
        db.order.OrderModel.find({ RestaurantId: req.params.id })
            .then((order) => { res.status(200).send(order); })
            .catch((err) => {
                console.log("Get by restanrant id Faild ", err);
                res.status(404).json({ message: 'Order not existing' });
            });
    } catch (error) {
        console.log("Get by restanrant id Faild ", error);
        res.status(500).json({ error: error });
    }
});


router.get('/by-deliveryman/:id', (req, res) => {
    try {
        db.order.OrderModel.find({ DeliveryManId: req.params.id })
            .then((order) => { res.status(200).send(order); })
            .catch((err) => {
                console.log("Get by deliveryman id Faild ", err);
                res.status(404).json({ message: 'Order not existing' });
            });
    } catch (error) {
        console.log("Get by deliveryman id Faild ", error);
        res.status(500).json({ error: error });
    }
});


router.get('/by-client/:id', (req, res) => {
    try {
        db.order.OrderModel.find({ ClientId: req.params.id })
            .then((order) => { res.status(200).send(order); })
            .catch((err) => {
                console.log("Get by client id Faild ", err);
                res.status(404).json({ message: 'Order not existing' });
            });
    } catch (error) {
        console.log("Get by client id Faild ", error);
        res.status(500).json({ error: error });
    }
});




router.get('/by-status/:status', (req, res) => {
    try {
        db.order.OrderModel.find({ OrderStatus: req.params.status })
            .then((order) => { res.status(200).send(order); })
            .catch((err) => {
                console.log("Get by status " + req.params.status + " Faild ", err);
                res.status(404).json({ message: 'Order not existing' });
            });

    } catch (error) {
        console.log("Get by client id Faild ", error);
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req, res) => {
    //checkAllRequiredKeys(req.body, db.order.OrderSchema)

    newOrder = req.body

    var SimpleID = {
        Date: formatDate(new Date()),
        Id4Resto: 0,
        Id4Delivery: 0
    }

    var ordersResto = await db.order.OrderModel.find({ RestaurantId: req.body.RestaurantId });

    // .then((value) => ordersResto = value)
    // .catch((err) => { console.log("Creation failed, cannot define order quantity for the resto and date :", err) });

    SimpleID.Id4Resto = ordersResto.filter(o => o.SimpleID.Date == SimpleID.Date).length + 1;

    Object.assign(newOrder, { SimpleID });

    db.order.OrderModel.create(newOrder)
        .then(() => {
            console.log(`Creation Sucessful !`);
            res.status(200).json({ message: `Order created` })
        })
        .catch((error) => {
            console.log(`Creation failed : ${error}`);
            res.status(500).json({ error: error });
        });
});

function isEmptyOrSpaces(str) {
    return !str || str === null || str.match(/^ *$/) !== null;
}

router.put('/set-deliveryman/:id', async (req, res) => {
    try {
        var orderId = req.params.id;
        // db.order.OrderModel.findOneAndUpdate({ orderId: orderId }, req.body, { ReturnDocument: "before" })
        var order = await db.order.OrderModel.findOne({ _id: orderId });
        console.log("order.DeliveryManId", order.DeliveryManId);
        if (!order) {
            console.log("order not find with the id: " + orderId);
            res.status(404).send();
        }
        if (order.DeliveryManId != undefined) {
            console.log("Deliveryman already set");
            res.status(401).send();
            return;
        }

        var ordresDeliver = await db.order.OrderModel.find({ DeliveryManId: req.body.DeliveryManId });

        order.SimpleID.Id4Delivery = ordresDeliver.filter(o => o.SimpleID.Date == req.body.SimpleID.Date).length + 1;
        order.DeliveryManId = req.body.DeliveryManId;
        order.OrderStatus = req.body.OrderStatus;


        db.order.OrderModel.findOneAndUpdate({ _id: orderId }, order)
            .then(() => {
                console.log("Order Updated");
                res.status(200).json({ message: `Order updated` });
            })
            .catch((err) => {
                console.log("Order Update Fail", err);
                res.status(404).json({ message: `Order not found` })
            })
    }
    catch (error) {
        console.log("Order Set-Deliveryman Fail", error);
        res.status(500).json({ error: error });
    }

}
);

router.put('/:id', (req, res) => {
    try {

        var orderId = req.params.id;
        // db.order.OrderModel.findOneAndUpdate({ orderId: orderId }, req.body, { ReturnDocument: "before" })
        db.order.OrderModel.findOneAndUpdate({ _id: orderId }, req.body)
            .then(() => {
                console.log("Order Updated");
                res.status(200).json({ message: `Order updated` });
            })
            .catch((err) => {
                console.log("Order Update Fail", err);
                res.status(404).json({ message: `Order not found` })
            });
    } catch (error) {
        console.log("Order Update Fail", error);
        res.status(500).json({ error: error });
    }

});



router.delete('/:id', (req, res) => {
    try {
        let orderId = req.params.id
        db.order.OrderModel.findOneAndUpdate(
            { orderId: orderId },
            { RgpdObjectIsDeleted: true }
        )
            .then((success) => {
                console.log('Delete sucessfull')
                res.status(200).json({ message: `Order deleted` });
            })
            .catch((err) => {
                console.log('Delete Failed : ', err);
                res.status(404).json({ message: `Order not found` });
            });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/statuses', (req, res) => {
    try {
        res.status(200).send(orderStatuses);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

function checkAllRequiredKeys(reqBody, schema) {
    const reqBodyKeys = Object.keys(reqBody);
    const schemaKeys = Object.keys(schema);


    for (const reqBodyKey of reqBodyKeys) {
        if (!schemaKeys.includes(reqBodyKey)) {
            return res.status(400).json({ error: `Unknown key "${reqBodyKey}" provided` });
        }
    }

    for (const schemaKey of schemaKeys) {
        if (
            schema.schemaKey.required && schema.schemaKey.default === undefined &&
            (!reqBodyKeys.includes(schemaKey) || reqBody.schemaKey === "")
        ) {
            return res.status(400).json({ error: `Missing value for key "${schemaKey}"` });
        }
    }
}


module.exports = router;