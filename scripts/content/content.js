/* eslint-disable no-unused-vars */
chrome.runtime.onMessage.addListener((obj, sender, receiver) => {
    if (obj.get == "Yes") {
        const body = document.querySelector("body");
        body.innerHTML = "<h1> Hello Bro </h1>";
    }
});
