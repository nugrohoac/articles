var Articles    = require('../model/articlesModel');
var state       = require('../utils/constan/stateConstant');
var Sequelize   = require('sequelize');
const Op = Sequelize.Op;

var Create = function(req, res){
    return new Promise((resolve, reject) => {
        Articles.create({
            title : req.body.title,
            content : req.body.content,
            thumbnail : req.body.thumbnail,
            state : state.active,
            created_by : req.userId,
            updated_by : req.userId
        }).then((saveArticle) => {
            resolve(saveArticle);
        }).catch((err) => {
            reject(err);
        })
    });
};

var GetById = function(req, res){
    return new Promise((resolve, reject) => {
        Articles.findOne({
            where : {
                id : req.body.id
            }
        }).then((article) => {
            resolve(article);
        }).catch((err) => {
            reject(err);
        })
    });
};

var List = function(req, res){
    return new Promise((resolve, reject) => {
        Articles.findAll({
            where : {
                title : {
                    [Op.substring] : req.body.title
                }
            }            
        }).then((articles) => {
            resolve(articles);
        }).catch((err) => {
            reject(err);
        })
    });
};

var Edit =  function(req, res){
    return new Promise((resolve, reject) => {
        Articles.update({
            title : req.body.title,
            content : req.body.content,
            thumbnail : req.body.thumbnail
        },{
            where: {
                id: req.body.id
            }
        }).then((editArticle) => {
            resolve(editArticle);
        }).catch((err) => {
            reject(err);
        })
    });
};

module.exports = {
    Create : Create,
    GetById : GetById,
    List : List,
    Edit : Edit
}