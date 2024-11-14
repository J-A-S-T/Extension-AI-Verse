/* eslint-disable no-unused-vars */
// This code opens chrome sidePanel
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// This is a testing code
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    chrome.runtime.onMessage.addListener((obj, sender, receiver) => {
        if (obj.get == "Yes") {
            chrome.tabs.sendMessage(tabId, { get: "Yes" });
        }
    });
});
