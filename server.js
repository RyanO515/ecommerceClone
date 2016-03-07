var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user")

var app = express();

mongoose.connect('mongodb://root:ramman15@ds023458.mlab.com:23458/ecommerce123', function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("connected to the database");
	}
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post("/create-user", function (req, res, next) {
	var user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function (err) {
		if (err) {
			return next(err);
		}

		res.json('Successfully created new user');
	})
});

// get home route

app.get("/", function (req, res) {
	res.send("Hello!");
});

app.get("/catname", function (req, res) {
	res.json("misty and mittens");
});

app.listen(3000, function () {
	console.log("Server is running!");
});