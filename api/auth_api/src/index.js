require('dotenv').config()

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const credentialMng = require("./models/CredentialsMng");

app.use(express.json())

const rolesChecking = require('./utils/role')

//const db = require('./models/index')

/**
 * @api {get} /auth/authenticate Checks Access Token
 * @apiPermission none
 * @apiName GetAuth
 * @apiGroup Auth
 * @apiSampleRequest off
 * @apiDescription Api route to check access tokens <code>(internal to the server)</code>.
 *
 *
 * @apiHeader {String} authorization Authorization token.
 * @apiHeaderExample {json} Authorization-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDcmVkZW50aWFsTG9naW4iOiJ2aXNpdG9yIiwiQ3JlZGVudGlhbEFzc29jaWF0ZWRVc2VySUQiOiJOb3QgZGVmaW5lZCIsIkNyZWRlbnRpYWxVc2VyUm9sZSI6NSwiaWF0IjoxNjc4MjcxMDA0LCJleHAiOjE2NzgzNTc0MDR9.N1piubrRODHtOL8sWCT1IuykvazL5hMw91F0jvBBrA8"
 *     }
 * 
 * 
 *  @apiSuccessExample Success-Response:
 *     text 200 OK
 *     OK
 *
 * @apiError Unauthorized The authorization is missing.
 *
 * @apiErrorExample Error-Unauthorized:
 *     JSON 401 Unauthorized 
 *     {
 *       "error": "Authorization missing"
 *     }
 * 
 * @apiError Forbidden The authorization is not sufficient.
 *
 * @apiErrorExample Error-Forbidden:
 *     JSON 403 Forbidden
 *     {
 *       "error": "Insufficient authorization"
 *     }
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} Error-Internal-Server-Error:
 *     JSON 500 Internal Server Error
 *     {
 *       "error": "Undefined message"
 *     }
 */

app.get('/auth/authenticate', authenticateToken);

async function authenticateToken(req, res) {
    try {
        console.log('/auth/authenticate progressing')
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token === undefined) {
            console.log("Token undefined ! user rejected ")
            return res.status(401).json({ error: "Authorization missing" })
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("Authentification Failed : " + err.message)
                return res.status(403).json({ error: "Wrong authorization" })
            }

            req.user = user
            console.log("Authentification Success : ", user)
            return res.sendStatus(200)
        })
    } catch (error) {
        console.log("An error occured while generating a visitor token");
        res.status(500).json({ error: error });
    }
}

/**
 * @api {get} /auth/visitor_token Get Visitor Token
 * @apiPermission none
 * @apiName GetVisitorToken
 * @apiGroup Auth
 * @apiDescription Api route to get a token for Visitors.
 * 
 * @apiSuccess {String} accessToken Generated token for Visitors.
 *
 * @apiSuccessExample {json} Success-Response:
 *     JSON 200 OK
 *     {
 *       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDcmVkZW50aWFsTG9naW4iOiJ2aXNpdG9yIiwiQ3JlZGVudGlhbEFzc29jaWF0ZWRVc2VySUQiOiJOb3QgZGVmaW5lZCIsIkNyZWRlbnRpYWxVc2VyUm9sZSI6NSwiaWF0IjoxNjc4MTkyNDQ5LCJleHAiOjE2NzgyNzg4NDl9.2tZKoNPwbP8WsfUwSajtBY2E7gOctHNEzJ0leV4YuAM"
 *     }
 *
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} Error-Internal-Server-Error:
 *     JSON 500 Internal Server Error
 *     {
 *       "error": "Undefined message"
 *     }
 */

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

/**
 * @api {get} /auth/user_role/:user_id Get User Role
 * @apiPermission none
 * @apiName GetUserRole
 * @apiGroup Auth
 * @apiDescription Api route to get the Role of an User.
 *
 * @apiParam {String} user_id Unique ID of an User Credentials.
 * 
 * @apiSuccess {Number} userRole Role of the User <code>(1-4 if existent user_id else 5)</code>.
 *
 * @apiSuccessExample Success-Response-Existent-User:
 *     JSON 200 OK
 *     {
 *       "userRole": 1
 *     }
 *
 * @apiSuccessExample Success-Response-Nonexistent-User:
 *     JSON 200 OK
 *     {
 *       "userRole": 5
 *     }
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} Error-Internal-Server-Error:
 *     JSON 500 Internal Server Error
 *     {
 *       "error": "Undefined message"
 *     }
 */

