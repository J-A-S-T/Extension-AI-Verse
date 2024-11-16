/* eslint-disable no-unused-vars */
import checkAIapis from "./AISessionChecker.js";
import { summarizerSession } from "./AISessions.js";


chrome.runtime.onInstalled.addListener(() => {
    const result = checkAIapis();
    if (!result) {
        console.log("Please follow this guideline to install AI model on Chrome! \nhttps://www.youtube.com/watch?v=v7mQ_eaT4Gw or You can search the same thing on Google!");
        alert("Please follow this guideline to install AI model on Chrome! \nhttps://www.youtube.com/watch?v=v7mQ_eaT4Gw or You can search the same thing on Google!");
    }
});


// This code opens chrome sidePanel
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// This is a testing code
chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    summaryGet(message, sendReponse);
    return true;
});

// This function summarizes the messsage and sends it into chunks to backend
async function summaryGet(message, sendReponse) {
    try {
        console.log("Message Recived : ", message);
        sendReponse({ action: "StreamingStarted" });
        const stream = await summarizerSession.summarizeStreaming(message.text);
        let result = '';
        let prevChunk = '';
        for await (const chunk of stream) {
            const newChunk = chunk.startsWith(prevChunk) ? chunk.slice(prevChunk.length) : chunk;
            console.log(" My CurrChunk is : ", newChunk);
            const message = {
                action: "newChunk",
                chunk: newChunk,
            }
            chrome.runtime.sendMessage(message);
            result += newChunk;
            prevChunk = chunk;
        }
        const streamCompleted = {
            action: "StreamingCompleted",
        }
        chrome.runtime.sendMessage(streamCompleted);
        console.log("Generated Summary : ", result);
    } catch (error) {
        console.log(" Error : ", error.message);
        sendReponse({ error: error.message });
    }
}