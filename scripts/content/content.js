/* eslint-disable no-unused-vars */
chrome.runtime.onMessage.addListener((obj, sender, receiver) => {
    if (obj.get == "Yes") {
        const body = document.querySelector("body");
        body.innerHTML = "<h1> Hello Bro </h1>";
    }
});


document.addEventListener("mouseup", (e) => {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
        const icon = document.createElement("div");

        icon.textContent = "🔍";
        icon.style.position = "absolute";
        icon.style.left = `${e.pageX - 5}px`;
        icon.style.top = `${e.pageY - 5}px`;
        icon.style.cursor = "pointer";
        icon.style.padding = "5px";


        document.body.appendChild(icon);

        icon.addEventListener("click", (event) => {
            chrome.runtime.sendMessage({ text: selectedText });

        });
    }
});