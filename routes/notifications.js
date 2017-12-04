var express = require('express');
var router = express.Router();
var io = require('socket.io')(http);

router.get('/', function(req, res, next) {
    console.log('Receive request POST (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);
    res.sendFile(appRoot + '/views/html/index.html');
});

router.put('/', function(req, res, next) {
    console.log('Receive request POST (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);
    io.emit('notificationEvt', { for: 'everyone' });
});

module.exports = router;