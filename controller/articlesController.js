var articlesService     = require('../service/articlesService');

var Create = function(req, res){
    articlesService.Create(req, res).then((articleData) => {
        if(articleData){
            res.json({
                'error' : false,
                'message' : 'Successfully create article',
                'data' : articleData
            });
        }else{
            res.json({
                'error' : true,
                'message' : 'Failed create article',
                'data' : ''
            });
        }
    });
}

var List = function(req, res){
    articlesService.List(req, res).then((articlesData) => {
        res.json({
            'error' : false,
            'message' : 'Successfully get list articles',
            'data' : articlesData
        });
    });
}

var Edit = function(req, res){
    articlesService.GetById(req, res).then((articleData) => {
        if(articleData){
            if(req.userId == articleData.created_by){
                articlesService.Edit(req, res).then((editArticleData) => {
                    if(editArticleData){
                        articlesService.GetById(req, res).then((articleData) => {
                            res.json({
                                'error' : false,
                                'message' : 'Successfully edit articles',
                                'data' : articleData
                            });
                        });
                    }else{
                        res.json({
                            'error' : false,
                            'message' : 'Nothing to update',
                            'data' : ''
                        });
                    }
                })
            }else{
                res.json({
                    'error' : true,
                    'message' : 'You are not article owner',
                    'data' : ''
                });
            }
        }else{
            res.json({
                'error' : true,
                'message' : 'Articles not found',
                'data' : ''
            });
        }
    });
}

module.exports = {
    Create : Create,
    List : List,
    Edit : Edit
}