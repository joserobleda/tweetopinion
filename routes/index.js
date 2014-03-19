
	var app 		= require('neasy');
	var controller 	= require('../controllers/user.js');
	
	app.get('/', controller.index);