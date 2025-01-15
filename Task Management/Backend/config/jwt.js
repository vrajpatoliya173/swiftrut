const jwt = require('jsonwebtoken');
const ENV_VARS = require('./envVars');

const jwtAuthMiddleware = (req, res, next) => {

    const token = req.cookies['taskmanage-jwt'];
    // const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(400).json({ msg: 'Access denied. No token provided!!', status: 0, response: 'error' });
    }

    try {
        // verify to jwt token
        const isVerified = jwt.verify(token, ENV_VARS.JWT_SECRET);
        req.user = isVerified.userdata;
        // res.locals.user = req.user;
        next();

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Invalid token!!', status: 0, response: 'error' });
    }

}

// function to generate jwt token
const generateToken = (userData) => {
    // generate a new jwt token using userData  
    return jwt.sign(userData,  ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
}


module.exports = { jwtAuthMiddleware, generateToken };