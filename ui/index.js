window.addEventListener("load", function(e) {
	var infoview = document.getElementById("infoview");

	window.addEventListener("click", function(e) {
		handleEvent(e);
	})
});

function handleEvent(e) {
  if(e.target.classContains("page")) {
      console.log("PAGED");
      infoview.innerHTML = "";
      infoview.setAttribute("style", "height: 90px");
  }
  else {
    if (elementOrParentContainsClass(e.target, "overlay")) {
      var data = e.target.parentElement.className + " " + e.target.className;
      var elements = [];
      infoview.innerHTML = "";

      // YOUR OLD STUFF


      if(e.target.parentElement.classContains("room")) {
        //We need to get a list of sensors for this device from the server
        retrieveDataFromServer({
          type: "device",
          id: e.target.dataset.id ? e.target.dataset.id : null
        }, function(results) {
          console.log("Results: ", results);
          infoview.innerHTML = results;
          //HEY DAVE HERE IS WHERE THE DEVICE QUERY RESULTS ARE RETURNED
        });

        var el = document.createElement("div");
        el.classList.add("panel", "sensor");
        elements.push(el);
      }

     // MY NEW STUFF


      if(e.target.parentElement.classContains("device")) {
        retrieveDataFromServer({
          type: "sensor",
          id: e.target.dataset.id ? e.target.dataset.id : null
        }, function(results) {
          console.log("Results: ", results);
          var elements = [];
          var el = document.createElement("iframe");
          infoview.innerHTML = "";
          infoview.setAttribute("style", "height: 360px");
          el.setAttribute("src", "/graph2.html");
          el.setAttribute("style", "background: #EDECEE");
          el.setAttribute("width", "1000px");
          el.setAttribute("height", "350px");
          el.classList.add("iframe");
          elements.push(el);
          //When the page loads, we will inject our data into it
          el.onload = function(e) {
            var iwindow, idocument; //iframe window and document
            iwindow = el.contentWindow;
            idocument = iwindow.document;
            console.log(idocument.body);
            d3.select(idocument.body)
              .selectAll("p")
              .data(results)
              .enter()
              .append("p")
              .text(function (data, i) {
                var str = "";
                var temp = "";
                console.log(data);
                str += i + ": ";
                for (var key in data) {
                  str += key + "=" + data[key];
                }
                return str;
              });
          };
          for (var i = 0; i < elements.length; i++) {
              infoview.appendChild(elements[i]);
          }
          //HEY DAVE HERE IS WHERE THE DEVICE QUERY RESULTS ARE RETURNED
        });
      }
    }



    if (elementOrParentContainsClass(e.target, "favourite")) {
      var elements = [];
      var el = document.createElement("iframe");
      infoview.innerHTML = "";
      infoview.setAttribute("style", "height: 360px");
      el.setAttribute("src", "/graph2.html");
      el.setAttribute("style", "background: #EDECEE");
      el.setAttribute("width", "1000px");
      el.setAttribute("height", "350px");
      el.classList.add("iframe");
      elements.push(el);
      //When the page loads, we will inject our data into it
      el.onload = function(e) {
        var iwindow, idocument; //iframe window and document
            iwindow = el.contentWindow;
            idocument = iwindow.document;
            console.log(idocument.body);
            d3.select(idocument.body)
              .selectAll("p")
              .data(results)
              .enter()
              .append("p")
              .text(function (data, i) {
                var str = "";
                var temp = "";
                console.log(data);
                str += i + ": ";
                for (var key in data) {
                  str += key + "=" + data[key];
                }
                return str;
              });
          };
      for (var i = 0; i < elements.length; i++) {
          infoview.appendChild(elements[i]);
      }
    }
  }
}

function retrieveDataFromServer(request, callback) {
  var xmlhttp, url;
	xmlhttp = new XMLHttpRequest();
  url = "http://ontology.socs.uoguelph.ca:3000/query?" + buildQueryString(request);
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var jsonResponse = JSON.parse(xmlhttp.responseText);
			callback(jsonResponse);
		}
	}
  console.log(url);
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

  function buildQueryString(params) {
    var queryString = "";
    var oldKey = "";
    for (var key in params) {
      if (params[key] != oldKey) {
        queryString += "&";
      }
      if (params.hasOwnProperty(key)) {
        //TODO: Sanitize key AND value
        queryString += key + "=" + params[key];
        oldKey = params[key];
      }
    }
    return queryString;
  }
}

function elementOrParentContainsClass(el, className) {
	if (el != null) {
		if (el.classContains(className)) {
			return true;
		} else {
			return elementOrParentContainsClass(el.parentElement, className);
		}
	}
	return false;
}
