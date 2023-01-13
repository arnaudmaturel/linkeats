require('dotenv').config()

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const credentialMng = require("./models/CredentialsMng");

app.use(express.json())

//const db = require('./models/index')

/**
 * @api {get} /auth/authenticate Check Access Token
 * @apiName GetAuth
 * @apiGroup Auth
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

app.get('/auth/authenticate', authenticateToken);

async function authenticateToken(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === undefined) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user
        return res.sendStatus(200)
    })
}

// WIP À remplacer par les données de la table users ou supprimer
users = [
    {
        "name": "Josh",
        "password": "$2b$10$QAwniK0df6b6yv4FzALIbutR/vR39Svi3ZkZmhO98v//QzX5cEPz6"
    }
]

app.post('/auth/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken === undefined) {
        res.sendStatus(401)
    }

    if (isRefreshTokenValid(refreshToken)) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.sendStatus(403)
            }
            const accessToken = generateAccessToken({ name: user.name })
            res.json({
                accessToken
            })
        })
    }
});


app.post('/auth/register', async (req, res) => {
    try {
        // const userCredential = await db.user.findOne({ where: { name: req.body.username } });
        // if (await db.user.findOne({ where: { name: req.body.username } }) === null) {
        //     return res.status(404).send('User not existing');
        // }
        const userCredential = credentialMng.getByUserName(req.body.username)

        if (!userCredential)
            res.sendStatus(404, "User not find");


        if (await bcrypt.compare(req.body.password, userCredential.password)) {
            // const accessToken = generateAccessToken({username: userCredential.username, role: userCredential.role});
            const accessToken = generateAccessToken({ username: userCredential.username });
            const refreshToken = jwt.sign({ username: userCredential.name }, process.env.REFRESH_TOKEN_SECRET);
            res.status(200).json({
                accessToken,
                refreshToken
            });
        } else {
            res.status(403).send('Not allowed');
        }
    } catch {
        res.sendStatus(500);
    }
});

/**
 * @api {post} /auth/login Login With Credentials
 * @apiName PostLogin
 * @apiGroup Auth
 * @apiDescription Api route to login.
 * Return an access token and a refresh token.
 * @apiBody {String} username          <code>Mandatory</code> Username of the User (mail, phone or login).
 * @apiBody {String} password          <code>Mandatory</code> Password of the User. must be hashed
 * @apiBody {int} userRole          <code>Mandatory</code> role of the User.
 * @apiError Unauthorized The <code>username</code> and/or <code>password</code> of the User are empty.
 * @apiErrorExample {json} Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Missing credentials"
 *     }
 * @apiError NotAllowed The <code>username</code> and/or <code>password</code> of the User are incorrect.
 * @apiErrorExample {json} NotAllowed:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Incorrect credentials"
 *     }
 * @apiError UserNotFound The <code>username</code> of the User was not found.
 * @apiErrorExample {json} UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 * @apiError UserNotFound Something went wrong.
 * @apiErrorExample {json} UserNotFound:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "User not found"
 *     }
 */

app.post('/auth/login', async (req, res) => {
    try {
        if (!req.body.username || req.body.username === '' || !req.body.password || req.body.password === '') {
            console.log("Crendential recieved not valid");
            return res.status(401).json({ error: 'Missing credentials' });
        }

        // const user = await db.user.findOne({ where: { name: req.body.username } });
        const user = await credentialMng.getByUserName(req.body.username, req.body.userRole)

        if (!user) {
            console.log("Credential not found");
            return res.status(404).json({ error: 'User not found' });
        }

        // if (await db.user.findOne({ where: { name: req.body.username } }) === null) {
        //     return res.status(404).json({ error: 'User not found' });
        // }

        // if (await bcrypt.compare(req.body.password, user.password)) {
        if (req.body.password == user.CredentialPassword) {
            // const accessToken = generateAccessToken({username: user.username, role: user.role});
            const accessToken = generateAccessToken({ username: user.username });
            const refreshToken = jwt.sign(
                { username: user.name },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: '30d',
                    issuer: "linkeats"
                }
            );
            res.status(200).json({
                accessToken,
                refreshToken
            });
            console.log(user.CredentialID + " aka " + user.CredentialLogin + " Crendential Successful !");
        } else {
            console.log(user.CredentialID + " aka " + user.CredentialLogin + " Crendential Incorrect !");
            res.status(403).json({ error: 'Incorrect credentials' });
        }
    } catch (error) {
        console.log("Error Login : " + error.message);
        res.status(500).json({ error: error });
    }
});


app.delete('/auth/logout', (req, res) => {
    popRefreshToken(req.body.token)
    res.sendStatus(204)
})

function generateAccessToken(user) {
    return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

function isRefreshTokenValid(refreshToken) {
    // WIP À éditer
    return true
}

function popRefreshToken(refreshToken) {
    // WIP À éditer
    return true
}

app.listen(3000);
