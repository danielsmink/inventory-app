var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var inventory = require('./inventory');

var app = express();
var expressHbs = require('express-handlebars');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs'}))
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.route('/')
    // list all our inventory items
    .get(inventory.list)
    // create new inventory items
    .post(inventory.create);

app.get('/new', inventory.new);

app.route('/:id')
    // view a single item
    .get(inventory.show)
    // update a single item
    .post(inventory.update)
    // delete a single item
    .delete(inventory.delete);

app.route('/:id/edit')
    // open edit form
    .get(inventory.edit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

if (app.get('env') === 'development') {
    mongoose.connect('mongodb://localhost');
} else {
    mongoose.connect(process.env.MONGOLAB_URI);
}

var db = mongoose.connection;
db.on('error', function callback () {
    console.error('connection error');
});
db.once('open', function callback () {
    console.error('connection success');
});

module.exports = app;
