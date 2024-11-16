async function checkAIapis() {
    const aiAvailability = (await ai.languageModel.capabilities()).available;
    const canDetect = (await ai.languageDetector.capabilities()).available;
    const summarizerAvailability = (await ai.summarizer.capabilities()).available;
    // chrome://on-device-translation-internals/
    // Go to  above site and install language packs of your choice for translation.

    if (aiAvailability == "no") {
        alert("Please procced to install AI on Chrome!");
        console.log("Please procced to install AI on Chrome!");
        return false
    } else if (aiAvailability == "after-download") {
        alert("Please wait AI model is being downloading! \nDon't close browser for a while!");
        await ai.languageModel.create();
    }

    if (canDetect == "no") {
        alert("Please procced to install AI on Chrome!");
        console.log("Please procced to install AI on Chrome!");
        return false
    } else if (canDetect == "after-download") {
        alert("Please wait AI model is downloading detection! \nDon't close browser for a while!");
        await ai.languageDetector.create();
    }

    if (summarizerAvailability == "no") {
        alert("Please procced to install AI on Chrome!");
        console.log("Please procced to install AI on Chrome!");
        return false
    } else if (summarizerAvailability == "after-download") {
        alert("Please wait AI model is downloading summarizer! \nDon't close browser for a while!");
        await ai.summarizer.create();
    }

    // Wrote this here so that after everything is completed to check and install this!!
    const translationAvailability = await self.translation.canTranslate({
        sourceLanguage: 'en',
        targetLanguage: 'fr',
    });

    if (translationAvailability == "no") {
        alert("Please procced to install AI on Chrome!");
        console.log("Please procced to install AI on Chrome!");
        return false
    } else if (translationAvailability == "after-download") {
        alert("Please wait AI model is downloading translation! \nDon't close browser for a while! \nAlso if you want to download for particular translation like from English to Spanish \nPlease go on this chrome://on-device-translation-internals/ to install that language packages!!");
        await self.translation.canTranslate({
            sourceLanguage: 'en',
            targetLanguage: 'fr',
        });
    }
    return true
}

export default checkAIapis;