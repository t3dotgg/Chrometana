chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace("www.bing.com/search", "www.google.com/search")};
}, {urls: ["*://www.bing.com/search*"]}, ["blocking"]);