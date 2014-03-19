
	var app		= require('neasy');
	var Q 		= app.require('q');
	var Model 	= require('neasy/model');


	var Twit = require('twit');

	var T = new Twit({
		consumer_key: 'nNhR0zSqlPU3r0m93AMcg', 
		consumer_secret: 'IsVKN8TSyPwdNctNAF5q9QInARf2utkhbWZ7ss8E5o', 
		access_token: '151658151-rOWMKHn2z5P1KU8d8J5U7ZN2n9E04X54Psvb8j6s', 
		access_token_secret: 'dRiKAV9oAyzNpJkTTf3k35KuqlksY8CWyPT8ASyDrXm0x'
	});


	var User = Model.extend({
		collection: 'users',

		show: function () {
			console.log(this.get('screen_name'));
		},

		sync: function () {
			var self, deferred, screen_name;

			self 		= this;
			deferred 	= Q.defer();
			screen_name = this.get('screen_name');

			T.get('users/show', { screen_name: screen_name }, function (err, res) {
				if (err) {
					return deferred.reject(new Error(err));
				}

				self.set(res);
				self.save().done(function () {
					deferred.resolve(self);
				});
			});

			return deferred.promise;
		}
	});

	User.store = function (screen_name) {
		var user = new User({ screen_name: screen_name });

		return user.sync();
	}

	User.class = 'users';

	module.exports = User;