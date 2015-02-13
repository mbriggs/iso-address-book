var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var less = require('less-middleware');
var _ = require('lodash');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var dir = _.partial(path.join, __dirname);

// view engine setup
app.set('views', dir('views'));
app.set('view engine', 'hjs');

// middleware
[
    //favicon(dir('/public/favicon.ico')),
    logger('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser(),
    less(dir('public')),
    express.static(dir('public'))

].forEach(function(m){ app.use(m) });

app.use('/', routes);
app.use('/users', users);


// error handlers
app.use(function (req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next){
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;