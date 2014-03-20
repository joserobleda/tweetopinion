
	var app		= require('neasy');
	var Q 		= app.require('q');
	var Model 	= require('neasy/model');


	var Message = Model.extend({

	});


	Message.class = 'messages';

	module.exports = Message;	