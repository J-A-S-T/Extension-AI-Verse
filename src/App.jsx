function App() {
  const changeClick = ()=>{
    chrome.runtime.sendMessage({
      get: "Yes"
    });
  }

  return (
    <>
      <div className='h-[100vh] w-[100vw]'>
        <button onClick={changeClick}>Delete</button>
      </div>
    </>
  )
}

export default App
