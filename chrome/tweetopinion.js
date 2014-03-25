(function(){

	function handleTweet (tweet) {
		var tweetId = tweet.getAttribute('data-tweet-id');
		var userName = tweet.getAttribute('data-screen-name');

		var tweetURL = "https://twitter.com/"+userName+"/status/" + tweetId;
		var url = "http://tweetopinion.com/" +userName+ "?reply=" + encodeURIComponent(tweetURL);

		var replyLinK = tweet.querySelector('li.action-reply-container');

		var anonym = tweet.querySelector('.anonym');

		if (anonym) {
			return;
		}

		var anonymousReply = document.createElement('li');
		anonymousReply.innerHTML = '<a role="button" href="'+url+'" target="_blank" class="with-icn anonym"><span class="Icon Icon--reply"></span><b>AnonyReply</b></a>';

  		replyLinK.insertBefore(anonymousReply);
	};


	function checkTweets (context) {
		context = context || document;
		var tweets = Array.prototype.slice.call(context.querySelectorAll(".tweet"));

		tweets.forEach(handleTweet);
	};



	document.addEventListener('DOMSubtreeModified', function (e) {
		var className = e.target.getAttribute('class');

		if (className && className.toString().indexOf('original-tweet') !== -1) {
			handleTweet(e.target);
		} else {
			checkTweets(e.target);
		}
	}, false);

	checkTweets();
	
}());