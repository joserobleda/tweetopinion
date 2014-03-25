(function (w, undefined) {
	'use strict';
	var limit = 139;

	$('.comment textarea').on('keypress paste', function (e) {
		var length 		= $(this).val().length;
		var remaining 	= limit-length;

		if (length > limit) {
			e.preventDefault();
			$('.counter').first().addClass('red');
		} else {
			$('.counter').html(remaining);
		}
	});

	$('.comment textarea').on('keyup', function (e) {
		// capturing delete event. This does not work with keypress
		var length 		= $(this).val().length;
		var remaining 	= limit-length;
		if(e.keyCode == 8) {
			if (remaining > 0) {
				$('.counter').first().removeClass('red');
			}
			$('.counter').html(remaining);
		}
	})


}(window))