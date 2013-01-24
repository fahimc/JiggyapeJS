<?php
function pageURL() {
	$pageURL = 'http';
	if ($_SERVER["HTTPS"] == "on") {
		$pageURL .= "s";
	}
	$pageURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	} else {
		$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
	return $pageURL;
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Jiggyape</title>
<meta name="author" content="Fahim" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="viewport" content="width=device-width,maximum-scale=1.0, minimum-scale=0.75, user-scalable=no">
<meta property="og:title" content="<?php  if(isset($_GET['t'])){ echo $_GET['t'];}else{ echo "Jiggyape Music";}   ?>" />
<meta property="og:url" content="<?php  if(isset($_GET['s'])){ echo pageURL();}else{ echo pageURL();}   ?>" />
<meta property="og:image" content="http://dev.jiggyape.com/mobile/resource/image/jiggyape_fb.png"/>

<meta property="og:site_name" content="Jiggyape" />
<!-- Date: 2012-12-28 -->
<script src='http://connect.facebook.net/en_US/all.js'></script>
<script type="text/javascript" src="lib/greensock/easing/EasePack.js"></script>
<script type="text/javascript" src="lib/greensock/plugins/CSSPlugin.js"></script>
<script type="text/javascript" src="lib/greensock/TweenLite.js"></script>
<script type="text/javascript" src="lib/utensil/toolkitMax-v1001.js"></script>
<script type="text/javascript" src="src/youtube/YoutubePlayer.js"></script>
<script type="text/javascript" src="src/service/Youtube.js"></script>
<script type="text/javascript" src="src/service/Facebook.js"></script>
<script type="text/javascript" src="src/service/Twitter.js"></script>
<script type="text/javascript" src="src/service/Email.js"></script>
<script type="text/javascript" src="lib/spider/gesture.js"></script>
<script type="text/javascript" src="lib/spider/Spider.js"></script>
<script type="text/javascript" src="src/view/Jiggyape.js"></script>
<script type="text/javascript" src="src/util/Util.js"></script>
<script type="text/javascript" src="src/Main.js"></script>
<link type="text/css" rel="stylesheet" href="resource/style/global.css">
<link href='http://fonts.googleapis.com/css?family=Open+Sans'
	rel='stylesheet' type='text/css'>
<style type="text/css">
* {
	padding: 0;
	margin: 0;
}
</style>
<script type="text/javascript" >
window.GET=
{
	title:<?php  if(isset($_GET['t'])){ echo "'".$_GET['t']."'";}else{ echo "null";}   ?>,
	songId:<?php  if(isset($_GET['s'])){ echo "'".$_GET['s']."'";}else{ echo "null";}   ?>,
	duration:<?php  if(isset($_GET['d'])){ echo "'".$_GET['d']."'";}else{ echo "null";}   ?>
};
</script>
</head>
<body>
	<div id='fb-root'></div>
	<div id="wrapper">
		<div id="header">
			<img src="resource/image/logo.png" />
			<ul class="buttonHolder">
			<li id="loginButton">login</li>
			</ul>
		</div>
		<div id="spider-content" swipe="true">
			<div>
				<div id="searchbar">
					<ul class="searchboxul">
						<li class="searchboxli"><img
							src="resource/image/searchboxLeft.png" /></li>
						<li class="middle searchboxli"><input type="text" id="searchBox" />
						</li>
						<li class="searchboxli right"><img
							src="resource/image/searchboxRight.png" /></li>
						<li class="clearBoth"></li>
					</ul>

				</div>
				<div id="searchListHolder">
					<ul id="searchList" scrollable="true">
					</ul>
				</div>
			</div>
			<div>
				<div class="heading">
					<h1>Playlist</h1>
				</div>
				<div id="playListHolder">
					<ul id="playList" scrollable="true">
					</ul>
				</div>
			</div>
			<div class="navHolder">
				<div class="heading">
					<ul id="videoBackButton" class="backButton"></ul>
					<h1>Video Player</h1>

				</div>
				<div id="player"></div>
				<div id="controlsHolder">
					<div id="seekerHolder">
						<div class="bar">
							<div id="seekerHandle" class="handle" draggable="true"></div>
							<div class="filler" drag-filler="true"></div>
						</div>
					</div>
					<ul class="buttonHolder">
						<li id="previousVideoButton" class="control"></li>
						<li id="playPauseButton" class="control"></li>
						<li id="nextVideoButton" class="control"></li>
						<li class="clearBoth"></li>
					</ul>
				</div>
			</div>


		</div>

		<div id="footer">
			<img class="youtubeLogo" src="resource/image/yt_powered_by.png" />
		</div>
		<div id="splash"></div>
	</div>

</body>
</html>

