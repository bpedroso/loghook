var express = require('express');
var router = express.Router();
// var mongo = require('mongodb').MongoClient;

router.get('/', function(req, res, next) {
    console.log('Receive request POST (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);
    res.status(201).send({message: 'respond with a resource'});
});

router.post('/', function(req, res, next) {
    console.log('Receive request POST (host %s ip %s baseUrl %s)', req.hostname, req.ip, req.baseUrl);
    res.status(201).send({message: 'respond with a resource'});
});

module.exports = router;