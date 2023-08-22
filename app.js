require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var auth = require("./middlewares/auth")

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//MONGO DB
var mongoose = require('mongoose');


var database = require("./db");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientsRouter = require('./routes/client');

var app = express();
database.connectToServer();

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(session({
  cookie: { maxAge: 60000 },
  genid: function (req) {
    return uuidv4()
  },
  secret: process.env.SESSION_SECRET || "EInEWjCD16FdFUT8/uUpTIQQyA6G8tZhXI/gJyp8Wev0V3OfK"
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/client', auth.check_current_user, clientsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
