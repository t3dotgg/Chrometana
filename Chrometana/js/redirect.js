(function () {
	"use strict";
	// Fallback when Chrome is not already running
	var url = location.href;
	chrome.runtime.sendMessage({"action": "convertURL", "url": url},
	  function (response) {
	    if(response !== url){
	      location.href = response;
	    }
	  }
	);
}());