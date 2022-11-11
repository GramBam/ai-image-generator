import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const windowWidth = window.innerWidth;

  const generateImage = async () => {
    if (!prompt) {
      return;
    }
    const res = await openai.createImage({
      prompt,
      n: 1,
      size: windowWidth < 600 ? "256x256" : "512x512",
    });

    setResult(res.data.data[0].url as string);
  };

  return (
    <div
      className="app-main"
      onKeyDown={(e) => e.key === "Enter" && generateImage()}
    >
      <h2>Generate an Image </h2>
      <textarea
        className="app-input"
        placeholder="Search"
        onChange={(e) => setPrompt(e.target.value)}
        rows={10}
        cols={40}
      />
      <button onClick={generateImage}>Generate</button>
      {result.length > 0 && (
        <img className="result-image" src={result} alt="result" />
      )}
    </div>
  );
}

export default App;
