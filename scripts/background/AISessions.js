const summarizerContext = {
    // sharedContext: "An article from the Daily Economic News magazine",
    type: "headline",
    length: "long",
    format: "plain-text"
};

const writerContext = {
    tone: "formal"
};

const reWriterContext = {
    // sharedContext : "A review for the Flux Capacitor 3000 from TimeMachines Inc.",  Here you can write your own sharedContext
    context: "Avoid any toxic language and be as constructive as possible."
};

const translatorContext = {
    sourcelanguage: "en",
    targetLanguage: 'fr',
};

const summarizerSession = await ai.summarizer.create(summarizerContext);
const writerSession = await ai.writer.create(writerContext);
const reWriterSession = await ai.rewriter.create(reWriterContext);
const detectorSession = await ai.languageDetector.create();
const translatorSession = await self.translation.createTranslator(translatorContext);


export { summarizerSession, writerSession, reWriterSession, detectorSession, translatorSession };