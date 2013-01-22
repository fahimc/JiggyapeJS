(function(window) {
	var searchBox;
	var searchButton;
	var searchList ;
	var searchBar ;
	
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
			window.addEventListener("orientationchange", Jiggyape.event.onResize);
		} else {
			window.attachEvent("onload", onLoad);
		}
		//setup youtube player
		YoutubePlayerJS.stateChangeEvent = Jiggyape.view.VideoView.onstateChange;
		YoutubePlayerJS.errorEvent = Jiggyape.view.VideoView.errorEvent;
		YoutubePlayerJS.readyEvent = Jiggyape.view.VideoView.readyEvent;
		YoutubePlayerJS.init();
	}

	function onLoad() {
		Event.addListener(Spider,Spider.event.COMPLETE,onReady);
		Spider.data.className.scroller ="listScroller";
		Spider.init();
		Jiggyape.init();	
		FacebookJS.APP_ID = "331166713658859";
		FacebookJS.init();
	}
	function onReady()
	{
		Jiggyape.event.onResize();

	}

	Main();
}
)(window);
