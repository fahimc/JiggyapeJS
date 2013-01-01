var YoutubeService=
{
	 getVideos:function(search, author, categories, negativeCategories, keywords, negativeKeywords, orderBy, racy, startIndex, maxResults)
		{
			
			var url = "http://gdata.youtube.com/feeds/api/videos";
			if (categories && categories.length > 0)
				url += "/-/" + categories.join("%7C");
			
			if (keywords && keywords.length > 0)
			{
				if (url.indexOf("/-/") == -1)
					url += "/-";
				
				url += "/" + keywords.join("%7C");
			}			
			
			url += "?alt=json&orderby=" + orderBy + "&racy=" + racy + "&start-index=" + startIndex + "&max-results=" + maxResults+"&format=1";
			
			if (search.length > 0)
//				url += "&vq=" + search;
				url += "&q=" + search;
				url+=AppData.NEGATIVE_TERMS;
			if (author.length > 0)
				url += "&author=" + author;
			url = encodeURI(url);
			var request =Utensil.URLLoader.load(url,);
			return runLoader(request, doVideosLoaded, { comment: "videos", search:search, author:author, categories:categories, keywords:keywords, orderBy:orderBy, racy:racy, startIndex:startIndex, maxResults:maxResults } );
		}
}
