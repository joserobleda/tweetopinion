
	var Message = require('../models/message');


	module.exports = {

		store: function (req, res, next) {
			var data = {
				text: req.body.message,
				screen_name: req.params.screen_name,
				date: new Date()
			};

			var message = new Message(data);

			message.save().then(function () {
				res.redirect('/' + data.screen_name);
			});
		}
	};