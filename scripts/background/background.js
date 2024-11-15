/* eslint-disable no-unused-vars */
// This code opens chrome sidePanel
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// This is a testing code
chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    summaryGet(message, sendReponse);
    return true;
});


async function summaryGet(message, sendReponse) {
    try {
        console.log(" Message Recived :  ", message);
        const available = (await ai.languageModel.capabilities()).available;
        console.log("Model availablity : ", available);
        if (available !== "no") {
            sendReponse({ action: "StreamingStarted" });
            const session = await ai.summarizer.create({ type: 'key-points', format: 'markdown' });
            const stream = await session.summarizeStreaming(message.text);
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
        } else {
            console.log(" AI model is not installted! ");
            sendReponse({ error: "AI Model is not installed! " });
            alert("You dont have AI installed on your chrome browser!");
        }
    } catch (error) {
        console.log(" Error : ", error.message);
        sendReponse({ error: error.message });
    }
}