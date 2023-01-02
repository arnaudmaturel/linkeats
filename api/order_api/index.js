//Import dependencies
const express = require('express');
require('dotenv').config()


//Initialize express
const app = express();


//Read JSON
app.use(express.json());


//MONGODB Connect
const db = require('./models')
db.mongoose
    .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch(err => {
        console.error(err);
        process.exit()
    });


//Routes
app.get('/orders', (req, res) => {
    db.sensor.find()
        .then((sensors)=>{
            res.status(200).json({message: sensors});
        }).catch((err)=>{
            res.status(404).json({message:'Sensor not existing'});
        });
});

app.get('/orders/:id', (req, res) => {
    var id = req.params.id;
    db.sensor.findOne({id: id})
        .then((sensor)=>{
            res.status(200).json({message:sensor});
        }).catch((err)=>{
            res.status(404).json({message:'Sensor not existing'});
        });
});

app.post('/orders', (req, res) => {
    var newSensor = {
        id: req.body.id,
        type: req.body.type,
        datas: req.body.datas,
        metrics: req.body.metrics,
    };
    db.sensor.findOne({id: req.body.id})
        .then( (sensor) => {
            if (sensor) {
                return res.status(409).json({message:`Sensor already exists`})
            }            
            db.sensor.create(newSensor)
                .then((success)=>{
                    res.status(201).json({message:`Sensor ${newSensor.id} created`})
                })
                .catch((err)=>{
                    res.status(500).json({message:err});
                });
        })
        .catch((err) => {
            res.status(500).json({message: err})
        });
});

app.put('/orders/:id', (req, res) => {
    var sensorId = req.params.id;
    var sensorValues = {
        type: req.body.type,
        datas: req.body.datas,
        metrics: req.body.metrics,
    };
    const documentBefore = db.sensor.findOneAndUpdate(
        {id: sensorId},
        sensorValues,
        { ReturnDocument : "before" }
    )
        .then((success)=>{
            res.status(200).json({message:`Sensor updated`});
        }).catch((err)=>{
            res.status(404).json({message:`Sensor not found`})
        }); 
    console.log(documentBefore)
});

app.delete('/orders/:id', (req, res) => {
    let sensorId = req.params.id
    db.sensor.findOneAndDelete({id: sensorId})
        .then((success)=>{
            res.status(200).json({message:`Sensor deleted`});
        })
        .catch((err)=>{
            res.status(404).json({message:`Sensor not found`});
        });    
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});