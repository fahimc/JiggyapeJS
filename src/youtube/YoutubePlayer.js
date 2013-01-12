var YoutubePlayerJS = {
	playerId : 'player',
	seekTimer : null,
	event : {
		UNSTARTED : -1,
		ENDED : 0,
		PLAYING : 1,
		PAUSED : 2,
		BUFFERING : 3,
		VIDEO_CUED : 5,
		ERROR_INVALID_PARAM : 2,
		ERROR_NOT_FOUND : 100,
		ERROR_NOT_ALLOWED_EMBEDDABLE : 101,
		ERROR_NOT_ALLOWED : 150

	},
	quality : {
		SMALL : "small",
		MEDIUM : "medium",
		LARGE : "large",
		HD720 : "hd720",
		HD1080 : "hd1080",
		HIGHRES : "highres"
	},
	player : null,
	stateChangeEvent : null,
	readyEvent : null,
	timerEvent:null,
	errorEvent : null,
	init : function() {
		var tag = document.createElement('script');
		tag.src = "//www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	},
	onPlayerReady : function(event) {

		if (YoutubePlayerJS.readyEvent)
			YoutubePlayerJS.readyEvent();
		event.target.playVideo();
	},
	onPlayerStateChange : function(event) {
		if (YoutubePlayerJS.stateChangeEvent)
			YoutubePlayerJS.stateChangeEvent(event.data);
	},
	setPlaybackQuality : function(str) {
		YoutubePlayerJS.player.setPlaybackQuality(str);
	},
	onError : function(event) {
		clearInterval(YoutubePlayerJS.seekTimer);
		if (YoutubePlayerJS.errorEvent)
			YoutubePlayerJS.errorEvent(event.data);
	},
	stopVideo : function() {
		clearInterval(YoutubePlayerJS.seekTimer);
		YoutubePlayerJS.player.stopVideo();
	},
	playVideo : function() {
		YoutubePlayerJS.player.playVideo();
		clearInterval(YoutubePlayerJS.seekTimer);
		YoutubePlayerJS.seekTimer = setInterval(YoutubePlayerJS.onTimer, 100);
	},
	cueVideoById:function(id)
	{
		YoutubePlayerJS.player.cueVideoById(id);
	},
	pauseVideo : function() {
		clearInterval(YoutubePlayerJS.seekTimer);
		YoutubePlayerJS.player.pauseVideo();
	},
	loadVideoById : function(id) {
		YoutubePlayerJS.player.loadVideoById(id);
	},
	seekTo:function(value)
	{
		YoutubePlayerJS.player.seekTo(value);
	},
	getVideoId : function(url) {
		// "http://www.youtube.com/watch?v=LLKqqHc7s08&feature=youtube_gdata_player"
		var str1 = url.split('v=')[1];
		var str2 = str1.split('&');
		return str2[0];
	},
	onTimer : function() {
		if(YoutubePlayerJS.timerEvent)YoutubePlayerJS.timerEvent();
	},
	getDuration:function()
	{
		return YoutubePlayerJS.player.getDuration();
	},
	getCurrentTime:function()
	{
		return YoutubePlayerJS.player.getCurrentTime();
	}
}

function onYouTubeIframeAPIReady() {

	YoutubePlayerJS.player = new YT.Player(YoutubePlayerJS.playerId, {
		height : '100%',
		width : '100%',
		videoId : '',
		playerVars : {
			'autoplay' : '1',
			'controls' : '0',
			'iv_load_policy':'3',
			'html5':'0'
		},
		events : {
			'onReady' : YoutubePlayerJS.onPlayerReady,
			'onStateChange' : YoutubePlayerJS.onPlayerStateChange,
			'onError' : YoutubePlayerJS.onError
		}
	});

}
