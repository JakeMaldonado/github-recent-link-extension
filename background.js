chrome.webNavigation.onCompleted.addListener(function() {
  chrome.tabs.getSelected(null,function(tab) {
    const url = tab.url;
    saveNewUrl(url);
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.recenturls == "get") {
      chrome.storage.sync.get(['pr_urls'], function(urls) {
        return sendResponse({ pr_urls: urls });
      });
    }
  }
);

function saveNewUrl(url) {
  chrome.storage.sync.get(['pr_urls'], function(urls) {
    debugger
    const urlArr = urls || [];
    console.log(urlArr);
    const updatedUrls = urlArr.push(url)
    updatedUrls.length = 10 // ensure extension only saves last 10 urls
    chrome.storage.sync.set({pr_urls: updatedUrls}, function() {
      console.log('urls saved');
    });
  });
}

