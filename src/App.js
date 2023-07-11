import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("text-davinci-003");

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      model,
      prompt: message,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      n: 1,
    };

    const response = await fetch("https://api.openai.com/v1/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    setResponse(json.choices[0].text);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="key">API Key:</label>
          <textarea
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="model">Model:</label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="text-davinci-003">Davinci</option>
            <option value="text-davinci-003">GPT-3.5</option>
            <option value="davinci-codex">DALL·E</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default App;
