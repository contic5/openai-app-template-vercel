import { useState,useEffect } from "react";
import get_data from './read_excel';

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [excel_data, setExcelData] = useState<Record<any,any>[]>([]);

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

  useEffect(()=>
  {
    async function async_wrapper()
    {
      if(excel_data.length==0)
      {
        const excel_data_temp=await get_data("MOCK_DATA.xlsx","data_short");
        console.log(excel_data_temp);
        setExcelData(excel_data_temp);
      }
    }
    async_wrapper();
  },[]);

  return (
    <>
      <h1>OpenAI App Template Vercel</h1>
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