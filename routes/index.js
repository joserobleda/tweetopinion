
	var app 		= require('neasy');
	var user 		= require('../controllers/user.js');
	var message 	= require('../controllers/message.js');
	
	app.get('/', user.index);

	// app.get('/login', user.login);
	// app.get('/return', user.fromTwitter);


	app.get('/:screen_name', user.show);

	app.post('/:screen_name/message', message.store);


