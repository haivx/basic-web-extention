chrome.runtime.sendMessage('I am loading content script', (response) => {
    console.log(response);
    console.log('I am content script')

})

window.onload = (event) => {
    console.log('page is fully loaded');
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
      if (request.greeting === "hello") {
        console.log("hang den")
        sendResponse({farewell: "goodbye"});
      }
    }
  );