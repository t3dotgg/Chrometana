var storageChange="Google.com";
function convertURL(url){
    if(url.search("search?q=go%20to%20")){
        return "http://" + url.substring(url.search('=')+11, url.search('&'));
    }
    if(storageChange=="Google.com"){
        return url.replace("www.bing.com/search", "www.google.com/search");
    }
    if(storageChange=="DuckDuckGo.com"){
        return url.replace("www.bing.com/search", "www.duckduckgo.com");
    }
    if(storageChange=="Ask.com"){
        return url.replace(/.*:\/\/www.bing.com\/search/, "http://www.ask.com/web");
    }
    if(storageChange=="Yahoo.com"){
        return url.replace("www.bing.com/search?q", "search.yahoo.com/search?p");
    }
    if(storageChange=="Aol.com"){
        return url.replace(/.*:\/\/www.bing.com\/search/, "http://search.aol.com/aol/search");
    }
    if(storageChange=="Wow.com"){
        return url.replace(/.*:\/\/www.bing.com/, "http://us.wow.com");
    }
    return url.replace("www.bing.com/search", "www.google.com/search");
}
chrome.storage.sync.get('search_engine', function (obj) {
        console.log('myKey', obj);
        storageChange=obj['search_engine'];
});

chrome.storage.onChanged.addListener(function(changes, namespace) {  
    storageChange = changes['search_engine']['newValue'];
    console.log(storageChange);
});

chrome.webRequest.onBeforeRequest.addListener(function(details) {
   	console.log(storageChange);
    
    return { redirectUrl: convertURL(details.url)};
}, {urls: ["*://www.bing.com/search*"]}, ["blocking"]);

// Redirect to welcome.html on install
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({url: "html/options.html?newinstall=yes"});
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});
// Call the above function when the url of a tab changes.
chrome.tabs.onUpdated.addListener(startUpRedirect);

// Show page action icon in omnibar.
function startUpRedirect( tabId, changeInfo, tab ) {
    console.log(tab);
    var pattern = /www.bing.com\/search+/gi;
    if(tab['url'].match(pattern)){
        chrome.tabs.getSelected(null, function(tab){
            chrome.tabs.update(tab.id, {url: convertURL(tab.url)});
        });
    }
    
};