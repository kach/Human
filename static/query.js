window.addEventListener("load", function() {
	var l = Ladda.create( document.getElementById("click") );
	document.getElementById("click").onclick = function() {
		l.start();
		setTimeout(function() {
			this["data-color"] = "red";
			l.stop();
		}, 2000);
	}
}, false);