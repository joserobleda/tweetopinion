	var User = require('../models/user');



	module.exports = {

		index: function (req, res, next) {
			res.render('index.twig');
		},

		show: function (req, res, next) {
			var user = new User(req.params);
			user.show();
		}
	};