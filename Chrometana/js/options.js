var defaultSE = "Google.com";
function save_options(key, element, value) {
  var options = {};
  options[key] = value;
  if(key == "custom_engine"){ 
    if(value != ""){
      options.search_engine = "Custom";
    }
    else{
      options['search_engine'] = defaultSE;
    }
  }
  console.log("options");
  console.log(options);
  chrome.storage.sync.set(options, function() {
    restore_options();
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    search_engine: defaultSE, 
    custom_engine: ''
  }, function(items) {
    // console.log("UPDATE DISPLAY");
    // console.log(items);
    updateDisplay(items);
  });
}

function updateDisplay(items){
  console.log("settings being saved");
  console.log(items);
  // console.log(items.search_engine);
  for (i = 0; i <  selectorList.length; i++) {
    // console.log(selectorList[i].getAttribute('value'));
    if (selectorList[i].getAttribute('value') == items.search_engine) {
      console.log("adding selected to");
      console.log(selectorList[i]);
      addClass(selectorList[i], 'selected');
      // document.getElementById("webpage_diagram_placeholder").className = selectorList[i].getAttribute("data-icon-class");
    }
    else {
      removeClass(selectorList[i], 'selected');
    }
  }
  if(items.search_engine = "Custom"){
    useCustomSearch.checked = true;
  }
  else{
    useCustomSearch.checked = false;
  }
  document.getElementById("custom_engine").value = items.custom_engine;
  updateCustomSearchView();
  var status = document.getElementById('status');
  addClass(status, 'updated');
    status.textContent = 'New search engine preferences saved.';
    setTimeout(function() {
      status.textContent = '';
      removeClass(status, 'updated');
    }, 1050);
}

//Parses arguments from URL
function getURLVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){
      return pair[1];
    }
  }
  return(false);
}
var useCustomSearch = document.getElementById('useCustomSearch');
var custom_engine_settings = document.getElementById('custom_engine_settings');
var selectorList = document.getElementsByClassName('selector');

document.addEventListener('DOMContentLoaded', restore_options);

var optionCaller = function() {
  save_options('search_engine', this, this.getAttribute('value'));
};

var handleMouseover = function() {
  selectedElements = document.getElementsByClassName('hovering');
  for (i = 0; i <  selectedElements.length; i++) {
    removeClass(selectedElements[i], 'hovering');
  }
  addClass(this, 'hovering');
};

var handleMouseout = function() {
  removeClass(this, 'hovering');
  // restore_options();
};

if (getURLVariable("newinstall") == "yes"){
  var installadvice = document.getElementById('installadvice');
  addClass(installadvice, 'visible');
}


for (i = 0; i <  selectorList.length; i++) {
  selectorList[i].addEventListener('click', optionCaller,false);
  selectorList[i].addEventListener('mouseover', handleMouseover, false);
  selectorList[i].addEventListener('mouseleave', handleMouseout, false);
}

useCustomSearch.addEventListener('click', function() {
  // console.log("triggered");
  updateCustomSearchView();
});

function updateCustomSearchView(){
  if(useCustomSearch.checked){
    addClass(custom_engine_settings, 'visible');
  }
  else{
    removeClass(custom_engine_settings, 'visible');
  }
}
document.getElementById('custom_settings_update').addEventListener('click', function() {
  var element = document.getElementById('custom_engine');
  if(useCustomSearch.checked){
    if(element.value.toLowerCase().contains("http")){
      save_options('custom_engine', element, element.value);
    }
    else{
      alert("Custom search engine must start with http");
    }
  }
  else{
    save_options('custom_engine', element, "");
  }
});

document.getElementById('additional-settings-toggle').addEventListener('click', function() {
  var settingsPane = document.getElementById('expandable_settings_pane');
  var engines = document.getElementById('custom-engine-select');
  console.log(engines)

  if (settingsPane.className.search('open') >= 0) {
    removeClass(settingsPane, 'open');
    removeClass(engines, 'hidden');
  }
  else {
    addClass(settingsPane, 'open');
    addClass(engines, 'hidden');
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
