const jwt = require('jsonwebtoken');
const ENV_VARS = require('./envVars');

const jwtAuthMiddleware = (req, res, next) => {

    const usertoken = req.cookies['userdata-jwt'];
    if(!usertoken){
        return res.status(400).json({ msg: 'Access denied. No token provided!!', status: 0, response: 'error' });
    }

    try {
        // verify to jwt token
        const userverify = jwt.verify(usertoken, ENV_VARS.JWT_SECRET);
        req.user = userverify.userdata;
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
    return jwt.sign(userData,  ENV_VARS.JWT_SECRET, { expiresIn: "1h" });
}


module.exports = { jwtAuthMiddleware, generateToken };