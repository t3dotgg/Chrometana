var storageChange="Google.com";
var debugging = false;
function convertURL(url){
    log(url)
    url = url.replace(/%20/g,"+");
    var uri = /\?q\=([0-9a-zA-Z-._~:\/?#[\]@!$'()*+,;=%]*)($|(\&))/.exec(url)[1];
    log(url);
    log(uri);
    log(storageChange);
    var match = /^((go\+to\+)|(open\+)|())([0-9a-zA-Z-._~:\/?#[\]@!$'()*+,;=%]*\.[a-z]+)/i.exec(uri)
    log(match)
    if(match){
        return "http://" + match[5]
    }
    if(url.search("search?q=go%20to%20") != -1){
        return "http://" + url.substring(url.search('=')+11, url.search('&'));
    }
    if(storageChange == "Google.com"){
        return "https://www.google.com/search?q=" + uri;
    }
    if(storageChange == "DuckDuckGo.com"){
        return "https://www.duckduckgo.com?q=" + uri;
    }
    if(storageChange == "Yahoo.com"){
        return "https://search.yahoo.com/search?p=" + uri;
    }
    return storageChange + uri;
}
chrome.storage.sync.get('search_engine', function (obj) {
    log('myKey', obj);
    storageChange = obj['search_engine'];
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
// Fallback when Chrome is not already running
chrome.runtime.onMessage.addListener(onMessage);
function onMessage(request, sender, callback) {
    if (request.action == "convertURL") {
        callback(convertURL(request.url));
    }
    return true;
}
function log(txt) {
    if(debugging) {
      console.log(txt);
    }
}
