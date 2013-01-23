var Email=
{
	post:function(title,url)
	{
		var link = "mailto:"
             + "?cc="
             + "&subject=" + escape("Check out this video on Jiggyape!")
             + "&body=" + escape("Hi,\n\nClick on this link below to view this video.\n\nTitle: "+title+"\n\nLink: "+url.replace(/\s/g,"%20")+"\n\n\nJiggyape\nwww.jiggyape.com");
   // window.location.href = link;
    window.open(link, "sharer", "menubar=1, resizable=1, width="+document.body.offsetWidth+", height="+document.body.offsetHeight+"");
	}
};
