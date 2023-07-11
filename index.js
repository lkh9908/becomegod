require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI

const app = express();
const port = 3001;


const configuration = new Configuration({
    organization: 'org-LaMHYGid168G2BkQ5wn6wV5r',
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

app.use(bodyParser.json());
app.use(cors());

app.post('/', async function handler(req, res) {
    const { prompt } = req.body;
  
    const payload = {
      model: "text-davinci-003",
      prompt,
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
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    // const response = {body: JSON.stringify('kakaka')}
    // const json = {body: JSON.stringify('kakaka')}
  
    const json = await response.json();
    
    res.status(200).json(json);
    console.log("here", res)
    return

  });

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
