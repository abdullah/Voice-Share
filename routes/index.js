var express = require('express');
var router = express.Router();
/* GET home page. */


router.get('/', function(req, res, next) {
	res.render("index")
});

router.get('/voice', function(req, res, next) {
	res.render("voice")
});

module.exports = router;


