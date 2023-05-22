# Positive Reframing Model Front/Back End

This repository serves as the frontend codebase for the Positive-Reframing Project and constructed by React.

## Get it started

### Go to the postiveGPT sub directory to start the React app
```
cd Positive_Reframs_Frontend/
cd demo_project/
cd positiveGPT/
```


## Run the following scripts to start the front end 
make sure you are at Positive_Reframs_Frontend/demo_project/positiveGPT
### `npm start`

Runs the app in the development mode so that you can view your app.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- The page will reload when you make changes.\
- You may also see any lint errors in the console.   
    
    

This is a sample page that you can see

<img src='https://i.imgur.com/176puNT.png' heigh="600" title='Sample frontend page' width='' alt='Video Walkthrough' />

## Run the following scripts to start the simple back end (nodejs)

If you are in positiveGPT/ directory, create a new cmd window in the current directory, type the following
```
cd ../
```
Make sure you are back to the `demo_project/` directory  

### modify line 13-15 in index.js to use your own config for OpenAPI Key
```
const configuration = new Configuration({
    // organization: "", // replace with your own organization key
    // apiKey: "", // replace with your own api key
});
```
- Instructions Below to create your Open AI API Account and getyour own API Key and Organization Key: 
    -  First, sign up for OpenAI API on this [link](https://openai.com/blog/openai-api). 
    - Once you signed up and logged in, you need to open this [page](https://platform.openai.com/account/usage), click on `Personal` Icon on the top right corner, and select View API keys in drop-down menu or Create New Secrete Key (API key).
    - copy the API key and paste it in between the double quote of `apiKey: ""`
    - Clcik the `Settings` Button on the left side, find the organization ID and paste it in between the double quote of `organization: ""`
- Now uncomment the code 
```
const configuration = new Configuration({
    organization: "", // replace with your own organization key, should start with org
    apiKey: "", // replace with your own api key, should start with sk
});
```

### Start the back end service
Then run the following command in Positive_Reframs_Frontend/demo_project
```
node index.js
```



And you should see a similar message like  `Example app listening at http://localhost:3001`


## Use the website as you wish
Type a negative sentence into the main text box, and click submit, wait for a few seconds, and the system would generate the best 5 paraphrased sentence according to your input.

<img src='https://i.imgur.com/qhnr8RX.png' heigh="600" title='Sample frontend page after submission' width='' alt='Video Walkthrough' />

## Other useful scripts (Optional)

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Components break down

### Suggestion-Card
The suggestion card on the right of the screen, the component includes the content that the postive-reframing model returns and also an area for user to input their feedbacks on the suggestion.

### Strategy Selection
A section for user to choose the strategy used for positive-reframing.

## Backend
### Fetch API from 2 Server
1. OpenAI API - fetch the postive-reframed sentence from ChatGPT
2. [Gradio API](https://gradio.app/) - fetch the response from the server of our own
