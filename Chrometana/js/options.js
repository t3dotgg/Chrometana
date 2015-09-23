function save_options(key, element, value) {
  var options = {};
  options[key] = value;
  if(key == "custom_engine"){
    options['search_engine'] = "Custom";
  }
  chrome.storage.sync.set(options, function() {
    restore_options();
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    search_engine: 'Google.com',custom_engine: ''
  }, function(items) {
    updateDisplay(items);
  });
}
function updateDisplay(items){
  for (i = 0; i <  selectorList.length; i++) {
    if (selectorList[i].getAttribute('value') == items.search_engine) {
      addClass(selectorList[i], 'selected');
    }
    else {
      removeClass(selectorList[i], 'selected');
    }
  }
  document.getElementById("custom_engine").value = items.custom_engine;

  // if custom show custom checkmark
  if(items.search_engine == "Custom"){
    document.getElementById("custom_check").style.visibility = "visible";
  }
  else{
    document.getElementById("custom_check").style.visibility = "hidden";
  }
  var status = document.getElementById('status');
    status.textContent = 'New search engine preferences saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
}

//Parses arguments from URL
function getURLVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

var selectorList = document.getElementsByClassName('selector');

document.addEventListener('DOMContentLoaded', restore_options);

if (getURLVariable("newinstall") == "yes"){
  var installadvice = document.getElementById('installadvice');
  installadvice.textContent = 'To come back to this page at any time, go to Chrome Settings, open Extensions, and click Options underneath Chrometana';
}


for (i = 0; i <  selectorList.length; i++) {
  selectorList[i].addEventListener('click', function() {
    save_options('search_engine',this, this.getAttribute('value'))
  });
}

document.getElementById('custom_engine_update').addEventListener('click', function() {
  var element = document.getElementById('custom_engine');
  if(element.value.toLowerCase().contains("http")){
    save_options('custom_engine',element,element.value);
  }
  else{
    alert("Custom search engine must start with http");
  }
});

function addClass(element, classNameToAdd) {
  if (!element.className.includes(classNameToAdd)) {
    element.className = element.className + ' ' + classNameToAdd;
  }
}


function removeClass(element, classNameToAdd) {
  element.className = element.className.replace(classNameToAdd, '');
}
String.prototype.contains = function(text) {
  return this.indexOf(text) !== -1;
};