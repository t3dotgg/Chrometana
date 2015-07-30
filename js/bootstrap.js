var storageChange="Google.com"
chrome.storage.sync.get('search_engine', function (obj) {
        console.log('myKey', obj);
        storageChange=obj['search_engine']
});

chrome.storage.onChanged.addListener(function(changes, namespace) {  
    storageChange = changes['search_engine']['newValue'];
    console.log(storageChange)
});

chrome.webRequest.onBeforeRequest.addListener(function(details) {
   	console.log(storageChange)
    if(storageChange=="Google.com"){
    	return { redirectUrl: details.url.replace("www.bing.com/search", "www.google.com/search")};
    }
    if(storageChange=="DuckDuckGo.com"){
    	return { redirectUrl: details.url.replace("www.bing.com/search", "www.duckduckgo.com")};
    }
    if(storageChange=="Ask.com"){
    	return { redirectUrl: details.url.replace(/.*:\/\/www.bing.com\/search/, "http://www.ask.com/web")};
    }
    if(storageChange=="Yahoo.com"){
    	return { redirectUrl: details.url.replace("www.bing.com/search?q", "search.yahoo.com/search?p")};
    }
    if(storageChange=="Aol.com"){
    	return { redirectUrl: details.url.replace(/.*:\/\/www.bing.com\/search/, "http://search.aol.com/aol/search")};
    }
    if(storageChange=="Wow.com"){
    	return { redirectUrl: details.url.replace(/.*:\/\/www.bing.com/, "http://us.wow.com")};
    }
    return { redirectUrl: details.url.replace("www.bing.com/search", "www.google.com/search")};
}, {urls: ["*://www.bing.com/search*"]}, ["blocking"]);

// Redirect to welcome.html on install
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({url: "html/options.html"});
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});