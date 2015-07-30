chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace("www.bing.com/search", "www.google.com/search")};
}, {urls: ["*://www.bing.com/search*"]}, ["blocking"]);

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});