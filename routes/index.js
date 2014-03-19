
	var app 		= require('neasy');
	var controller 	= require('../controllers/user.js');
	
	app.get('/', controller.index);
	app.get('/:screen_name', controller.show);