app.get('/auth/user_role/:user_id', async (req, res) => {
    try {
        const user = await credentialMng.getById(req.params.user_id)
        if (user) {
            return res.status(200).json({ userRole: user.CredentialUserRole });
        } else {
            return res.status(200).json({ userRole: 5 });
        }
    } catch (error) {
        console.log("An error occured while generating a visitor token");
        res.status(500).json({ error: error });
    }
})

/**
 * @api {get} /auth/user_credential/:user_id Get User Credentials
 * @apiPermission none
 * @apiName GetCredentials
 * @apiGroup Auth
 * @apiDescription Api route to get the credentials of an user.
 *
 * @apiParam {String} user_id Unique ID of an User Credentials.
 * 
 * @apiSuccess {String} CredentialLogin Login of the Credentails.
 * @apiSuccess {String} CredentialEmail Email of the Credentails.
 * @apiSuccess {String} CredentialPhone Phone of the Credentails.
 * @apiSuccess {String} CredentialAssociatedUserID Id of the associated User.
 * @apiSuccess {String} CredentialID Id of the Credentials.
 * @apiSuccess {String} CredentialUserRole  Role of the Credentails.
 *
 * @apiSuccessExample Success-Response:
 *     JSON 200 OK
 *     {
 *       "CredentialLogin": "john.doe",
 *       "CredentialEmail": "john.doe@mail.com",
 *       "CredentialPhone": "+33000000000",
 *       "CredentialAssociatedUserID": "52450aa1-7ec1-4dfb-8ac1-4058767aedc8",
 *       "CredentialID": "3312d4a1-aa5f-4def-a8b8-292a1fd3b4fe",
 *       "CredentialUserRole": 1
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Not-Found:
 *     JSON 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} Error-Internal-Server-Error:
 *     JSON 500 Internal Server Error
 *     {
 *       "error": "Undefined message"
 *     }
 */

