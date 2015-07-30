function save_options(element, value) {
  var search_engine = value
  chrome.storage.sync.set({
    search_engine: search_engine
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);

    for (i = 0; i <  selectorList.length; i++) {
      removeClass(selectorList[i], 'selected');
    }
    addClass(element, 'selected');
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

var selectorList = document.getElementsByClassName('selector');

document.addEventListener('DOMContentLoaded', restore_options);

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