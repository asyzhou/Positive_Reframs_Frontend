// A express server at port 3000 which will handle API requests coming in and respond back to client wiht a json object
// it iwll use body parser as well as cors to parse the body and allow cross origin requests

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = 3001;

const configuration = new Configuration({
    organization: "org-I07CtotjNyDo956rHpexwjod",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


app.use(bodyParser.json());
app.use(cors()); // add CORS

app.post('/', async (req, res) => {
    const { message } = req.body;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Given the text ${message} generate a list of 5 positively-reframed sentence without changing the meaning of the sentence(limit to 100 words)`,
        max_tokens: 100,
        temperature: 0,
      });
    
    if(response.data){
        if(response.data.choices[0].text){
            const text_response = response.data.choices[0].text;
            res.json({
                message: text_response
            }); // send back a json object with the message
        }
    }
    
}); 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); // listen to port 3000  for requests

