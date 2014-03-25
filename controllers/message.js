
	var Message = require('../models/message');
	var User 	= require('../models/user');


	module.exports = {

		store: function (req, res, next) {
			if (req.body.message.length > 140) {
				res.status(403).send('Limit exceeded');
			}

			var data = {
				text: req.body.message,
				screen_name: req.params.screen_name,
				date: new Date()
			};

			if (req.body.reply) {
				data.reply = req.body.reply;
			}

			var message = new Message(data);

			message.save().then(function () {

				User.findOne({ screen_name: data.screen_name }).then(function (user) {
					if (user.get('notificated') != true) {
						user.set('notificated', true);
						user.save();

						user.notificate();
					}
				});

				res.redirect('/' + data.screen_name);
			});
		}
	};