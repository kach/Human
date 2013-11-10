window.addEventListener("load", function() {
	var l = Ladda.create( document.getElementById("search-button") );

	var clickhandler = function() {
		l.start();
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api?term="+document.getElementById("search-term").value, false);
		xhr.onload = function() {
			l.stop();
			if (xhr.status === 200) {
				//document.getElementById("search-result").innerHTML = xhr.responseText;
				var t = JSON.parse(xhr.responseText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
				if (t.length === 0) {
					document.getElementById("search-result").innerHTML = "<h3>Oh noes.</h3>We don't have a Human entry for "+ document.getElementById("search-term").value +" yet! Feel free to define it.";
				} else {
					document.getElementById("search-result").innerHTML = "";
					t.forEach(function(def) {
						document.getElementById("search-result").innerHTML += "<a class='plus' href='/up?id="+def[1]+"&term="+document.getElementById("search-term").value+"'>+"+def[2]+"</a><blockquote>"+def[0]+"</blockquote>";
					})
				}
			} else {
				document.getElementById("search-result").innerHTML = "<h3>Oh noes.</h3>We don't have a Human entry for "+ document.getElementById("search-term").value +" yet!";
				setTimeout(function(){document.getElementById("search-result").innerHTML = ""},10000);
			}
		};
		xhr.send();
	};

	if (window.location.hash) {
		document.getElementById("search-term").value = window.location.hash.substr(1);
		clickhandler();
	}
	document.getElementById("search-button").onclick = document.getElementById("search-term").onchange = clickhandler;
}, false);