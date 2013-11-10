window.addEventListener("load", function() {
	var l = Ladda.create( document.getElementById("search-button") );

	var plusone = function(obj) {
		console.log(this.dataset);
		var that = this;
		if (!localStorage[this.dataset.did]) {
			var l = Ladda.create(this);
			l.start();
			var xhr = new XMLHttpRequest();
			console.log(1);
			xhr.open("GET", "/up?id="+this.dataset.did, false);
			xhr.onload = function() {
				l.stop();
				localStorage[that.dataset.did] = "I haz ninja'd.";
				that.innerHTML = "+"+xhr.responseText;
			}
			xhr.send();
		}
	};

	var clickhandler = function() {
		l.start();
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api?term="+document.getElementById("search-term").value, false);
		xhr.onload = function() {
			l.stop();
			if (xhr.status === 200) {
				//document.getElementById("search-result").innerHTML = xhr.responseText;
				var t = JSON.parse(xhr.responseText);
				if (t.length === 0) {
					document.getElementById("search-result").innerHTML = "<h3>Oh noes.</h3>We don't have a Human entry for "+ document.getElementById("search-term").value +" yet! Feel free to define it.";
				} else {
					document.getElementById("search-result").innerHTML = "";
					t.forEach(function(def) {
						var c = new Showdown.converter();
						//document.getElementById("search-result").innerHTML += "<a class='plus' href='/up?id="+def[1]+"&term="+document.getElementById("search-term").value+"'>+"+def[2]+"</a><blockquote>"+c.makeHtml(def[0])+"</blockquote>";
						document.getElementById("search-result").innerHTML += "<button data-size='s' data-color='purple' data-style='contract' class='ladda-button plusone' data-did='"+def[1]+"'>+"+def[2]+"</button>"+"<blockquote>"+c.makeHtml(def[0])+"</blockquote>";
					});
					var all = document.getElementsByClassName("plusone");
					console.log(all);
					for (var i=0; i<all.length; i++) {
						all[i].onclick = plusone;
					}
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