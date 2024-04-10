
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting === "hello") {
      sendResponse({confirmation: "connected with popup"});
    }
  }
);
const init = function() {
    const injectElement = document.createElement("div");
    injectElement.className = "hell-world";
    injectElement.innerHTML = "Hello from the haivx"
    document.body.appendChild(injectElement)
}

init()