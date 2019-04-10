var Users       = require('../model/usersModel');
var bcrypt      = require('bcrypt');
var secretKey   = require('../utils/constan/secretKeyConstant');
var state       = require('../utils/constan/stateConstant');

var Register = function(req, res){
    Users.create({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password + secretKey.saltKey, 10),
        state : state.active
    }).then(function(saveUser){
        res.json({
            'error': false,
            'message' : 'Successfully register user',
            'data' : saveUser
        });
    });
};

module.exports = {
    Register : Register
}