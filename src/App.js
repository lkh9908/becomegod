import React, {useState} from "react";
import './App.css'

function App(){
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("https://becomegod.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        console.log("response", data.message); // Log the response here
      })
      .catch((error) => console.error(error));
  
    console.log("message", message); // Log the message here
  };  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <button type="submit">Submit</button>

      </form>

      <div>{response}</div>
     
    </div>
  )
}

export default App