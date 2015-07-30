function save_options() {
  var search_engine = document.getElementById('search_engine').value;
  chrome.storage.sync.set({
    search_engine: search_engine
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
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
    document.getElementById('search_engine').value = items.search_engine;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);