import { useRef } from "react";

function App() {
  const submitText = useRef("");

  const summarizeText = async ()=>{
    const textToSummarize = submitText.current.value;
    chrome.runtime.sendMessage({
      text : textToSummarize
    });
  }

  return (
    <>
      <div className='h-[100vh] w-[100vw]'>
        <div className="mt-[5vh] ml-[5vh]">
          <input ref={submitText} type="text"  className="bg-slate-500" />
          <br />
          <button onClick={summarizeText} className="bg-red-500">Summarize</button>
        </div>
      </div>
    </>
  )
}

export default App
