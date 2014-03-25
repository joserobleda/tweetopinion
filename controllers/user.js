
	var User 	= require('../models/user');

	var OAuth = require('oauth').OAuth;

	var oauth = new OAuth(
				"https://api.twitter.com/oauth/request_token",
				"https://api.twitter.com/oauth/access_token",
				"l9iwqBYwfDeEhFtxF02rg",
				"IeuhfDxJlp5xDBoLoU5aWH4qbeEC9DIgmXguE44wyo",
				"1.0",
				"",
				"HMAC-SHA1"
			);
	oauth._authorize_callback = "http://localhost:5000/return";

	module.exports = {

		index: function (req, res, next) {

			if (req.query.screen_name) {
				return res.redirect('/' + req.query.screen_name);
			}

			res.render('index.twig');
		},

		/*
		fromTwitter: function (req, res) {
			var verifier = req.query.oauth_verifier;


			oauth.getOAuthAccessToken('pJx4X92FQUJtj2LuWr18pQ66a3Il5hC70atC3cizBU', 'jTErLsCj6UOK06t49GOQsfSb6LV4bFlJrPpL0dAc', verifier, function(error, oauth_access_token, oauth_access_token_secret, results) {
				if (error) return cb(error, req, res);

				return console.log(oauth_access_token, oauth_access_token_secret);
				that.access_token = results.access_token = oauth_access_token;
				that.access_token_secret = results.access_token_secret = oauth_access_token_secret;
				results.verifier = verifier;


				req.body = results;
				req.oauth = oauthData;
				req.referer = referer;

				cb(error, req, res);
			});
		},

		login: function (req, res, next) {

			oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results) {
				if (err) {
					return console.log(err);
				}

				req.session.twitter = {
					oauth: {
						token: oauth_token,
						token_secret: oauth_token_secret,
					}
				};

				console.log(req.session);

				res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
			});

		},*/

		show: function (req, res, next) {
			var data = { 
				screen_name: req.params.screen_name 
			};

			User.findOne(data).then(function (user) {
				if (user) {
					return user;
				}

				// store a new user
				return User.store(data.screen_name).fail(function (error) {
					res.render('index.twig', {error: 'User not found'});
				});
			}).then(function (user) {
				return user.syncMessages();

			}).then(function (user) {
				var viewData = {
					user: user.toJSON(),
					reply: false
				};

				if (req.query.reply) {
					viewData.reply = req.query.reply;
				}

				res.render('user.twig', viewData);
			});
		}
	};