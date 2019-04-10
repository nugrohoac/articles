var Users       = require('../model/usersModel');
var bcrypt      = require('bcrypt');
var secretKey   = require('../utils/constan/secretKeyConstant');
var state       = require('../utils/constan/stateConstant');

var Register = function(req, res){
    return new Promise((resolve, reject) => {
        Users.create({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password + secretKey.saltKey, 10),
            state : state.active
        }).then((saveUser) => {
            resolve(saveUser);
        }).catch((err) => {
            reject(err);
        });
    });
};

var GetByEmail = function(req, res){
    return new Promise((resolve, reject) => {
        Users.findOne({
            where : {
                email : req.body.email
            }
        }).then((userData)=> {
            resolve(userData);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    Register : Register,
    GetByEmail : GetByEmail
}