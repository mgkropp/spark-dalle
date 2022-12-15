import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();

const index = express();
const port = 3000;

index.use(bodyParser.json());

index.post('/imagine', (req, res) => {
    const prompt = req.body.prompt;

    (async () => {
        const configuration = new Configuration({
            organization: process.env.ORG,
            apiKey: process.env.API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        res.json(response.data);
    })()
});

index.listen(port, () => {
    console.log(`Primitive spark image generation app listening port:${port}`)
});
