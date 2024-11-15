/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

function App() {
  const submitText = useRef("");
  const [ streamingOrNot, setStreaming ] = useState(false);
  const [ prevChunk, setNewChunk ] = useState("");


  const summarizeText = async ()=>{
    const textToSummarize = submitText.current.value;
    setNewChunk("");
    chrome.runtime.sendMessage({
      text : textToSummarize
    },(response)=>{
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError);
        return;
      }
      if (response && response.action) {
        console.log("Starting streaming!!!");
        setStreaming(true);
      } else if (response && response.error){
        console.log("Error : ", response.error);
        alert(`error generated : ${response.error}`);
      } else  {
        console.warn("No response received");
      }
    });
  }


  useEffect(()=>{
    const handleMessages = (message, sender, sendResponse)=>{
      if(message.action == "newChunk"){
        setNewChunk( (prev) => (prev + message.chunk));
      } else if(message.action == "StreamingCompleted"){
        setStreaming(false);
      } else if(message.action == "StreamError"){
        console.error(message.error);
        setStreaming(false);
      }
    }
    chrome.runtime.onMessage.addListener(handleMessages);
    
    return (()=>{
      chrome.runtime.onMessage.removeListener();
    })
  }, []);

  return (
    <>
      <div className='h-[100vh] w-[100vw]'>
        <div className="mt-[5vh] ml-[5vh]">
          <input ref={submitText} type="text" className="bg-slate-500" />
          <br />
          <button onClick={summarizeText} className="bg-red-500">Summarize</button>
        </div>
        <div className="mt-[2vh] ml-[5vh]">
          <h2>Here is the summary : </h2>
          <p> {prevChunk} </p>
        </div>
      </div>
    </>
  )
}

export default App;