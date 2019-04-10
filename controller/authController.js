var secretKey       = require('../utils/constan/secretKeyConstant');
var usersService    = require('../service/usersService');
var jwt             = require('jsonwebtoken');
var bcrypt          = require('bcrypt');

var Register = function(req, res){
    usersService.GetByEmail(req, res).then((userData) => {
        if(userData){
            res.json({
                'error' : true,
                'message' : 'email has already registered',
                'data' : ''
            });
        }else{
            usersService.Register(req, res).then((userData) =>{
                if(userData){
                    let token = jwt.sign({
                        time : Date.now(),
                        userId : userData.id,
                        userName : userData.username
                    }, secretKey.jwtKey, { expiresIn : 60 * 60 });
                    res.json({
                        'error' : false,
                        'message' : 'Successfully register user',
                        'data' : {
                            'id' : userData.id,
                            'name' : userData.name,
                            'userName' : userData.userName,
                            'email' : userData.email,
                            'state' : userData.state
                        },
                        'token' : token
                    });
                }else{
                    res.json({
                        'error' : true,
                        'message' : 'Failed register user',
                        'data' : ''
                    });
                }
            });
        }
    });    
};

var Login = function(req, res){
    usersService.GetByEmail(req, res).then((userData) => {
        if(userData){
            bcrypt.compare(req.body.password + secretKey.saltKey, userData.password, function(err, auth){
                if(auth){
                    let token = jwt.sign({
                        time : Date.now(),
                        userId : userData.id,
                        userName : userData.username
                    }, secretKey.jwtKey, { expiresIn : 60 * 60 });
                    res.json({
                        'error' : false,
                        'message' : 'Successfully login',
                        'data' : {
                            'id' : userData.id,
                            'name' : userData.name,
                            'userName' : userData.userName,
                            'email' : userData.email,
                            'state' : userData.state
                        },
                        'token' : token
                    });      
                }else{
                    res.json({
                        'error' : true,
                        'message' : 'Wrong password',
                        'data' : ''
                    })
                } 
            });
        }else{
            res.json({
                'error' : true,
                'message' : 'Email not found',
                'data' : ''
            });
        }
    })
}

module.exports = {
    Register : Register,
    Login : Login
}