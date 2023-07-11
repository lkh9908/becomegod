require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

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

    console.log(response)

      
    const json = await response.json();
    
    res.status(200).json(json);

  });

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
