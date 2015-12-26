module.exports = function(db) {
    
    var userManager = require('../models/user')(db);
    var router = require('express').Router();

    //signup interface
    router.get('/regist', function(req, res, next) {
      res.render('signup', { user:{}, error:{} });
    });

    //form
    router.post('/regist', function(req, res, next) {
        userManager.checkData(req.body).then(function(result) {
            if (result.isOk) {
                userManager.addUser(req.body);
                req.session.user = req.body;
                res.redirect('/?username='+req.session.user.username);
            } else {
                res.render('signup', { user:req.body, error:result.error });
            }
        });
    });

    //detail interface
    router.get('/', function(req, res, next) {
        if (!req.session.user) {
            res.redirect('/signin');
        } else {
            if (!!req.query.username && req.query.username != req.session.user.username)
                res.render('detail', { message:"You can't visit the information of others!",
                    user:req.session.user });
            else
                res.render('detail', { message:"", user:req.session.user });
        }
    });

    //sign out
    router.get('/signout', function(req, res, next) {
        delete req.session.user;
        res.redirect('/signin');
    });

    //signin interface
    router.get('/signin', function(req, res, next) {
        res.render('signin', { user:{}, error:{} });
    });

    //form
    router.post('/signin', function(req, res, next) {
        userManager.findUser(req.body).then(function(result) {
            if (result.isOk) {
                req.session.user = result.user;
                res.redirect('/?username='+result.user.username);
            } else {
                res.render('signin', { user:req.body, error:result.error });
            }
        });
    });

    //otherwise
    router.all('*', function(req, res, next) {
        if (!req.session.user) {
            res.redirect('/signin');
        } else {
            res.redirect('/?username='+req.session.user.username);
        }
    });

    return router;
};
