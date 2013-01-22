var TwitterJS =
{
	post:function(name,description,url,picture,caption,redirecturl)
	{
		var completeURL = "http://mobile.twitter.com/home?status="+encodeURI(url);
    // Facebook popup
    window.open(completeURL, "sharer", "menubar=1, resizable=1, width="+document.body.offsetWidth+", height="+document.body.offsetHeight+"");

		
	}
}
