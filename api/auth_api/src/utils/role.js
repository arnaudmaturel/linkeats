roles = {
    Client: 1,
    Restaurant: 2,
    Deliveryman: 3,
    Developper: 4,
    Visitor: 5
}

function checkRole(roles) {
    return (req, res, next) => {
        try {
            if (roles.includes(req.user.role)) {
                next()
            } else {
                return res.status(403).json({ error: "Not allowed" });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}


module.exports = { roles, checkRole }