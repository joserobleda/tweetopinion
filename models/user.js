
	var app		= require('neasy');
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
			console.log(this.get('user'));
			T.get('users/show', { screen_name: this.get('user') }, function (err, res) {
				console.log(res);
			});
		}
	});

	User.class = 'users';

	module.exports = User;