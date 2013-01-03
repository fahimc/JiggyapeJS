(function(window) {
	var searchBox;
	var searchButton;
	var searchList ;
	var searchBar ;
	
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
			//window.addEventListener("orientationchange", onResize);
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
		Spider.init();
		Jiggyape.init();	
		
	}
	function onReady()
	{
		setTimeout(function(){Spider.toast("Swipe right to goto the next page");},1000);
		Jiggyape.event.onResize();

	}

	Main();
}
)(window);
