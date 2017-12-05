var express = require('express');
var router = express.Router();
var io = require('../bin/www');

router.get('/', function(req, res, next) {
    console.log('Receive request GET (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);
    res.sendFile(appRoot + '/views/html/index.html');
});

router.put('/', function(req, res, next) {
    console.log('Receive request PUT (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);
    io.emitMessage('Receive request PUT');
});

module.exports = router;