var router = require('express').Router();
var User = require('../models/user');
var Product = require('../models/product');




// get home route

router.get("/", function (req, res) {
	res.render('main/home');
});

// GET /about route

router.get("/about", function (req, res) {
	res.render('main/about');
});

router.get('/products/:id', function (req, res, next) {
	Product
		.find({ category: req.params.id })
		.populate('category')
		.exec(function (err, products) {
			if (err) return next(err);

			res.render('main/category', {
				products: products
			});
		});
});

router.get('/product/:id', function (req, res, next) {
	Product.findById({ _id: req.params.id }, function (err, product) {
		if (err) return next(err);

		res.render('main/product', {
			product: product
		});
	});
});

// populate allows the products.category.name call in category.ejs


module.exports = router;