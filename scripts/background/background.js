/* eslint-disable no-unused-vars */
// This code opens chrome sidePanel
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// This is a testing code
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    console.log("here i am!");
    chrome.runtime.onMessage.addListener(async (obj, sender, receiver) => {
        console.log("here i am!");
        const available = (await ai.languageModel.capabilities()).available;
        console.log(available);
        console.log(" Trying avaible!");
        if (available !== "no") {
            console.log("Yes here");
            const session = await ai.summarizer.create();
            const result = await session.summarize(obj.text);
            console.log(result);
        } else {
            console.log(" AI model is not installted! ");
            alert("You dont have AI installed on your chrome browser!");
        }
    });
});
