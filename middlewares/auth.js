require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    req.isAuth = false;
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return next();
    };

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log('JWT verification error: ', err);
        return next();
    }

    if (!decodedToken) {
        return next();
    }

    req.userId = decodedToken.userId;
    req.isAuth = true;
    return next();
};