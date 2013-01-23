var FacebookJS=
{
	APP_ID:null,
	callback:null,
	init:function()
	{
		//FB.init({appId: this.APP_ID, status: true, cookie: true});
	},
	post:function(name,description,link,picture,caption,redirecturl)
	{
		var obj = {
          method: 'feed',
          redirect_uri: redirecturl,
          link: encodeURI(link),
          picture: picture,
          name: name,
          caption: caption,
          description: description
        };
        //FB.ui(obj, FacebookJS.fbcallback);
        this.sharer(name,description,link);
	},
	sharer:function(title,description,url,image0)
	{
    // Encode complete URI
    // var completeURL = encodeURI("http://www.facebook.com/sharer.php?s=100&p"+
        // "[title]="+title+"&p"+
        // "[url]="+url+"&p"+
        // (image0?"[images][0]="+image0+"&p":"")+
        // "[summary]="+description);	
	var completeURL = "http://m.facebook.com/sharer.php?u="+escape(url)+"&t="+title+"&desc="+description;
    // Facebook popup
    window.open(completeURL, "sharer", "menubar=1, resizable=1, width="+document.body.offsetWidth+", height="+document.body.offsetHeight+"");

	},
	fbcallback:function()
	{
		alert("done");
	}
	
}
