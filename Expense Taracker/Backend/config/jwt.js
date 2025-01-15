const jwt = require('jsonwebtoken');
const ENV_VARS = require('./envVars');

const jwtAuthMiddleware = (req, res, next) => {

    const admintoken = req.cookies['admindata-jwt'];
    const usertoken = req.cookies['userdata-jwt'];

    try {
        // verify to jwt token
        if(admintoken){
            const adminverify = jwt.verify(admintoken, ENV_VARS.JWT_SECRET);
            req.admin = adminverify.admindata;
            return next();
        }
        if(usertoken){
            const userverify = jwt.verify(usertoken, ENV_VARS.JWT_SECRET);
            req.user = userverify.userdata;
            return next();
        }
        return res.status(400).json({ msg: 'Access denied. No token provided!!', status: 0, response: 'error' });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Invalid token!!', status: 0, response: 'error' });
    }

}

// function to generate jwt token
const generateToken = (userData) => {
    // generate a new jwt token using userData  
    return jwt.sign(userData,  ENV_VARS.JWT_SECRET, { expiresIn: "1d" });
}


module.exports = { jwtAuthMiddleware, generateToken };