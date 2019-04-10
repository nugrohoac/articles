var express                 = require('express');
var articlesController      = require('../controller/articlesController');
var articlesRouter          = express.Router();

articlesRouter.route('/create')
    .post(articlesController.Create);

articlesRouter.route('/list')
    .post(articlesController.List);

articlesRouter.route('/edit')
    .post(articlesController.Edit);    

module.exports = articlesRouter;