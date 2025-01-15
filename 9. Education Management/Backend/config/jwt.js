const jwt = require('jsonwebtoken');
const ENV_VARS = require('./envVars');

const jwtAuthMiddleware = (req, res, next) => {

    const admintoken = req.cookies['admindata-jwt'];
    const teachertoken = req.cookies['teacherdata-jwt'];
    const studenttoken = req.cookies['studentdata-jwt'];

    try {
        // verify to jwt token
        if(admintoken){
            const adminverify = jwt.verify(admintoken, ENV_VARS.JWT_SECRET);
            req.admin = adminverify.admindata;
            return next();
        }
        if(teachertoken){
            const teacherverify = jwt.verify(teachertoken, ENV_VARS.JWT_SECRET);
            req.user = teacherverify.teacherdata;
            return next();
        }
        if(studenttoken){
            const studentverify = jwt.verify(studenttoken, ENV_VARS.JWT_SECRET);
            req.user = studentverify.studentdata;
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
    return jwt.sign(userData,  ENV_VARS.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { jwtAuthMiddleware, generateToken };