import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  async function askOpenAI() {
    const result = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await result.json();

    setResponse(data.response);
  }

  return (
    <>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={askOpenAI}>
        Ask
      </button>

      <p>{response}</p>
    </>
  );
}

export default App;