var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

router.get('/', function(request, response) {
    response.send(cool());
});

module.exports = router;