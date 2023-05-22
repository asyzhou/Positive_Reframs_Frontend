// A express server at port 3000 which will handle API requests coming in and respond back to client wiht a json object
// it iwll use body parser as well as cors to parse the body and allow cross origin requests
require('dotenv').config();

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = 3001;

const configuration = new Configuration({
    organization: process.env.ORGANIZATION_KEY, // replace with your own organization key
    apiKey: process.env.OPENAI_API_KEY, // replace with your own api key
});

const openai = new OpenAIApi(configuration);

// // Middleware to parse JSON-formatted request bodies
app.use(bodyParser.json());

app.use(cors()); // add CORS

app.post('/', async (req, res) => {
    const { message, strategy } = req.body;
    console.log(message)
    
    let url = "https://ella2323-positive-reframing.hf.space/api/predict";
    let response_from_own_server = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data: [
                message, strategy
            ]
        })
    })

    response_from_own_server = await response_from_own_server.json();
    
    const response_from_gpt = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Given the text ${message} and use ${strategy} as a strategy generate a list of 3 positively-reframed sentence without changing the meaning of the sentence(limit to 130 words)`,
        max_tokens: 100,
        temperature: 0,
    });

    // for the fetch() method, including the HTTP method (POST), headers (Content-Type: application/json), 
    // and request body (JSON.stringify({data: [[message]]})).
    let text_response_own = "test_string";
    let text_response_gpt = "";

    if(response_from_own_server.data){
        if(response_from_own_server.data[0]){
            text_response_own = response_from_own_server.data[0];
            // text_response_own is  List[Tuple[str, str | float | None]] | None, // represents List of (word, category) tuples of 'Diff' Highlightedtext component
            // example [ 'I am really unhappy today and I want to take a sleep.', null ], ['t I'm sure tomorrow will be better.", '+' ]
            // concatenate the first element of each tuple
            text_response_own = text_response_own.map((tuple) => tuple[0]).join(" ");
            
            console.log("text response is: ", text_response_own);
        }
    }
    
    if(response_from_gpt.data){
        if(response_from_gpt.data.choices[0].text){
            text_response_gpt = response_from_gpt.data.choices[0].text;
            console.log(text_response_gpt);
        }
    }

    res.json({
        response_from_own_server: text_response_own,
        response_from_gpt: text_response_gpt
    }); // send back a json object with the message
    
}); 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); // listen to port 3000  for requests

