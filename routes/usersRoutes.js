var express             = require('express');
var userController      = require('../controller/usersController');
var userRouter          = express.Router();

userRouter.route('/register')
    .post(userController.Register);

module.exports = userRouter;