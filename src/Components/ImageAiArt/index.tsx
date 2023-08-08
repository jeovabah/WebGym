import { Configuration, OpenAIApi } from "openai";

import { useState } from "react";

export const ImageAiArt = () => {
  const [prompt, setPrompt] = useState("");
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });
  };

  return (
    <div className="app-main">
      <>
        <h2>Generate an Image using Open AI API</h2>

        <textarea
          className="app-input"
          placeholder="Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
          onChange={(e) => setPrompt(e.target.value)}
          rows={10}
          cols={40}
        />
        <button onClick={generateImage}>Generate an Image</button>
      </>
    </div>
  );
};
