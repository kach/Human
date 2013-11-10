window.addEventListener("load", function() {
	var l = Ladda.create( document.getElementById("search-button") );
	document.getElementById("search-button").onclick = document.getElementById("search-term").onchange = function() {
		l.start();
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api?query="+document.getElementById("search-term").value, false);
		xhr.onload = function() {
			setTimeout(l.stop, 1000);
			if (xhr.status === 200) {
				document.getElementById("search-result").innerHTML = xhr.responseText;
			} else {
				document.getElementById("search-result").innerHTML = "<h3>Oh noes.</h3>We don't have a Human entry for "+ document.getElementById("search-term").value +" yet!";
			}
		};
		xhr.send();
	}
}, false);