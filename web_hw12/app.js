//processing middleware
module.exports = function(db) {
    var express = require('express');
    var path = require('path');
    var Parser1 = require('cookie-parser');
    var Parser = require('body-parser');
    var session = require('express-session');
    var repository = require('session-file-store')(session);
    var record = require('morgan');
    var routes = require('./routes/router')(db);
    var app = express();

    // view
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // middleware
    app.use(record('dev'));
    app.use(Parser.json());
    app.use(Parser.urlencoded({ extended: false }));
    app.use(Parser1());
    app.use(session({
        store: new repository(),
        secret: 'hongchh',
        resave: false,
        saveUninitialized: false
    }));

    // router
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', routes);

    return app;
};
