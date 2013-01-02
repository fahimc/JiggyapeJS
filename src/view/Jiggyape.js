var Jiggyape = {
		init:function()
		{
			Jiggyape.view.element.searchBox = document.getElementById(Jiggyape.view.id.searchBox);
			Jiggyape.view.element.searchButton = document.getElementById(Jiggyape.view.id.searchButton); 
			Jiggyape.view.element.searchList = document.getElementById(Jiggyape.view.id.searchList);
			Jiggyape.view.element.searchBar = document.getElementById(Jiggyape.view.id.searchBar);
			Jiggyape.view.element.playList = document.getElementById(Jiggyape.view.id.playList);
			
			Utensil.addListener(window,"resize",Jiggyape.event.onResize);
			Spider.event.addListener(Jiggyape.view.id.searchButton,"click",Jiggyape.event.onSearch);
		}
};

Jiggyape.view = {
		att:{
			videoId:"video-id",
			videoTitle:"video-title"
		},
	id : {
		searchListHolder : 'searchListHolder',
		playListHolder : 'playListHolder',
		searchBox : 'searchBox',
		searchButton : 'searchButton',
		searchList : 'searchList',
		searchBar : 'searchbar',
		playList : 'playList',
	},
	element : {
		searchBox : null,
		searchButton : null,
		searchList : null,
		searchBar : null,
		playList : null
	},
	removeSeachList : function() {
		var searchList = Jiggyape.view.element.searchList;
		var arr = new Array();
		var a;
		for (a = 0; a < searchList.childNodes.length; a++) {
			if (searchList.childNodes[a].tagName == "LI") {
				arr.push(searchList.childNodes[a]);
			}
		}
		for (a = 0; a < arr.length; a++) {
			searchList.removeChild(arr[a]);
		}
	},
	createSearchItem:function(entry,index)
	{
		console.log(entry);
		var searchList = Jiggyape.view.element.searchList;
		var li = document.createElement('li');
		li.className ="searchListLi";
		
		var ul = document.createElement('ul');
		ul.id="entry"+index;
		ul.setAttribute(Jiggyape.view.att.videoId,entry['media$group']['media$player'][0]['url']);
		ul.setAttribute(Jiggyape.view.att.videoTitle,entry.title['$t']);
		ul.className="searchItemUL";
		var li1 = document.createElement('li');
		var li2 = document.createElement('li');
		var li3 = document.createElement('li');
		var li4 = document.createElement('li');
		
		li1.className =li2.className =li3.className = "searchItemLI";
		li4.className="clearBoth";
		
		ul.appendChild(li1);
		ul.appendChild(li2);
		ul.appendChild(li3);
		ul.appendChild(li4);
		
		var img = new Image();
		img.src=entry['media$group']['media$thumbnail'][0]['url'];
		img.className="searchItemImage";
		li1.appendChild(img);
		
		var p = document.createElement('p');
		p.className = "title";
		p.innerHTML = entry.title['$t'];
		li2.appendChild(p);
		
		
		li.appendChild(ul);
		
		Spider.event.addListener(ul.id,"click",Jiggyape.event.onAddToPlaylist);
		searchList.appendChild(li);
		
		
	},
	addToPlaylist:function(title,videoURL)
	{
		var playList = Jiggyape.view.element.playList;
		var li = document.createElement('li');
		li.className ="playListLi";
		li.setAttribute(Jiggyape.view.att.videoId,videoURL);
		
		var p = document.createElement('p');
		p.className = "title";
		p.innerHTML = title;
		li.appendChild(p);
		
		
		playList.appendChild(li);
		Spider.toast("added to playlist");
	}
}
Jiggyape.event = {
	onSearch : function() {
		var searchBox = Jiggyape.view.element.searchBox;
		if (searchBox.value != "") {
			Jiggyape.view.removeSeachList();
			YoutubeService.getVideos(searchBox.value, Jiggyape.event.onList, "", null, null,
					null, YoutubeService.negativeTermsList,
					YoutubeService.SearchOrder.ORDER_BY_RELEVANCE,
					YoutubeService.SearchRacy.RACY_INCLUDE, 1, 50);
		}
	},
	onList : function(t, x) {
		var data = eval('(' + t + ')');
		var searchList = Jiggyape.view.element.searchList;
		var li;
		var p;

		for ( var a = 0; a < data.feed.entry.length; a++) {
			var entry = data.feed.entry[a];
			Jiggyape.view.createSearchItem(entry,a);
		}
		Jiggyape.event.onResize();
	},
	onAddToPlaylist:function(item,event)
	{
		var element =event.srcElement ||event.target;
		var videoURL = element.getAttribute(Jiggyape.view.att.videoId)?element.getAttribute(Jiggyape.view.att.videoId):element.parentNode.getAttribute(Jiggyape.view.att.videoId);
		var videoTitle = element.getAttribute(Jiggyape.view.att.videoTitle)?element.getAttribute(Jiggyape.view.att.videoTitle):element.parentNode.getAttribute(Jiggyape.view.att.videoTitle);
		Jiggyape.view.addToPlaylist(videoTitle, videoURL);
	},
	onResize : function() {
		var header = document.getElementById(Spider.data.id.header);
		var footer = document.getElementById(Spider.data.id.footer);

		document.getElementById(Jiggyape.view.id.searchListHolder).style.height = (Utensil
				.stageHeight()
				- header.clientHeight - footer.clientHeight - Jiggyape.view.element.searchBar.clientHeight)
				+ "px";
		

		document.getElementById(Jiggyape.view.id.playListHolder).style.height = (Utensil
				.stageHeight()
				- header.clientHeight - footer.clientHeight - Jiggyape.view.element.searchBar.clientHeight)
				+ "px";
		Spider.updateScrollers();
	}
}
Jiggyape.service = {

}