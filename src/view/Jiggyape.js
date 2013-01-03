var Jiggyape = {
	init : function() {
		Jiggyape.view.element.searchBox = document
				.getElementById(Jiggyape.view.id.searchBox);
		Jiggyape.view.element.searchButton = document
				.getElementById(Jiggyape.view.id.searchButton);
		Jiggyape.view.element.searchList = document
				.getElementById(Jiggyape.view.id.searchList);
		Jiggyape.view.element.searchBar = document
				.getElementById(Jiggyape.view.id.searchBar);
		Jiggyape.view.element.playList = document
				.getElementById(Jiggyape.view.id.playList);

		Utensil.addListener(window, "resize", Jiggyape.event.onResize);
		Spider.event.addListener(Jiggyape.view.id.searchButton, "click",
				Jiggyape.event.onSearch);
	}
};
Jiggyape.data = {
	currentIndex : 0,
	playlist : {
		total : 0
	}
}
Jiggyape.view = {
	att : {
		videoId : "video-id",
		videoTitle : "video-title"
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
	createSearchItem : function(entry, index) {

		var searchList = Jiggyape.view.element.searchList;
		var li = document.createElement('li');
		li.className = "searchListLi";
		li.setAttribute('index', index);

		var ul = document.createElement('ul');
		ul.id = "entry" + index;
		ul.setAttribute(Jiggyape.view.att.videoId,
				entry['media$group']['media$player'][0]['url']);
		ul.setAttribute(Jiggyape.view.att.videoTitle, entry.title['$t']);
		ul.className = "searchItemUL";
		var li1 = document.createElement('li');
		var li2 = document.createElement('li');
		var li3 = document.createElement('li');
		var li4 = document.createElement('li');

		li1.className = li2.className = li3.className = "searchItemLI";
		li4.className = "clearBoth";

		ul.appendChild(li1);
		ul.appendChild(li2);
		ul.appendChild(li3);
		ul.appendChild(li4);

		var img = new Image();
		img.src = entry['media$group']['media$thumbnail'][0]['url'];
		img.className = "searchItemImage";
		li1.appendChild(img);

		var p = document.createElement('p');
		p.className = "title";
		p.innerHTML = entry.title['$t'];
		li2.appendChild(p);

		li.appendChild(ul);

		var addButton = document.createElement('div');
		addButton.id = "add-" + index;
		addButton.className = 'addButton';
		addButton.setAttribute(Jiggyape.view.att.videoId,
				entry['media$group']['media$player'][0]['url']);
		addButton.setAttribute(Jiggyape.view.att.videoTitle, entry.title['$t']);
		li3.appendChild(addButton);

		li2.id = "searchTitleHolder-" + index;
		li2.style.width = (Utensil.stageWidth() - 60 - 66) + "px";

		Spider.event.addListener(addButton.id, "click",
				Jiggyape.event.onAddToPlaylist);
		searchList.appendChild(li);
		
	},
	addToPlaylist : function(title, videoURL) {

		var playList = Jiggyape.view.element.playList;
		var li = document.createElement('li');
		li.className = "playListLi";
		li.setAttribute(Jiggyape.view.att.videoId, videoURL);

		var p = document.createElement('p');
		p.id = "playListTitleHolder-" + Jiggyape.data.playlist.total;
		p.className = "title";
		p.innerHTML = title;
		p.style.width = (Utensil.stageWidth() - 86) + "px";
		li.appendChild(p);

		var playButton = document.createElement('div');
		playButton.id = "playButton-" + Jiggyape.data.playlist.total;
		playButton.className = "playButton";
		playButton.setAttribute(Jiggyape.view.att.videoId, videoURL);
		playButton.setAttribute(Jiggyape.view.att.videoTitle, title);
		playButton.setAttribute('index', Jiggyape.data.playlist.total);
		li.appendChild(playButton);

		var clear = document.createElement('div');
		clear.className = 'clearBoth';
		li.appendChild(clear);

		Spider.event.addListener(playButton.id, "click",
				Jiggyape.event.onPlaylistPlayClicked);

		playList.appendChild(li);
		Jiggyape.data.playlist.total++;
		Spider.toast("added to playlist");
	}
}
Jiggyape.event = {
	onSearch : function() {
		var searchBox = Jiggyape.view.element.searchBox;
		if (searchBox.value != "") {
			Jiggyape.view.removeSeachList();
			YoutubeService.getVideos(searchBox.value, Jiggyape.event.onList,
					"", null, null, null, YoutubeService.negativeTermsList,
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
			Jiggyape.view.createSearchItem(entry, a);
		}
		Jiggyape.event.onResize();
	},
	onAddToPlaylist : function(item, event) {
		var element = event.srcElement || event.target;

		element.className += " smallControlSelected";

		var videoURL = element.getAttribute(Jiggyape.view.att.videoId) ? element
				.getAttribute(Jiggyape.view.att.videoId)
				: element.parentNode.getAttribute(Jiggyape.view.att.videoId);
		var videoTitle = element.getAttribute(Jiggyape.view.att.videoTitle) ? element
				.getAttribute(Jiggyape.view.att.videoTitle)
				: element.parentNode.getAttribute(Jiggyape.view.att.videoTitle);
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
		Jiggyape.view.VideoView.resize();
		Jiggyape.view.SearchView.resize();
		
		Spider.updateScrollers();
	},
	onPlaylistPlayClicked : function(item, event) {
		
		
		var previous = document.getElementById("playButton-" + Jiggyape.data.currentIndex);
		if(previous)previous.className =previous.className.replace("smallControlSelected","");
		
		var element = event.srcElement || event.target;
		if(element.className.indexOf('smallControlSelected')<0)element.className += " smallControlSelected";
		
		
		var videoURL = element.getAttribute(Jiggyape.view.att.videoId) ? element
				.getAttribute(Jiggyape.view.att.videoId)
				: element.parentNode.getAttribute(Jiggyape.view.att.videoId);
		YoutubePlayerJS.loadVideoById(YoutubePlayerJS.getVideoId(videoURL));
		YoutubePlayerJS.playVideo();
		Jiggyape.data.currentIndex =element.getAttribute('index');
	}
}
Jiggyape.service = {

}
Jiggyape.view.SearchView = {
	resize : function() {
		var searchList = Jiggyape.view.element.searchList;
		for (a = 0; a < searchList.childNodes.length; a++) {
			if (searchList.childNodes[a].tagName == "LI") {
				var index = searchList.childNodes[a].getAttribute('index');
				var li = document.getElementById('searchTitleHolder-' + index);
				li.style.width = (Utensil.stageWidth() - 60 - 66) + "px";
			}
		}
	}
}
Jiggyape.view.PlayListView = {
	nextSong : function() {
		var playList = Jiggyape.view.element.playList;
		var childIndex = -1;
		
		var element = document.getElementById("playButton-" + Jiggyape.data.currentIndex);
		if(element)element.className =element.className.replace("smallControlSelected","");
		
		if (Jiggyape.data.currentIndex >= Jiggyape.data.playlist.total)
			Jiggyape.data.currentIndex = 0;
		for ( var a = 0; a < playList.childNodes.length; a++) {
			var child = playList.childNodes[a];

			if (child.getAttribute && child.getAttribute(Jiggyape.view.att.videoId)) {
				childIndex++;
				if ((Jiggyape.data.currentIndex + 1) == childIndex) {
					Jiggyape.data.currentIndex++;
					this.playSong(child.getAttribute(Jiggyape.view.att.videoId))
					a = playList.childNodes.length + 1;
					var element = document.getElementById("playListTitleHolder-" + Jiggyape.data.currentIndex);
					element.className += " smallControlSelected";
				}
			}
		}
	},
	playSong : function(videoURL) {
		YoutubePlayerJS.loadVideoById(YoutubePlayerJS.getVideoId(videoURL));
		YoutubePlayerJS.playVideo();
	},
	resize : function() {
		for ( var a = 0; a < Jiggyape.data.playlist.total; a++) {
			var child = document.getElementById("playListTitleHolder-" + a);
			if (child) {
				child.style.width = (Utensil.stageWidth() - 86) + "px";
			}
		}
	}
}
Jiggyape.view.VideoView = {
	playerId : 'player',
	onstateChange : function(data) {
		console.log("onstateChange", data);
		if (data == 0) {
			Jiggyape.view.PlayListView.nextSong();
		}
	},
	errorEvent : function(data) {
		Spider.toast("error: " + data);
	},
	resize : function() {
		var player = document.getElementById(this.playerId);
		player.style.height = (Utensil.stageHeight() - header.clientHeight
				- footer.clientHeight - Jiggyape.view.element.searchBar.clientHeight)
				+ "px";
	}
}