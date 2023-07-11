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

app.post('/', async (req, res) => {

    // console.log('api key', process.env.OPENAI_API_KEY)
    const { message } = req.body
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0,
    })

    if (response.data) {
        if (response.data.choices) {
            {
                res.json({
                    message: response.data.choices[0].text
                })
            }
        }
    }
});

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
