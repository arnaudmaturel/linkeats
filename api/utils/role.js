const jwt = require('jsonwebtoken');


const roles = {
    Client: 1,
    Restaurant: 2,
    Deliveryman: 3,
    Developper: 4,
    Visitor: 5
}

function checkRole(allowedRoles) {
    return (req, res, next) => {

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token === undefined) {
            return res.status(401).json({error: "Authorization missing"})
        }

        //jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        var decoded = jwt.verify(token, 'e0be9704b5f630109fba20f88f3818e5220a1273aada86929b80c28a0fd33a5941d2ad8acf6052b81f9d868658b7a69241c55727091f7ea906bd5a23c8eb3aac');

        try {
            if (allowedRoles.includes(decoded.CredentialUserRole)) {
                next()
            } else {
                return res.status(403).json({ error: "Not allowed" });
            }
        } catch (error) {
            console.log('Allowed roles : ' + allowedRoles + '   |    curent role  : ' + decoded.CredentialUserRole);
            console.log('Role not checked : ' + error.message);
            res.status(500).json({ error: error });
        }
    }
}


module.exports = { roles, checkRole }