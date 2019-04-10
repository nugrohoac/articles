var jwt             = require('jsonwebtoken');
var secretKey       = require('../utils/config/secretKey');

var jwtMiddleware = function(req, res, next){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        var token = req.headers.authorization.split(' ')[1];
        req.token = token;
        jwt.verify(token, secretKey.jwtKey, function(err, decode){
            if(err){
                res.json({
                    status:401,
                    success: false,
                    message: 'Token invalid'
                })
            }
        })
        next();
    }else{
        res.json({
            status: 401,
            message: 'Please send token'
        })
    }
}

module.exports = {
    jwtMiddleware: jwtMiddleware
}