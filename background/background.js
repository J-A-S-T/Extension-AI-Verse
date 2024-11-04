chrome.tabs.onUpdated.addListener((tabId, tab) => {
    console.log(tabId);
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        if (obj.get == "Yes") {
            chrome.tabs.sendMessage(tabId, { get: "Yes" });
        }
    })
})