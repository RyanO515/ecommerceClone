var router = require('express').Router();



// get home route

router.get("/", function (req, res) {
	res.render('main/home');
});

// GET /about route

router.get("/about", function (req, res) {
	res.render('main/about');
});


module.exports = router;