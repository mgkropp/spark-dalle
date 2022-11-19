import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";

const index = express();
const port = 3000;

index.use(bodyParser.json());

index.post('/imagine', (req, res) => {
    const prompt = req.body.prompt;

    (async () => {
        const configuration = new Configuration({
            organization: "org-1yEkgSXVOsNHXYieDyeK3fwZ",
            apiKey: "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",
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