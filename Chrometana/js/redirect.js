// Fallback when Chrome is not already running
chrome.runtime.sendMessage({"action": "convertURL", "url": location.href},
    function (response) {
      	location.href = response;
    });
