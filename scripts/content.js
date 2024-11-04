chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.get == "Yes") {
        const body = document.querySelector("body");
        body.innerHTML = "<h1>Hello World!</h1>";
    }
});