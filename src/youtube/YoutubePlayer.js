var YoutubePlayerJS = {
	playerId:'player',
	event:
	{
		UNSTARTED:-1,
		ENDED:0,
		PLAYING:1,
		PAUSED:2,
		BUFFERING:3,
		VIDEO_CUED:5,
		ERROR_INVALID_PARAM:2,
		ERROR_NOT_FOUND:100,
		ERROR_NOT_ALLOWED_EMBEDDABLE:101,
		ERROR_NOT_ALLOWED:150
		
	},
	quality:
	{
		SMALL:"small",
		MEDIUM:"medium",
		LARGE:"large",
		HD720:"hd720",
		HD1080:"hd1080",
		HIGHRES:"highres"
	},
	player : null,
	stateChangeEvent:null,
	readyEvent:null,
	errorEvent:null,
	init : function() {
		 var tag = document.createElement('script');
	      tag.src = "//www.youtube.com/iframe_api";
	      var firstScriptTag = document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	},
	onPlayerReady : function(event) {
		
		if(YoutubePlayerJS.readyEvent)YoutubePlayerJS.readyEvent();
		event.target.playVideo();
	},
	onPlayerStateChange : function(event) {
		if(YoutubePlayerJS.stateChangeEvent)YoutubePlayerJS.stateChangeEvent(event.data);
	},
	setPlaybackQuality:function(str)
	{
		YoutubePlayerJS.setPlaybackQuality(str);
	},
	onError:function(event)
	{
		if(YoutubePlayerJS.errorEvent)YoutubePlayerJS.errorEvent(event.data);
	},
	stopVideo : function() {
		YoutubePlayerJS.player.stopVideo();
	},
	playVideo : function() {
		YoutubePlayerJS.player.playVideo();
	},
	pauseVideo : function() {
		YoutubePlayerJS.player.pauseVideo();
	},
	loadVideoById : function(id) {
		YoutubePlayerJS.player.loadVideoById(id);
	},
	getVideoId:function(url)
	{
		//"http://www.youtube.com/watch?v=LLKqqHc7s08&feature=youtube_gdata_player"
		var str1 = url.split('v=')[1];
		var str2 = str1.split('&');
		return str2[0];
	}
}

function onYouTubeIframeAPIReady() {
	
	YoutubePlayerJS.player = new YT.Player(YoutubePlayerJS.playerId, {
		height : '100%',
		width : '100%',
		videoId : '',
		playerVars: { 'autoplay': 0, 'controls': 0 },
		events : {
			'onReady' : YoutubePlayerJS.onPlayerReady,
			'onStateChange' : YoutubePlayerJS.onPlayerStateChange,
			'onError' : YoutubePlayerJS.onError
		}
	});
	
}
