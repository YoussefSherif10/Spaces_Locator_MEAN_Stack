const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./app_api/models/db');

// const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

const app = express();

app.disable('etag');
// view engine setup
// app.set('views', path.join(__dirname, 'app_server', 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'app-public')));
app.use(express.static(path.join(__dirname, 'app-public', 'build')));

// allowing CORS access
app.use('/api', (req, res, next) => {
  const domains = ['https://spaces-locator.onrender.com/', 'http://localhost:3000', "http://localhost:4200"];
  if (domains.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  next();
})

// app.use('/', indexRouter);
app.use('/api', apiRouter);
app.get(/(\/about)|(\/location\/[a-z0-9]{24})/, (req, res, next) => {
  res.sendFile(path.join(__dirname, 'app-public', 'build', 'index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
