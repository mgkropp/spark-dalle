import { Dalle } from "dalle-node";
import express from "express";
import bodyParser from "body-parser";

const index = express();
const port = 3000;

index.use(bodyParser.json());

const dalle = new Dalle("sess-3KCGoc7mhyNoGG4HChmvvTXSJlmx2RSBUejRYzF1");

index.post('/imagine', (req, res) => {
    const prompt = req.body.prompt;

    (async () => {
        const generations = await dalle.generate(prompt);
        const imagePaths = [];
        generations.data.map(item => {
            imagePaths.push(item.generation.image_path);
        })
        res.json(imagePaths);
    })()
});

index.listen(port, () => {
    console.log(`Primitive spark image generation app listening port:${port}`)
});