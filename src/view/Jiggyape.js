var Jiggyape = {
	init : function() {
		gesture.addToIgnore(Jiggyape.view.id.searchBox);
		Jiggyape.view.element.searchBox = document.getElementById(Jiggyape.view.id.searchBox);
		// Jiggyape.view.element.searchButton = document
		// .getElementById(Jiggyape.view.id.searchButton);
		Jiggyape.view.element.searchList = document.getElementById(Jiggyape.view.id.searchList);
		Jiggyape.view.element.searchBar = document.getElementById(Jiggyape.view.id.searchBar);
		Jiggyape.view.element.playList = document.getElementById(Jiggyape.view.id.playList);

		Utensil.addListener(window, "resize", Jiggyape.event.onResize);
		Utensil.addListener(document, "keyup", Jiggyape.event.onSearchKeyUp);

		// Spider.event.addListener(Jiggyape.view.id.searchButton, "click",
		// Jiggyape.event.onSearch);
		Spider.event.addListener('pagechange', Spider.event.type.onPageChange, Jiggyape.event.onPageChange);

		Spider.event.addListener('seekerHandle', Spider.event.type.drag, Jiggyape.event.onSeekerDrag);

		Spider.event.addListener('document', Spider.event.type.mouseup, Jiggyape.event.onDragUp);

		Spider.event.addListener('loginButton', Spider.event.type.click, Jiggyape.event.onLoginClicked);

		Jiggyape.view.VideoView.init();

		YoutubePlayerJS.timerEvent = Jiggyape.event.onYoutubeTimer;

		contextMenu.init();
		contextMenu.addItem('version: 1');
		contextMenu.addItem("<a href='http://jiggyape.com' target='_blank'>jiggyape.com</a>");

	}
};
Jiggyape.data = {
	currentIndex : 0,
	playlist : {
		total : 0,
		videoRemovedIndex : null,
	},
	player : {
		state : {
			PLAYING : "PLAYING",
			PAUSED : "PAUSED",
			STOPPED : "STOPPED",
			FORCED_PAUSED : "FORCED_PAUSED"
		},
		currentState : null,
		duration : 0,
		playlist : new Array()
	}
}
Jiggyape.view = {
	att : {
		videoId : "video-id",
		videoTitle : "video-title",
		playlistParent : "playlist-parent",
		videoDuration : "video-duration"
	},
	id : {
		searchListHolder : 'searchListHolder',
		playListHolder : 'playListHolder',
		searchBox : 'searchBox',
		searchButton : 'searchButton',
		searchList : 'searchList',
		searchBar : 'searchbar',
		playList : 'playList',
		playlistEntry : 'playlistentry-',
		videoBackButton : 'videoBackButton',
		previousVideoButton : 'previousVideoButton',
		nextVideoButtonId : 'nextVideoButton',
		playPauseButtonId : 'playPauseButton'
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
		ul.setAttribute(Jiggyape.view.att.videoId, entry['media$group']['media$player'][0]['url']);
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
		addButton.setAttribute(Jiggyape.view.att.videoId, entry['media$group']['media$player'][0]['url']);
		addButton.setAttribute(Jiggyape.view.att.videoTitle, entry.title['$t']);
		addButton.setAttribute(Jiggyape.view.att.videoDuration, entry['media$group']['yt$duration']['seconds']);

		li3.appendChild(addButton);

		li2.id = "searchTitleHolder-" + index;
		li2.style.width = (Utensil.stageWidth() - (70 + 76)) + "px";

		Spider.event.addListener(addButton.id, "click", Jiggyape.event.onAddToPlaylist);
		searchList.appendChild(li);

	},
	addToPlaylist : function(title, videoURL, duration) {

		var playList = Jiggyape.view.element.playList;
		var li = document.createElement('li');
		li.className = "playListLi";
		li.id = Jiggyape.view.id.playlistEntry + Jiggyape.data.playlist.total;
		li.setAttribute(Jiggyape.view.att.videoId, videoURL);

		var p = document.createElement('p');
		p.id = "playListTitleHolder-" + Jiggyape.data.playlist.total;
		p.className = "title";
		p.innerHTML = title;
		p.style.width = (Utensil.stageWidth() - 218) + "px";
		li.appendChild(p);

		var playButton = document.createElement('div');
		playButton.id = "playButton-" + Jiggyape.data.playlist.total;
		playButton.className = "playButton";
		playButton.setAttribute(Jiggyape.view.att.videoId, videoURL);
		playButton.setAttribute(Jiggyape.view.att.videoTitle, title);
		playButton.setAttribute('index', Jiggyape.data.playlist.total);
		playButton.setAttribute(Jiggyape.view.att.videoDuration, duration);
		li.appendChild(playButton);

		var shareButton = document.createElement('div');
		shareButton.id = "shareButton-" + Jiggyape.data.playlist.total;
		shareButton.className = "shareButton";
		shareButton.setAttribute(Jiggyape.view.att.videoId, videoURL);
		shareButton.setAttribute(Jiggyape.view.att.videoTitle, title);
		shareButton.setAttribute(Jiggyape.view.att.videoDuration, duration);
		li.appendChild(shareButton);

		var removeButton = document.createElement('div');
		removeButton.id = "removeButton-" + Jiggyape.data.playlist.total;
		removeButton.className = "smallRemoveButton";
		removeButton.setAttribute('index', Jiggyape.data.playlist.total);
		li.appendChild(removeButton);

		var clear = document.createElement('div');
		clear.className = 'clearBoth';
		li.appendChild(clear);

		Spider.event.addListener(playButton.id, "click", Jiggyape.event.onPlaylistPlayClicked);
		Spider.event.addListener(removeButton.id, "click", Jiggyape.event.onPlaylistRemoveClicked);
		Spider.event.addListener(shareButton.id, "click", Jiggyape.event.onPlaylistShareClicked);

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
			YoutubeService.getVideos(searchBox.value, Jiggyape.event.onList, "", null, null, null, YoutubeService.negativeTermsList, YoutubeService.SearchOrder.ORDER_BY_RELEVANCE, YoutubeService.SearchRacy.RACY_INCLUDE, 1, 50);
			Spider.toast("Seaching...");
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

		var videoURL = element.getAttribute(Jiggyape.view.att.videoId) ? element.getAttribute(Jiggyape.view.att.videoId) : element.parentNode.getAttribute(Jiggyape.view.att.videoId);
		var videoTitle = element.getAttribute(Jiggyape.view.att.videoTitle) ? element.getAttribute(Jiggyape.view.att.videoTitle) : element.parentNode.getAttribute(Jiggyape.view.att.videoTitle);

		var duration = element.getAttribute(Jiggyape.view.att.videoDuration);
		Jiggyape.view.addToPlaylist(videoTitle, videoURL, duration);
		Spider.updateScrollers();

		// Jiggyape.data.player.playlist
		// .push(YoutubePlayerJS.getVideoId(videoURL));
		// if (Jiggyape.data.player.playlist.length == 1)
		// Jiggyape.data.player.playlist.push(YoutubePlayerJS
		// .getVideoId(videoURL));
		// YoutubePlayerJS.player.cuePlaylist(Jiggyape.data.player.playlist,
		// Jiggyape.data.currentIndex);
		Jiggyape.event.addToYoutubePlayList(videoURL);
	},
	addToYoutubePlayList : function(videoURL, index) {
		Jiggyape.data.player.playlist.push(YoutubePlayerJS.getVideoId(videoURL));
		if (Jiggyape.data.player.playlist.length == 1)
			Jiggyape.data.player.playlist.push(YoutubePlayerJS.getVideoId(videoURL));
		YoutubePlayerJS.player.cuePlaylist(Jiggyape.data.player.playlist, index ? index : Jiggyape.data.currentIndex);
	},
	onResize : function() {
		var header = document.getElementById(Spider.data.id.header);
		var footer = document.getElementById(Spider.data.id.footer);

		document.getElementById(Jiggyape.view.id.searchListHolder).style.height = (Utensil.stageHeight() - header.clientHeight - footer.clientHeight - Jiggyape.view.element.searchBar.clientHeight) + "px";

		document.getElementById(Jiggyape.view.id.playListHolder).style.height = (Utensil.stageHeight() - header.clientHeight - footer.clientHeight - Jiggyape.view.element.searchBar.clientHeight) + "px";
		Jiggyape.view.VideoView.resize();
		Jiggyape.view.SearchView.resize();
		Jiggyape.view.PlayListView.resize();

		Spider.updateScrollers();
	},
	onPlaylistPlayClicked : function(item, event) {

		Jiggyape.view.PlayListView.removeSelectedButton();

		var element = event.srcElement || event.target;
		if (element.className.indexOf('smallControlSelected') < 0)
			element.className += " smallControlSelected";

		var videoURL = element.getAttribute(Jiggyape.view.att.videoId) ? element.getAttribute(Jiggyape.view.att.videoId) : element.parentNode.getAttribute(Jiggyape.view.att.videoId);
		// YoutubePlayerJS.loadVideoById(YoutubePlayerJS.getVideoId(videoURL));
		// YoutubePlayerJS.playVideo();
		// Jiggyape.data.player.duration = element
		// .getAttribute(Jiggyape.view.att.videoDuration);
		// YoutubePlayerJS.player
		// .playVideoAt(Number(element.getAttribute('index')) + 1);
		// YoutubePlayerJS.playVideo();
		// Jiggyape.data.player.currentState =
		// Jiggyape.data.player.state.PLAYING;
		// Jiggyape.data.currentIndex = Number(element.getAttribute('index')) +
		// 1;
		Jiggyape.event.setSongToPlay(Jiggyape.view.att.videoDuration, element.getAttribute('index'), Jiggyape.data.player.state.PLAYING);

	},
	setSongToPlay : function(duration, index, state) {
		Jiggyape.data.player.duration = duration;
		YoutubePlayerJS.player.playVideoAt(Number(index) + 1);
		YoutubePlayerJS.playVideo();
		Jiggyape.data.player.currentState = state;
		Jiggyape.data.currentIndex = Number(index) + 1;
		Spider.navigateTo(2);
	},
	onPlaylistRemoveClicked : function(item, event) {

		var element = event.srcElement || event.target;
		var index = element.getAttribute('index');
		Jiggyape.data.player.playlist.splice(Number(index) + 1, 1);

		if (YoutubePlayerJS.player.getPlaylistIndex() >= Number(index) + 1) {
			Jiggyape.view.PlayListView.removeSelectedButton();
			YoutubePlayerJS.player.playVideoAt(Jiggyape.data.player.playlist.length - 1);
			Jiggyape.data.currentIndex = Jiggyape.data.player.playlist.length - 1;
			var n = document.getElementById("playButton-" + (Jiggyape.data.currentIndex - 1));
			n.className += " smallControlSelected";
		}
		YoutubePlayerJS.player.loadPlaylist(Jiggyape.data.player.playlist, Jiggyape.data.currentIndex);

		var li = document.getElementById(Jiggyape.view.id.playlistEntry + index);

		li.parentNode.removeChild(li);

		var playList = Jiggyape.view.element.playList;
		for ( var a = 0; a < playList.childNodes.length; a++) {
			if (playList.childNodes[a].tagName == "LI") {
				var childIndex = playList.childNodes[a].id.replace(Jiggyape.view.id.playlistEntry, "");

				if (childIndex && Number(childIndex) > Number(index)) {
					childIndex--;
					var child = playList.childNodes[a];
					child.setAttribute('index', childIndex);
					for ( var b = 0; b < child.childNodes.length; b++) {
						var button = child.childNodes[b];
						if (button && button.getAttribute && button.getAttribute('index')) {

							button.setAttribute('index', childIndex);

						}
					}
					playList.childNodes[a].id = Jiggyape.view.id.playlistEntry + childIndex;
				}

			}
		}

	},
	onPlaylistShareClicked : function(item, event) {
		var element = event.srcElement || event.target;
		var videoId = element.getAttribute(Jiggyape.view.att.videoId);

		var videoTitle = element.getAttribute(Jiggyape.view.att.videoTitle);
		var videoDuration = element.getAttribute(Jiggyape.view.att.videoDuration);
		Jiggyape.view.Overlay.data = {
			videoId : videoId,
			videoTitle : videoTitle,
			duration : videoDuration
		};
		Jiggyape.view.Overlay.open(Jiggyape.view.Overlay.type.share);
	},
	onVideoViewBack : function(item, event) {
		if (Jiggyape.data.player.currentState == Jiggyape.data.player.state.PLAYING) {
			Jiggyape.data.player.currentState = Jiggyape.data.player.state.FORCED_PAUSED;
			YoutubePlayerJS.pauseVideo();
			Jiggyape.view.VideoView.paused();
		}

		Spider.navigateTo(1);
	},
	onPageChange : function(index) {
		if (index == 2 && Jiggyape.data.player.currentState == Jiggyape.data.player.state.FORCED_PAUSED) {
			Jiggyape.data.player.currentState = Jiggyape.data.player.state.PLAYING;
			YoutubePlayerJS.playVideo();
			Jiggyape.view.VideoView.playing();
		}
	},
	onSearchKeyUp : function(event) {
		if (event.keyCode == 13) {
			Jiggyape.event.onSearch();
		}
	},
	onPreviousVideo : function(item, event) {
		Jiggyape.view.PlayListView.previousSong();
	},
	onSeekerDrag : function(item, event) {
		Jiggyape.view.VideoView.seeking = true;
	},
	onYoutubeTimer : function() {
		var percent = YoutubePlayerJS.getCurrentTime() / Jiggyape.data.player.duration;

		// var ua = navigator.userAgent.toLowerCase();
		// var isAndroid = (ua.indexOf("android") > -1 &&
		// ua.indexOf("mobile")>=0); //;
		// if(isAndroid)percent=percent/100;
		Jiggyape.view.VideoView.onSeekUpdate(percent);
	},
	onDragUp : function(item, event) {
		var seekerHandle = document.getElementById(Jiggyape.view.VideoView.seekerHandle);
		var ratio = (seekerHandle.style.left.replace("px", "") / seekerHandle.parentNode.clientWidth);
		YoutubePlayerJS.seekTo(YoutubePlayerJS.getDuration() * ratio);
		Jiggyape.view.VideoView.seeking = false;
	},
	onPlayPauseVideo : function(item, event) {
		if (Jiggyape.data.player.currentState == Jiggyape.data.player.state.PLAYING) {
			Jiggyape.data.player.currentState = Jiggyape.data.player.state.PAUSED;
			Jiggyape.view.VideoView.paused();
			YoutubePlayerJS.pauseVideo();
		} else {
			Jiggyape.data.player.currentState = Jiggyape.data.player.state.PLAYING;
			Jiggyape.view.VideoView.playing();
			YoutubePlayerJS.playVideo();

		}
	},
	onNextVideo : function(item, event) {
		Jiggyape.view.PlayListView.nextSong();
	},
	onLoginClicked : function() {
		Jiggyape.view.Overlay.open(Jiggyape.view.Overlay.type.login);
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
				li.style.width = (Utensil.stageWidth() - 70 - 76) + "px";
			}
		}
	}
}
Jiggyape.view.PlayListView = {
	removeSelectedButton : function() {
		var element = document.getElementById("playButton-" + Number(YoutubePlayerJS.player.getPlaylistIndex() - 1));
		if (element)
			element.className = element.className.replace("smallControlSelected", "");
	},
	nextSong : function() {
		Jiggyape.view.VideoView.onSeekUpdate(0);
		var playList = Jiggyape.view.element.playList;

		Jiggyape.view.PlayListView.removeSelectedButton();
		Jiggyape.data.currentIndex = YoutubePlayerJS.player.getPlaylistIndex() + 1;
		if (Jiggyape.data.currentIndex >= Jiggyape.data.player.playlist.length || Jiggyape.data.player.playlist.length - 1 <= YoutubePlayerJS.player.getPlaylistIndex()) {
			Jiggyape.data.currentIndex = 1;
			YoutubePlayerJS.player.playVideoAt(1);
		} else {
			YoutubePlayerJS.player.nextVideo();
		}

		YoutubePlayerJS.playVideo();
		var element = document.getElementById("playButton-" + (Jiggyape.data.currentIndex - 1));
		element.className += " smallControlSelected";

	},
	previousSong : function() {
		Jiggyape.view.VideoView.onSeekUpdate(0);
		var playList = Jiggyape.view.element.playList;
		var childIndex = Jiggyape.data.playlist.total;

		Jiggyape.view.PlayListView.removeSelectedButton();
		if (YoutubePlayerJS.player.getPlaylistIndex() == 1) {
			Jiggyape.data.currentIndex = Jiggyape.data.player.playlist.length - 1;
			YoutubePlayerJS.player.playVideoAt(Jiggyape.data.player.playlist.length - 1);
		} else {
			Jiggyape.data.currentIndex = YoutubePlayerJS.player.getPlaylistIndex() - 1;
			YoutubePlayerJS.player.previousVideo();
		}

		YoutubePlayerJS.playVideo();
		console.log(YoutubePlayerJS.player.getPlaylistIndex() - 1);
		var element = document.getElementById("playButton-" + (Jiggyape.data.currentIndex - 1));
		element.className += " smallControlSelected";

	},
	playSong : function(videoURL) {
		YoutubePlayerJS.loadVideoById(YoutubePlayerJS.getVideoId(videoURL));
		YoutubePlayerJS.playVideo();
		Jiggyape.data.player.currentState = Jiggyape.data.player.state.PLAYING;
		Jiggyape.view.VideoView.playing();

	},
	resize : function() {
		for ( var a = 0; a < Jiggyape.data.playlist.total; a++) {
			var child = document.getElementById("playListTitleHolder-" + a);
			if (child) {
				child.style.width = (Utensil.stageWidth() - 218) + "px";
			}
		}
	}
}
Jiggyape.view.VideoView = {
	playerId : 'player',
	seekerHandle : 'seekerHandle',
	controlsHolderId : 'controlsHolder',
	seeking : false,
	init : function() {
		Spider.event.addListener(Jiggyape.view.id.videoBackButton, "click", Jiggyape.event.onVideoViewBack);
		Spider.event.addListener(Jiggyape.view.id.previousVideoButton, "click", Jiggyape.event.onPreviousVideo);
		Spider.event.addListener(Jiggyape.view.id.nextVideoButtonId, "click", Jiggyape.event.onNextVideo);
		Spider.event.addListener(Jiggyape.view.id.playPauseButtonId, "click", Jiggyape.event.onPlayPauseVideo);
	},
	onstateChange : function(data) {

		console.log(data);
		if (data == 0) {
			YoutubePlayerJS.player.setLoop(true);
			Jiggyape.view.PlayListView.nextSong();

		}
	},
	onSeekUpdate : function(percent) {
		if (isNaN(percent) || Spider.controller.isDrag || Jiggyape.view.VideoView.seeking)
			return null;

		if (percent > 1)
			percent = 1;
		var controlsHolder = document.getElementById(Jiggyape.view.VideoView.controlsHolderId);
		var seekerHandle = document.getElementById(Jiggyape.view.VideoView.seekerHandle);
		var filler = Spider.element.getDragFiller(seekerHandle.parentNode);
		seekerHandle.style.left = (seekerHandle.parentNode.clientWidth * percent) + "px";

		if (filler)
			filler.style.width = ((seekerHandle.parentNode.clientWidth * percent) + (seekerHandle.clientWidth * 0.5)) + "px";

	},
	paused : function() {
		var playPauseButton = document.getElementById(Jiggyape.view.id.playPauseButtonId);
		playPauseButton.style.backgroundPosition = "-35px";
	},
	playing : function() {
		var playPauseButton = document.getElementById(Jiggyape.view.id.playPauseButtonId);
		playPauseButton.style.backgroundPosition = "0px";
	},
	readyEvent : function(data) {

		if (window.GET && window.GET.songId) {
			var id = window.GET.songId;
			Jiggyape.data.player.duration = window.GET.duration;
			window.GET.songId = "http://www.youtube.com/watch?v=" + window.GET.songId + "&feature=youtube_gdata_player";
			Jiggyape.data.currentIndex = 1;
			Jiggyape.view.addToPlaylist(window.GET.title, window.GET.songId, window.GET.duration);
			Jiggyape.event.addToYoutubePlayList(id, 1);
			Spider.navigateTo(2);
			Jiggyape.data.player.currentState = Jiggyape.data.player.state.PLAYING;
			YoutubePlayerJS.playVideo();
			// Jiggyape.event.setSongToPlay(
			// window.GET.durationn,0,Jiggyape.data.player.currentState =
			// Jiggyape.data.player.state.PLAYING);

		}
		// YoutubePlayerJS.setPlaybackQuality(YoutubePlayerJS.quality.SMALL);

	},
	errorEvent : function(data) {
		console.log(data);
		// Spider.toast("error: " + data);
	},
	resize : function() {
		var player = document.getElementById(this.playerId);
		var controlsHolder = document.getElementById(this.controlsHolderId);

		player.style.height = (Utensil.stageHeight() - header.clientHeight - footer.clientHeight - Jiggyape.view.element.searchBar.clientHeight - controlsHolder.clientHeight - 10) + "px";
	}
}
Jiggyape.view.Overlay = {
	id : {
		blackout : "blackout",
		sharePanel : "sharePanel",
		loginPanel : "loginPanel",
		loginNameText : "loginNameText",
		loginName : "loginName",
		signupButton : "signupButton",
		loginToButton : "loginToButton",
		loginEmail : "loginEmail",
		loginPassword : "loginPassword"

	},
	att : {
		register : "reg"
	},
	type : {
		share : "share",
		login : "login"
	},
	data : null,
	currentType : null,
	open : function(type) {
		var black = document.getElementById(Jiggyape.view.Overlay.id.blackout);
		if (black)
			return;
		this.currentType = type;
		var elem = document.createElement('div');
		elem.id = this.id.blackout;
		document.body.appendChild(elem);

		Spider.event.addListener(elem.id, "click", Jiggyape.view.Overlay.event.close);

		switch (type) {
		case this.type.share:
			this.createSharePanel();
			break;
		case this.type.login:
			this.createLoginPanel();
		}
	},
	createSharePanel : function() {
		var elem = document.createElement('div');
		elem.id = this.id.sharePanel;
		document.body.appendChild(elem);

		var closeButton = document.createElement('div');
		closeButton.id = "shareCloseButton";
		elem.appendChild(closeButton);

		Spider.event.addListener(closeButton.id, "click", Jiggyape.view.Overlay.event.onShareCloseClicked);

		var title = document.createElement('p');
		title.className = "shareTitle";
		title.innerHTML = "Share";
		elem.appendChild(title);

		var button = document.createElement('div');
		button.id = "shareFBButton";
		button.innerHTML = "Facebook";
		elem.appendChild(button);

		Spider.event.addListener(button.id, "click", Jiggyape.view.Overlay.event.onFBShareClicked);

		// button = document.createElement('div');
		// button.id = "shareTButton";
		// button.innerHTML = "Twitter";
		// elem.appendChild(button);
		// 		
		// Spider.event.addListener(button.id, "click",
		// Jiggyape.view.Overlay.event.onTShareClicked);

		button = document.createElement('div');
		button.id = "shareEButton";
		button.innerHTML = "Email";
		elem.appendChild(button);

		Spider.event.addListener(button.id, "click", Jiggyape.view.Overlay.event.onEShareClicked);
	},
	createLoginPanel : function() {
		var elem = document.createElement('div');
		elem.id = this.id.loginPanel;
		document.body.appendChild(elem);

		var closeButton = document.createElement('div');
		closeButton.id = "shareCloseButton";
		elem.appendChild(closeButton);

		Spider.event.addListener(closeButton.id, "click", Jiggyape.view.Overlay.event.onShareCloseClicked);

		var title = document.createElement('p');
		title.className = "loginTitle";
		title.innerHTML = "Login";
		elem.appendChild(title);

		var text = document.createElement('p');
		text.className = "fieldTitle hide";
		text.id = "loginNameText";
		text.innerHTML = "Full Name:";
		elem.appendChild(text);

		var input = document.createElement('input');
		input.type = "text";
		input.id = "loginName";
		input.className = "hide";
		input.onfocus = Jiggyape.view.Overlay.event.loginFocus;
		elem.appendChild(input);

		text = document.createElement('p');
		text.className = "fieldTitle";
		text.innerHTML = "Email:";
		elem.appendChild(text);

		input = document.createElement('input');
		input.type = "text";
		input.id = "loginEmail";
		input.onfocus = Jiggyape.view.Overlay.event.loginFocus;
		elem.appendChild(input);

		text = document.createElement('p');
		text.className = "fieldTitle";
		text.innerHTML = "Password:";
		elem.appendChild(text);

		input = document.createElement('input');
		input.type = "password";
		input.id = "loginPassword";
		input.onfocus = Jiggyape.view.Overlay.event.loginFocus;
		elem.appendChild(input);

		var button = document.createElement('div');
		button.id = "loginToButton";
		button.innerHTML = "Login";
		elem.appendChild(button);

		Spider.event.addListener(button.id, "click", Jiggyape.view.Overlay.event.onLoginClicked);

		button = document.createElement('div');
		button.id = "signupButton";
		button.innerHTML = "Sign Up";
		elem.appendChild(button);

		Spider.event.addListener(button.id, "click", Jiggyape.view.Overlay.event.onSignUpClicked);
	},
	event : {
		close : function() {
			var black = document.getElementById(Jiggyape.view.Overlay.id.blackout);
			document.body.removeChild(black);
			delete black;

			var box;
			switch (Jiggyape.view.Overlay.currentType) {
			case Jiggyape.view.Overlay.type.share:
				box = document.getElementById(Jiggyape.view.Overlay.id.sharePanel);
				break;
			case Jiggyape.view.Overlay.type.login:
				box = document.getElementById(Jiggyape.view.Overlay.id.loginPanel);
				break;
			}
			document.body.removeChild(box);
			delete box;
		},
		onFBShareClicked : function() {
			FacebookJS.post("Jiggyape Music", "Listen to Music at Jiggyape.com", "http://dev.jiggyape.com/mobile/index.php?s=" + YoutubePlayerJS.getVideoId(Jiggyape.view.Overlay.data.videoId) + "&d=" + Jiggyape.view.Overlay.data.duration + "&t=" + Jiggyape.view.Overlay.data.videoTitle, null, Jiggyape.view.Overlay.data.videoTitle, "http://jiggyape.com");
		},
		onTShareClicked : function() {
			TwitterJS.post("Jiggyape Music", "Listen to Music at Jiggyape.com", "http://dev.jiggyape.com/mobile/index.php?s=" + YoutubePlayerJS.getVideoId(Jiggyape.view.Overlay.data.videoId) + "&d=" + Jiggyape.view.Overlay.data.duration + "&t=" + Jiggyape.view.Overlay.data.videoTitle, null, Jiggyape.view.Overlay.data.videoTitle, "http://jiggyape.com");
		},
		onEShareClicked : function() {
			Email.post(Jiggyape.view.Overlay.data.videoTitle, "http://dev.jiggyape.com/mobile/index.php?s=" + YoutubePlayerJS.getVideoId(Jiggyape.view.Overlay.data.videoId) + "&d=" + Jiggyape.view.Overlay.data.duration + "&t=" + Jiggyape.view.Overlay.data.videoTitle);
		},
		onShareCloseClicked : function() {
			Jiggyape.view.Overlay.event.close();
		},
		onLoginClicked : function() {
			var valid = false;
			var loginToButton = document.getElementById(Jiggyape.view.Overlay.id.loginToButton);
			if (loginToButton.getAttribute(Jiggyape.view.Overlay.att.register)) {
				valid = Jiggyape.view.Overlay.event.validateLogin(true);
			} else {
				valid = Jiggyape.view.Overlay.event.validateLogin();
			}
			console.log(valid);
		},
		validateLogin : function(isName) {
			var loginNameInput = document.getElementById(Jiggyape.view.Overlay.id.loginName).value;
			var loginEmailInput = document.getElementById(Jiggyape.view.Overlay.id.loginEmail).value;
			var loginPasswordInput = document.getElementById(Jiggyape.view.Overlay.id.loginPassword).value;
			var valid = true;
			if (isName && (loginNameInput == "" || loginNameInput == " ")) {
				valid = false;
				document.getElementById(Jiggyape.view.Overlay.id.loginName).className += " error";
			}
			if (loginEmailInput == "" || loginEmailInput == " ") {
				valid = false;
				document.getElementById(Jiggyape.view.Overlay.id.loginEmail).className += " error";
			}
			if (loginPasswordInput == "" || loginPasswordInput == " ") {
				document.getElementById(Jiggyape.view.Overlay.id.loginPassword).className += " error";
				valid = false;
			}
			return valid;
		},
		onSignUpClicked : function() {
			var loginNameText = document.getElementById(Jiggyape.view.Overlay.id.loginNameText);
			var loginNameInput = document.getElementById(Jiggyape.view.Overlay.id.loginName);
			var signup = document.getElementById(Jiggyape.view.Overlay.id.signupButton);
			var loginToButton = document.getElementById(Jiggyape.view.Overlay.id.loginToButton);
			loginNameText.className = loginNameText.className.replace("hide", "");
			loginNameInput.className = loginNameInput.className.replace("hide", "");
			signup.className += " hide";
			loginToButton.innerHTML = "Register";
			loginToButton.setAttribute(Jiggyape.view.Overlay.att.register, "true");

		},
		loginFocus : function(event) {
			var target = event.srcElement || event.target;
			target.className = target.className.replace("error", "");
		}
	}

}