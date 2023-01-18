require('dotenv').config()

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const credentialMng = require("./Models/CredentialsMng");

app.use(express.json())

const rolesChecking = require('./utils/role')

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

app.get('/auth/visitor_token', async (req, res) => {
    try {
        const accessToken = generateAccessToken({
            CredentialLogin: "visitor",
            CredentialAssociatedUserID: "Not defined",
            CredentialUserRole: rolesChecking.roles.Visitor
        });
        console.log("Visitor token generated");
        res.status(200).json({ accessToken });
    } catch (error) {
        console.log("An error occured while generating a visitor token");
        res.status(500).json({ error: error });
    }
});

app.get('/auth/user_role/:user_id', async (req, res) => {
    const user = await credentialMng.getById(req.params.user_id)
    if (user) {
        return res.status(200).json({ role: user.CredentialUserRole });
    } else {
        return res.status(200).json({ role: 5 });
    }
})

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

app.post('/auth/login', rolesChecking.checkRole([rolesChecking.roles.Visitor]) ,async (req, res) => {
    try {
        if (!req.body.username || req.body.username === '' || !req.body.password || req.body.password === '') {
            console.log("Crendential received not valid");
            return res.status(401).json({ error: 'Missing credentials' });
        }

        const user = await credentialMng.getByUserName(req.body.username, req.body.userRole)

        if (!user) {
            console.log("Credential not found");
            return res.status(404).json({ error: 'User not found' });
        }

        if (await bcrypt.compare(req.body.password, user.CredentialPassword)) {
            const accessToken = generateAccessToken({
                CredentialLogin: user.CredentialLogin,
                CredentialAssociatedUserID: user.CredentialAssociatedUserID,
                CredentialUserRole: user.CredentialUserRole
            });
            res.status(200).json({ accessToken });
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


function generateAccessToken(user) {
    return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

app.listen(3000);
