var YoutubeService = {
	negativeTermsList : [ "-cover", "-instrumental", "-parody", "-interview",
			"-Parody", "-news", "-AWARDS" ],
	NEGATIVE_TERMS : "+-cover+-instrumental+-parody+-interview+-Parody+-news+-Awards+-Streaming+-INSTUMENTAL",
	SearchOrder : {
		ORDER_BY_PUBLISHED : "published",
		ORDER_BY_VIEWCOUNT : "viewCount",
		ORDER_BY_RELEVANCE : "relevance"
	},
	SearchRacy : {
		RACY_INCLUDE : "include",
		RACY_EXCLUDE : "exclude"
	},

	getVideos : function(search, callback, author, categories,
			negativeCategories, keywords, negativeKeywords, orderBy, racy,
			startIndex, maxResults) {
		// _ws.getVideos(_extraSearchTerms + _searchTerm + _removeTerms, "",
		// null, null, null, _negativeTerms, SearchOrder.ORDER_BY_RELEVANCE,
		// SearchRacy.RACY_INCLUDE, 1, 50);
		var url = "http://gdata.youtube.com/feeds/api/videos";
		if (categories && categories.length > 0)
			url += "/-/" + categories.join("%7C");

		if (keywords && keywords.length > 0) {
			if (url.indexOf("/-/") == -1)
				url += "/-";

			url += "/" + keywords.join("%7C");
		}

		url += "?alt=json&orderby=" + orderBy + "&racy=" + racy
				+ "&start-index=" + startIndex + "&max-results=" + maxResults
				+ "&format=1";

		if (search.length > 0)
			// url += "&vq=" + search;
			url += "&q=" + search;
		url += this.NEGATIVE_TERMS;
		if (author.length > 0)
			url += "&author=" + author;
		url = encodeURI(url);
		console.log(url);
		Utensil.URLLoader.load(url, callback);
	}
}
