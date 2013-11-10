window.addEventListener("load", function() {
	var l = Ladda.create( document.getElementById("search-button") );
	document.getElementById("search-button").onclick = function() {
		l.start();
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/bupkis", false);
		xhr.onload = function() {
			l.stop();
			xhr.responseText;
		};
		xhr.send();
	}
}, false);