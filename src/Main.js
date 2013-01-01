(function(window) {

	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
			//window.addEventListener("orientationchange", onResize);
		} else {
			window.attachEvent("onload", onLoad);
		}
		
	}

	function onLoad() {
		Event.addListener(Spider,Spider.event.COMPLETE,onReady);
		Spider.init();
		
		Utensil.addListener(window,"resize",onResize)
		
	}
	function onReady()
	{
		setTimeout(function(){Spider.toast("Swipe right to goto the next page");},1000);
		
		var header = document.getElementById(Spider.data.id.header);
		var footer = document.getElementById(Spider.data.id.footer);
		document.getElementById('searchListHolder').style.height = (Utensil.stageHeight()-header.clientHeight-footer.clientHeight)+"px";
		Spider.updateScrollers();
	}
	function onResize()
	{
		document.getElementById('searchListHolder').style.height = (Utensil.stageHeight()-header.clientHeight-footer.clientHeight)+"px";
		Spider.updateScrollers();
	}

	Main();
}
)(window);
