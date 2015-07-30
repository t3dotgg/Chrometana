chrome.webRequest.onBeforeRequest.addListener(function(details) {
	search_engine = chrome.storage.sync.get('search_engine', function (obj) {
        console.log('myKey', obj);
    });
    if(search_engine=="google"){
    	return { redirectUrl: details.url.replace("www.bing.com/search", "www.google.com/search")};
    }
    if(search_engine=="ddg"){
    	return { redirectUrl: details.url.replace("www.bing.com/search", "www.duckduckgo.com/search")};
    }
    return { redirectUrl: details.url.replace("www.bing.com/search", "www.google.com/search")};
}, {urls: ["*://www.bing.com/search*"]}, ["blocking"]);

// Redirect to welcome.html on install
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({url: "html/welcome.html"});
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});