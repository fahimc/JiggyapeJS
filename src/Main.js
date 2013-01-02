(function(window) {
	var searchBox;
	var searchButton;
	var searchList ;
	
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
		
		searchBox = document.getElementById('searchBox');
		searchButton = document.getElementById('searchButton');
		searchList = document.getElementById('searchList');
		
		Utensil.addListener(window,"resize",onResize)
		Spider.event.addListener('searchButton',"click",onSearch);
		
	}
	function onReady()
	{
		
		
		setTimeout(function(){Spider.toast("Swipe right to goto the next page");},1000);
		
		var header = document.getElementById(Spider.data.id.header);
		var footer = document.getElementById(Spider.data.id.footer);
		document.getElementById('searchListHolder').style.height = (Utensil.stageHeight()-header.clientHeight-footer.clientHeight)+"px";
		Spider.updateScrollers();
		
		//_ws.getVideos(_extraSearchTerms + _searchTerm + _removeTerms, "", null, null, null, _negativeTerms, SearchOrder.ORDER_BY_RELEVANCE, SearchRacy.RACY_INCLUDE, 1, 50);
		
	}
	function onSearch()
	{
		
		if(searchBox.value!="")
		{
			removeSeachList();
			YoutubeService.getVideos(searchBox.value,onList,"",null,null,null,YoutubeService.negativeTermsList,YoutubeService.SearchOrder.ORDER_BY_RELEVANCE,YoutubeService.SearchRacy.RACY_INCLUDE,1,50);
		}
	}
	function removeSeachList()
	{
		var arr=new Array();
		var a;
		for(a=0;a<searchList.childNodes.length;a++)
		{
			if(searchList.childNodes[a].tagName =="LI")
			{
				arr.push(searchList.childNodes[a]);
			}
		}
		for(a=0;a<arr.length;a++)
		{
			searchList.removeChild(arr[a]);
		}
	}
	function onList(t,x)
	{
		var data = eval('(' + t + ')');
		
		var li;
		var p;
		for(var a=0;a<data.feed.entry.length;a++)
		{
			var entry = data.feed.entry[a];
			console.log(entry);
			li = document.createElement('li');
			p = document.createElement('p');
			p.innerHTML = entry.title['$t'];
			li.appendChild(p);
			searchList.appendChild(li);
			
		}
		onResize();
	}
	function onResize()
	{
		document.getElementById('searchListHolder').style.height = (Utensil.stageHeight()-header.clientHeight-footer.clientHeight)+"px";
		Spider.updateScrollers();
	}

	Main();
}
)(window);
