var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var casesRouter = require('./routes/cases');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coronavirus', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', casesRouter);

module.exports = app;
