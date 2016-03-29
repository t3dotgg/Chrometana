(function () {
  "use strict";
  var custom_engine;
  var storageChange;
  var enable_open_website;
  var all_bing_searches;
  var exclude_settings_app;
  function convertURL(url){
    var querystringparams = getUrlVars(url);
    var source = getKeyValue(querystringparams, "form");
    if(all_bing_searches === false){
      //Cortana is not the source don't redirect
      if(source !== "WNSGPH" && source !== "WNSBOX"){
        return url;
      }
    }

    if(exclude_settings_app === true){
      //settings app source
      if(source === "S00028"){
        return url;
      }
    }
    
    url = url.replace(/%20/g,"+");
    var uri = /\?q\=([0-9a-zA-Z-._~:\/?#[\]@!$'()*+,;=%]*)($|(\&))/.exec(url)[1];
    if(enable_open_website === true){
      var match = /^((go\+to\+)|(open\+)|())([0-9a-zA-Z-._~:\/?#[\]@!$'()*+,;=%]*\.[a-z]+)/i.exec(uri);
      if(match){
        return "http://" + match[5];
      }
    }
    if(storageChange === "Google.com"){
      return "https://www.google.com/search?q=" + uri;
    }
    if(storageChange === "DuckDuckGo.com"){
      return "https://www.duckduckgo.com?q=" + uri;
    }
    if(storageChange === "Yahoo.com"){
      return "https://search.yahoo.com/search?p=" + uri;
    }
    if(storageChange === "Custom"){
      return custom_engine + uri;
    }
    return "https://www.google.com/search?q=" + uri;
  }
  function getUrlVars(url)
  {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }
  function getKeyValue(dictionary,key){
      if(key in dictionary){
          return dictionary[key];
      }
      return "";
  }

  chrome.storage.sync.get(['search_engine','custom_engine','enable_open_website','all_bing_searches','exclude_settings_app'], function (obj) {
    storageChange = obj.search_engine;
    enable_open_website = obj.enable_open_website;
    all_bing_searches = obj.all_bing_searches;
    exclude_settings_app = obj.exclude_settings_app;
    if(storageChange === "Custom"){
      custom_engine = obj.custom_engine;
    }
  });

  chrome.storage.onChanged.addListener(function(changes/*, namespace*/) {  
    if(typeof changes.search_engine !== "undefined"){
      storageChange = changes.search_engine.newValue;
    }
    if(storageChange === "Custom"){
      if(typeof changes.custom_engine !== "undefined"){
        custom_engine = changes.custom_engine.newValue;
      }
    }
    if(typeof changes.enable_open_website !== "undefined"){
      enable_open_website = changes.enable_open_website.newValue;
    }
    if(typeof changes.all_bing_searches !== "undefined"){
      all_bing_searches = changes.all_bing_searches.newValue;
    }
    if(typeof changes.exclude_settings_app !== "undefined"){
      exclude_settings_app = changes.exclude_settings_app.newValue;
    }
  });

  chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var newurl = convertURL(details.url);
    if(newurl !== details.url){
      return { redirectUrl: convertURL(details.url)};
    }
  }, {urls: ["*://*.bing.com/search*"]}, ["blocking"]);

  // Redirect to welcome.html on install
  chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason === "install"){
      chrome.tabs.create({url: "html/options.html?newinstall=yes"});
    }else if(details.reason === "update"){
      var thisVersion = chrome.runtime.getManifest().version;
      console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
  });
  // Fallback when Chrome is not already running
  chrome.runtime.onMessage.addListener(onMessage);
  function onMessage(request, sender, callback) {
    if (request.action === "convertURL") {
      callback(convertURL(request.url));
    }
    return true;
  }
}());