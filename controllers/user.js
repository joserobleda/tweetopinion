
	var User 	= require('../models/user');


	module.exports = {

		index: function (req, res, next) {
			res.render('index.twig');
		},

		show: function (req, res, next) {
			var data = { 
				screen_name: req.params.screen_name 
			};

			User.findOne(data).then(function (user) {
				if (user) {
					return user;
				}

				return User.store(data.screen_name);
			}).then(function (user) {
				res.render('index.twig', {
					user: user.toJSON()
				});
			});
		}
	};