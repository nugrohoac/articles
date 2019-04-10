var express             = require('express');
var authController      = require('../controller/authController');
var authRouter          = express.Router();

authRouter.route('/register')
    .post(authController.Register);

authRouter.route('/login')
    .post(authController.Login);
    
module.exports = authRouter;