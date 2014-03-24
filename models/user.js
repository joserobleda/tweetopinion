
	var app		= require('neasy');
	var Q 		= app.require('q');
	var Model 	= require('neasy/model');
	var Message = require('./message.js');


	var Twit = require('twit');

	var T = new Twit({
		consumer_key: 'l9iwqBYwfDeEhFtxF02rg', 
		consumer_secret: 'IeuhfDxJlp5xDBoLoU5aWH4qbeEC9DIgmXguE44wyo', 
		access_token: '2409462433-1XSzLk5TLKXhzle6TKx8M8NGNCHwgJG1PNLMGlb', 
		access_token_secret: 'blNMV2CEJ2Rw0nGd8aD1XhxGpi74CaRZIhGo8eB4omyJJ'
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
		},

		// @override
		toJSON: function (options) {
			var json, messages;
		
			json = Model.prototype.toJSON.call(this, options);

			if (messages = this.get('messages')) {
				json.messages = messages.toJSON();
			}
		
			return json;
		},

		notificate: function () {
			var screen_name = this.get('screen_name');
			var message = "Hi @" + screen_name + ", you have a new anonymous message. http://tweetopinion.com/" + screen_name;
			T.post('statuses/update', { status: message }, function(err, reply) {
			  //  ...
			});
		},

		syncMessages: function () {
			var self, deferred, screen_name, sort;

			self 		= this;
			deferred 	= Q.defer();
			screen_name = this.get('screen_name');
			sort 		= [['date', 'desc']];

			Message.find({screen_name: screen_name}, {sort: sort}).then(function (messages) {
				self.set('messages', messages);
				deferred.resolve(self);
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