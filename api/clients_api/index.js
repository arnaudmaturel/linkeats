require('dotenv').config()

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')

app.use(express.json())

const db = require('./models/index')

app.get('/users', async (req, res) => {
    // const users = sequelize.models.User.findAll();
    // res.json(users)
    const users = await db.user.findAll();
    // console.log(users)
    // console.log(users.every(user => user instanceof sequelize.models.User)); // true
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        if (await db.user.findOne({ where: { name: req.body.username } }) === null) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = {
                name: req.body.username,
                password: hashedPassword,
            }
            await db.user.create(user);
            // console.log("Jane's auto-generated ID:", jane.id);
        } else {
            return res.status(409).send('User already existing')
        }
        res.sendStatus(201)
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

app.listen(3000);
