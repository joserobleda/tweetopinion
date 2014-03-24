(function(){

	function onLoad () {
		var tweets = Array.prototype.slice.call(document.querySelectorAll(".tweet"));


		tweets.forEach(function (tweet) {
			//console.log(tweet);
			var tweetId = tweet.getAttribute('data-tweet-id');
			var userName = tweet.getAttribute('data-screen-name');

			var tweetURL = "https://twitter.com/"+userName+"/status/" + tweetId;
			var url = "http://tweetopinion.com/" +userName+ "?reply=" + encodeURIComponent(tweetURL);

			var replyLinK = tweet.querySelector('li.action-reply-container');

			var anonymousReply = document.createElement('li');
			anonymousReply.innerHTML = '<a role="button" href="'+url+'" target="_blank" class="with-icn"><span class="Icon Icon--reply"></span><b>AnonyReply</b></a>';

      		replyLinK.insertBefore(anonymousReply);
		});
	};

	onLoad();

}());