// Create a react component that inputs a textarea message then performs a fetch request to localhost:3001 and get back a response as a data.message and displays the message in a box below
// start with npm start - frontend
// then node index.js - backend

// should be a resume and job description

import React, { Component } from 'react';
import './App.css';
import StrategySelection from './components/StrategySelection';
import SuggestionCard from './components/SuggestionCard.jsx';

function App(){
  const [message, setMessage] = React.useState(''); // message to send to server
  const [fileName, setFileName] = React.useState('☁ Upload Your Negative Thoughts.txt'); // name of the file to upload [should be a resume
  const {characters, setCharacters} = React.useState(0); // number of characters in the textarea box
  const [strategy, setStrategy] = React.useState('')

  const [isSubmitting, setIsSubmitting] = React.useState(false); // check whether user has submitted the input or not
  const [isLoading, setIsLoading] = React.useState(false); // check whether the model has sent back a response or not

  const [responses_items_gpt, set_responses_gpt] = React.useState(''); // response from server
  const [responses_items_own, set_responses_own] = React.useState(''); // response from server
  
  const test_responses = ["1. Take a break and focus on self-care. Make sure to get enough rest, eat healthy meals, and exercise regularly.",
                               "2. Make time for activities that bring you joy. Whether it’s reading a book, listening to music, or going for a walk, find something that helps you relax and enjoy yourself.", 
                               "3. Talk to someone. Reach out to a friend or family member and let them know how you’re feeling. Talking to"];
      
  const test_responses_items = test_responses.map((response_single) =>
        <li className='suggestion_card_container'>
          <SuggestionCard text={response_single} />
        </li>
  );

  const handleFileUpload = (event) => {
    const SelectedFile = event.target.files[0];
    console.log(SelectedFile);
    if(SelectedFile.type === "text/plain"){
      const reader = new FileReader();
      reader.readAsText(SelectedFile);
      setFileName(`File name: ${SelectedFile.name}`);

      // Once reader finishes reading the file, it will call the onload function
      reader.onload = (event) => {
        console.log("Getting user file:")
        setMessage(event.target.result);
      }
      
    } else {
      setFileName("File is not a clean text file. Please upload .txt file.");
    }
  }

  const handleChange = (event) => {
    setMessage(event.target.value);
    if(event.target.value.length > 100){
      setMessage(event.target.value.substring(0,100));
    }
  } // update the message to send to the server

  // after the user receives a response, they can chop it to a list of strings if they are separated by a dot character
  // then display each string in a list=
  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    setIsLoading(true);
    event.preventDefault();
    await fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        strategy: strategy
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      console.log("Own Server response is: ", data.response_from_own_server);
      console.log("GPT Server response is: ", data.response_from_gpt);

      const responses_gpt = data.response_from_gpt.split("\n");
      const response_from_own_server = data.response_from_own_server.split("\n");

      const non_empty_responses_gpt = responses_gpt.filter((response_single) => response_single !== "");
      const non_empty_responses_own = response_from_own_server.filter((response_single) => response_single !== "");
      const responses_items_gpt = non_empty_responses_gpt.map((response_single) =>
        (<li className='suggestion_card_container'>
          <SuggestionCard text={response_single} />
        </li>)
      );

      const responses_items_own = non_empty_responses_own.map((response_single) =>
        (<li className='suggestion_card_container'>
          <SuggestionCard text={response_single} />
        </li>)
      );

      set_responses_gpt(responses_items_gpt);
      set_responses_own(responses_items_own);
      setIsLoading(false);
    }); // send the message to the server
  }
  
  
  

  // for the response, chop it down to a list of strings if they are separated by a dot character
  // then display each string in a list
  // for the message, display it in a textarea box



  // the textarea box and response text should be in the middle of the left screen and the right screen
  return (
  <div className="App">
    <div className="App_Header">
      <h1>Positive Reframer v1.0</h1>
    </div>

    <div>
      <div className="User_Submit">
        <form onSubmit={handleSubmit}>
          <h1>Look for a Positive Spin?</h1>
          <div>
            <label>
              <textarea className='positive_text_area' maxLength={100} placeholder='Put the sentence for paraphrasing' value={message} onChange={handleChange} />
              <p>{message.length}/100 Characters Limit</p>
            </label>
          </div>

          <div>
              <label htmlFor="resume-file" className="custom-file-upload">
                <span>{fileName}</span>
                <input className='submit_text_button' id="resume-file" name='resume' type="file" onChange={handleFileUpload}/>
              </label>
          </div>
          
          <StrategySelection setCurrentStrategy={setStrategy}/>
          <input className='submit_button' type="submit" value="Submit" />
        </form>
      </div>
    
      <div className="Model_Response">
        <h1>Positive Reframed Sentences</h1>
        <div className='answer_area'>
          {/* {
            <ul className='responses_items_contianer'>
              {test_responses_items}
            </ul>
          } */}
          {
            isSubmitting ? (
              isLoading ? (<p>Loading...</p> ) : 
                (
                  <div>
                    <h3>Own Responses</h3>
                    <ul className='responses_items_contianer'>
                      {responses_items_own}
                    </ul>

                    <h3> GPT Responses</h3>
                    <ul className='responses_items_contianer'>
                      {responses_items_gpt}
                    </ul>
                  </div>
                )
              ) : (<p>No input yet</p>)
          }
            
        </div>
        
        
      </div>  
    </div>

  </div>
  
);
}

export default App;

