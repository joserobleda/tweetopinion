
	var User 	= require('../models/user');


	module.exports = {

		index: function (req, res, next) {

			if (req.query.screen_name) {
				return res.redirect('/' + req.query.screen_name);
			}

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

				// store a new user
				return User.store(data.screen_name);
			}).then(function (user) {
				return user.syncMessages();

			}).then(function (user) {
				var userData = user.toJSON();

				res.render('user.twig', {
					user: userData
				});
			});
		}
	};