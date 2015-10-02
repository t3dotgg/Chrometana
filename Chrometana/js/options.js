function save_options(key, element, value) {
  var options = {};
  options[key] = value;
  if(key == "custom_engine"){
    options.search_engine = "Custom";
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
      document.getElementById("webpage_diagram_placeholder").className = selectorList[i].getAttribute("data-icon-class");
    }
    else {
      removeClass(selectorList[i], 'selected');
    }
  }
  document.getElementById("custom_engine").value = items.custom_engine;

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

var optionCaller = function() {
  save_options('search_engine',this, this.getAttribute('value'));
};

var handleMouseover = function() {
  selectedElements = document.getElementsByClassName('selected');
  for (i = 0; i <  selectedElements.length; i++) {
    removeClass(selectedElements[i], 'selected');
  }
  addClass(this, 'selected');
};

var handleMouseout = function() {
  removeClass(this, 'selected');
  restore_options();
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

document.getElementById('custom_engine_update').addEventListener('click', function() {
  var element = document.getElementById('custom_engine');
  if(element.value.toLowerCase().contains("http")){
    save_options('custom_engine',element,element.value);
  }
  else{
    alert("Custom search engine must start with http");
  }
});

document.getElementById('additional-settings-toggle').addEventListener('click', function() {
  var settingsPane = document.getElementById('expandable_settings_pane');
  if (settingsPane.className.search('open') >= 0) {
    removeClass(settingsPane, 'open');
  } else {
    addClass(settingsPane, 'open');
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
