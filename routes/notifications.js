var express = require('express');
var router = express.Router();
var app = require('../app');
var list = [];

var historySize = 100;
var Notification = function (httpmethod, hostname, ip, baseUrl, query) {
    this.httpmethod = httpmethod;
    this.hostname = hostname;
    this.ip = ip;
    this.baseUrl = baseUrl;
    this.query = query;
};

router.get('/', function(req, res, next) {
    console.log('Receive request GET (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);
    res.send(list);
});

router.get('/io', function(req, res, next) {
    console.log('Receive request GET (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);
    res.sendFile(appRoot + '/views/html/index.html');
});

router.put('/', function(req, res, next) {
    console.log('Receive request PUT (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);

    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    app.emitMessage(query);

    console.log(list.size);
    if(list.length >= historySize) {
        list.splice(0, 1);
    }

    list.push(new Notification('PUT', req.hostname, req.ip, req.baseUrl, query));
    res.send();
});

router.post('/', function(req, res, next) {
    console.log('Receive request PUT (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);

    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    app.emitMessage(query);

    console.log(list.size);
    if(list.length >= historySize) {
        list.splice(0, 1);
    }

    list.push(new Notification('POST', req.hostname, req.ip, req.baseUrl, query));
    res.send();
});

module.exports = router;