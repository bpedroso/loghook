var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var cool = require('./routes/cool');
var notifications = require('./routes/notifications');

var http = require('http');
var io = require('socket.io')(http);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// app.use('/', index);
app.use('/notifications', notifications);
app.use('/cool', cool);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

global.appRoot = path.resolve(__dirname);

app.get('/', function(request, response) {
  response.render('pages/index')
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('new message', function (data) {
    console.log('received -> %s', data)

    socket.broadcast.emit('new message', {
      message: data
    });
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

function emitMessage(...args) {
  console.log(args);

  io.emit('new message', args)
}

module.exports.emitMessage = emitMessage;
module.exports = app;