function save_options(element, value) {
  var search_engine = value
  chrome.storage.sync.set({
    search_engine: search_engine
  }, function() {
    for (i = 0; i <  selectorList.length; i++) {
      removeClass(selectorList[i], 'selected');
    }
    addClass(element, 'selected');
    var status = document.getElementById('status');
    status.textContent = 'New search engine preferences saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    search_engine: 'Google.com'
  }, function(items) {
    for (i = 0; i <  selectorList.length; i++) {
      if (selectorList[i].getAttribute('value') == items.search_engine) {
        addClass(selectorList[i], 'selected');
      } else {
        removeClass(selectorList[i], 'selected');
      }
    }
  });
}

//Parses arguments from URL
function getURLVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
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
    save_options(this, this.getAttribute('value'))
  });
}

function addClass(element, classNameToAdd) {
  if (!element.className.includes(classNameToAdd)) {
    element.className = element.className + ' ' + classNameToAdd;
  }
}


function removeClass(element, classNameToAdd) {
  element.className = element.className.replace(classNameToAdd, '');
}