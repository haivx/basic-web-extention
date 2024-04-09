chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    console.log(sender);
    sendResponse("Front the background Script");
})

chrome.runtime.onInstalled.addListener(() => {
    console.log("I just installed my chrome extension")
})


chrome.bookmarks.onChanged.addListener(() => {
    console.log("I just book marked this page")
})

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello") {
//         console.log("hang den")
//         sendResponse({farewell: "goodbye"});
//       }
//     }
//   );