// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
console.log("API Key:", process.env.OPENAI_API_KEY);

app.post('/api/generate-text', async (req, res) => {
    const { prompt } = req.body;
    //'You exceeded your current quota, please check your plan and billing details.
    //For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.',
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "gpt-3.5-turbo-instruct",
                prompt: prompt,
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error generating text");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
