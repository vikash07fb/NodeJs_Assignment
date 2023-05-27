

const jwt = require('jsonwebtoken');
const {JWT_KEY} = require("../config/serverConfig");

async function validateToken(req, res, next) {
    const token = req.headers.x_token;
    try {
        const decoded = await jwt.verify(token, JWT_KEY);
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
            err : error.name
        });
    }
}

module.exports ={
    validateToken
}
