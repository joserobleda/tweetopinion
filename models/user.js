
	var app		= require('neasy');
	var Model 	= require('neasy/model');



	var User = Model.extend({
		collection: 'users'
	});

	User.class = 'users';

	module.exports = User;