(function () {
	pc = !navigator.userAgent.match(new RegExp("(phone|WebOS|ios|Android|"
		+ "Windows Phone|BlackBerry|Fennec|JUC|IEMobile|wOSBrowser|BrowserNG|"
		+ "Symbian|iPhone|MQQBrowser)", "i"));
	if (document.readyState == "complete") return;
	document.write('<div id="ccpirahreadyui" style="width:100%;height:100%;'
		+ 'position:fixed;background:#fff;z-index:9999999;text-align:center;'
		+ 'top:0;left:0;"><div style="width:50%;top:50%;position:relative;'
		+ 'font-size:xx-large;display:inline-block;"><marquee style="'
		+ 'border-left-style:solid;border-right-style:solid;bottom:50%;'
		+ 'position:absolute;" Scrollamount=50>Loading...</marquee><marquee'
		+ ' style="visibility:hidden;">Loading...</marquee></div></div>');
	window.onload = function () {
		if (window.ready) ready();
		ccpirahreadyui.style.display = 'none';
	}
}());