app.get('/auth/user_credential/:user_id', async (req, res) => {
    try {
        const user = await credentialMng.getById(req.params.user_id)
        if (user) {
            return res.status(200).json({
                CredentialLogin: user.CredentialLogin,
                CredentialEmail: user.CredentialEmail,
                CredentialPhone: user.CredentialPhone,
                CredentialAssociatedUserID: user.CredentialAssociatedUserID,
                CredentialID: user.CredentialID,
                CredentialUserRole: user.CredentialUserRole,
            });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log("An error occured while generating a visitor token");
        res.status(500).json({ error: error });
    }
})

/**
 * @api {put} /auth/user_credential/:user_id Put User Credentials
 * @apiPermission none
 * @apiName PutCredentials
 * @apiGroup Auth
 * @apiDescription Api route to get the credentials of an user.
 * 
 * @apiParam {String} user_id Unique ID of an User Credentials.
 * 
 * @apiBody {String} [CredentialLogin] Login of the Credentails.
 * @apiBody {String} [CredentialEmail] Email of the Credentails.
 * @apiBody {String} [CredentialPhone] Phone of the Credentails.
 * @apiBody {String} [CredentialPassword] Password of the Credentials.
 *
 *  @apiSuccessExample Success-Response:
 *     text 200 OK
 *     OK 
 *
 * @apiError Unauthorized The <code>username</code> and/or <code>password</code> of the User are empty.
 * @apiErrorExample {json} Error-Unauthorized:
 *     JSON 401 Unauthorized
 *     {
 *       "error": "Missing credentials"
 *     }
 * @apiError NotAllowed The <code>username</code> and/or <code>password</code> of the User are incorrect.
 * @apiErrorExample {json} NotAllowed:
 *     JSON 403 Forbidden
 *     {
 *       "error": "Incorrect credentials"
 *     }
 * @apiError UserNotFound The <code>username</code> of the User was not found.
 * @apiErrorExample {json} Error-Not-Found:
 *     JSON 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} Error-Internal-Server-Error:
 *     JSON 500 Internal Server Error
 *     {
 *       "error": "Undefined message"
 *     }
 */

app.put('/auth/user_credential/:user_id', async (req, res) => {
    try {
        await credentialMng.update(req.params.user_id, req.body);
        res.sendStatus(200);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

})

/**
 * @api {get} /auth/status Checks Auth Service
 * @apiPermission none
 * @apiName ChecksAuth
 * @apiGroup Auth
 * @apiDescription Api route to check if the auth service is alive.
 *
 * @apiSuccess {String} status Status of the Auth service.
 *
 * @apiSuccessExample Success-Response:
 *     JSON 200 OK
 *     {
 *       "status": "Still alive"
 *     }
 *
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} Error-Internal-Server-Error:
 *     JSON 500 Internal Server Error
 *     {
 *       "error": "Undefined message"
 *     }
 */

app.get('/auth/status/', (req, res) => {
    try {
        res.status(200).json({ status: "Still alive" });
    } catch (error) {
        console.log("An error occured while generating a visitor token");
        res.status(500).json({ error: error });
    }
})

/**
 * @api {post} /auth/login Login With Credentials
 * @apiPermission Visitor (5)
 * @apiName PostLogin
 * @apiGroup Auth
 * @apiDescription Api route to login and get an access token.
 * 
 * @apiHeader {String} authorization Authorization token.
 * @apiHeaderExample {json} Authorization-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDcmVkZW50aWFsTG9naW4iOiJ2aXNpdG9yIiwiQ3JlZGVudGlhbEFzc29jaWF0ZWRVc2VySUQiOiJOb3QgZGVmaW5lZCIsIkNyZWRlbnRpYWxVc2VyUm9sZSI6NSwiaWF0IjoxNjc4MjcxMDA0LCJleHAiOjE2NzgzNTc0MDR9.N1piubrRODHtOL8sWCT1IuykvazL5hMw91F0jvBBrA8"
 *     }
 * 
 * 
 * @apiBody {String} username          Username of the User (mail, phone or login).
 * @apiBody {String} password          Password of the User. must be hashed
 * @apiBody {Number} userRole          Role of the User.
 * @apiError Unauthorized The <code>username</code> and/or <code>password</code> of the User are empty.
 * @apiErrorExample {json} Error-Unauthorized:
 *     JSON 401 Unauthorized
 *     {
 *       "error": "Missing credentials"
 *     }
 * @apiError NotAllowed The <code>username</code> and/or <code>password</code> of the User are incorrect.
 * @apiErrorExample {json} Error-Forbidden:
 *     JSON 403 Forbidden
 *     {
 *       "error": "Incorrect credentials"
 *     }
 * @apiError UserNotFound The <code>username</code> of the User was not found.
 * @apiErrorExample {json} Error-Not-Found:
 *     JSON 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 * @apiError (Error 5xx) InternalServerError Something went wrong.
 * @apiErrorExample {json} Error-Internal-Server-Error:
 *     JSON 500 Internal Server Error
 *     {
 *       "error": "Undefined message"
 *     }
 */

app.post('/auth/login', rolesChecking.checkRole([rolesChecking.roles.Visitor]), async (req, res) => {
    try {
        if (!req.body.username || req.body.username === '' || !req.body.password || req.body.password === '') {
            console.log("Credential received not valid");
            return res.status(401).json({ error: 'Missing credentials' });
        }

        const user = await credentialMng.getByUserName(req.body.username, req.body.userRole)

        if (!user) {
            console.log("Credential not found");
            return res.status(404).json({ error: 'User not found' });
        }

        if (await bcrypt.compare(req.body.password, user.CredentialPassword)) {
            // if (req.body.password == user.CredentialPassword) {

            const credential = {
                CredentialLogin: user.CredentialLogin,
                CredentialID: user.CredentialID,
                CredentialUserRole: user.CredentialUserRole,
                CredentialAssociatedUserID: user.CredentialAssociatedUserID,
            }

            const accessToken = generateAccessToken(credential);

            res.status(200).json({ accessToken: accessToken, credential: credential });
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
