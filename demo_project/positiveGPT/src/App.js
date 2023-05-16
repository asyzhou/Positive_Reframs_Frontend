// Create a react component that inputs a textarea message then performs a fetch request to localhost:3001 and get back a response as a data.message and displays the message in a box below
// start with npm start - frontend
// then node index.js - backend

// should be a resume and job description

import React, { Component, useRef, useEffect, useState } from 'react';
import './App.css';
import StrategySelection from './components/StrategySelection';
import SuggestionCard from './components/SuggestionCard.jsx';
import { supabase } from './client.js';
import loadingDuck from './assets/loadingduck.gif';

// added navigation
import About from './components/about.js';

//sigmoid and random function for generating random smileys
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
function RandomSmileys({ top, left, animationDelay }) {
  const style = {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    animationDelay: `${animationDelay}s`
  };
  return (
    <span className="bouncing-circle" style={style}>&#9786;</span>
  );
}




function App() {
  const [message, setMessage] = React.useState(''); // message to send to server
  const [fileName, setFileName] = React.useState('☁ Upload negative thoughts.txt'); // name of the file to upload [should be a resume
  const { characters, setCharacters } = React.useState(0); // number of characters in the textarea box
  const [strategy, setStrategy] = React.useState('')

  const [isSubmitting, setIsSubmitting] = React.useState(false); // check whether user has submitted the input or not
  const [isLoading, setIsLoading] = React.useState(false); // check whether the model has sent back a response or not

  const [responses_items_gpt, set_responses_gpt] = React.useState(''); // response from server
  const [responses_text_gpt, set_responses_text_gpt] = React.useState(''); // response text from gpt

  const [responses_items_own, set_responses_own] = React.useState(''); // response from server
  const [responses_text_own, set_responses_text_own] = React.useState(''); // response text from own server

  const test_responses = ["1. Take a break and focus on self-care. Make sure to get enough rest, eat healthy meals, and exercise regularly.",
    "2. Make time for activities that bring you joy. Whether it’s reading a book, listening to music, or going for a walk, find something that helps you relax and enjoy yourself.",
    "3. Talk to someone. Reach out to a friend or family member and let them know how you’re feeling. Talking to"];

  const [userRatings, setUserRatings] = React.useState([
    { id: 0, rating: 1 }, // own server response 1
    { id: 1, rating: 1 }, // gpt response 1
    { id: 2, rating: 1 }, // gpt response 2
    { id: 3, rating: 1 }, // gpt response 3
  ]); // user ratings for each response

  const test_responses_items = test_responses.map((response_single) =>
    <li className='suggestion_card_container'>
      <SuggestionCard text={response_single} />
    </li>
  );

  const handleFileUpload = (event) => {
    const SelectedFile = event.target.files[0];
    console.log(SelectedFile);
    if (SelectedFile.type === "text/plain") {
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
    if (event.target.value.length > 100) {
      setMessage(event.target.value.substring(0, 100));
    }
  } // update the message to send to the server

  // after the user receives a response, they can chop it to a list of strings if they are separated by a dot character
  // then display each string in a list=
  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    setIsLoading(true);
    event.preventDefault();
    await fetch('https://positive-reframe-backend.herokuapp.com/', {
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

        const responses_items_own = non_empty_responses_own.map((response_single, index) =>
        (<li className='suggestion_card_container'>
          <SuggestionCard text={response_single} id={index} handleRatingChange={handleRatingChange} />
        </li>)
        );

        const responses_items_gpt = non_empty_responses_gpt.map((response_single, index) =>
        (<li className='suggestion_card_container'>
          <SuggestionCard text={response_single} id={index + 1} handleRatingChange={handleRatingChange} />
        </li>)
        );

        // set response text
        set_responses_text_own(non_empty_responses_own);
        set_responses_text_gpt(non_empty_responses_gpt);


        // set response html elements
        set_responses_own(responses_items_own);
        set_responses_gpt(responses_items_gpt);

        setIsLoading(false);
      }); // send the message to the server
  }

  const handleRatingChange = (updated_rating, id) => {
    console.log("Target rating is: ", updated_rating);
    console.log("id is:", id);
    // record the rating from user

    setUserRatings(prevRatings => {
      // Get the index of the rating with the provided id
      const index = prevRatings.findIndex(rating => rating.id == id);

      // Create a new array with updated values
      const updatedRatings = [...prevRatings];
      updatedRatings[index] = {
        ...updatedRatings[index],
        rating: parseInt(updated_rating) // Set the new rating value
      };

      // Return the updated array
      return updatedRatings;
    });
  }

  useEffect(() => {
    // console log when the userRatings array is updated
    console.log("User ratings are: ", userRatings);
  }, [userRatings]);

  const handleFeedBackSubmission = () => {
    console.log("User ratings Submitted: ", userRatings);
    postFeedBack();
  }

  const postFeedBack = async () => {
    // if the rating have duplicates, then don't post to database, and alert the user
    const current_ratings = userRatings.map((rating) => rating.rating);
    const uniqueRatings = [...new Set(current_ratings)];
    if (uniqueRatings.length !== current_ratings.length) {
      alert("Please make sure you have rated each response differently.");
      return;
    }

    await console.log("Posting feedback to database", userRatings[0].rating)
    // console log responses text for own server and gpt
    console.log("Own server responses: ", responses_text_own);
    console.log("GPT responses: ", responses_text_gpt);

    const { data, error } = await supabase
      .from('Ratings')
      .insert([
        {
          original_message: message,
          own_response_1_text: responses_text_own[0],
          own_response_1_rating: userRatings[0].rating,
          gpt_response_1_text: responses_text_gpt[0],
          gpt_response_1_rating: userRatings[1].rating,
          gpt_response_2_text: responses_text_gpt[1],
          gpt_response_2_rating: userRatings[2].rating,
          gpt_response_3_text: responses_text_gpt[2],
          gpt_response_3_rating: userRatings[3].rating,
        },
      ])

    if (error) console.log('error', error)
  }

  // get positions for the smiley faces in the background
  const positionsRef = useRef(
    Array(30)
      .fill()
      .map(() => ({
        top: Math.floor(Math.random() * window.innerHeight),
        left: Math.floor(Math.random() * window.innerWidth),
        animationDelay: Math.random() * 5 // Change the number to adjust the delay range
      }))
  );

  useEffect(() => {
    console.log(positionsRef.current);
  }, []);

  // about window
  const [showAboutWindow, setShowAboutWindow] = useState(false);
  const handleOpenAbout = () => {
    setShowAboutWindow(true);
  };
  const handleCloseAbout = () => {
    setShowAboutWindow(false);
  };



  // for the response, chop it down to a list of strings if they are separated by a dot character
  // then display each string in a list
  // for the message, display it in a textarea box

  // the textarea box and response text should be in the middle of the left screen and the right screen
  return (
    <div className="App">
      <div className='background-smileys'>
        {positionsRef.current.map((posAndDelay, index) => (
          <RandomSmileys key={index} {...posAndDelay} />
        ))}
      </div>

      <div className="actual_content">
        <div>
          <div className="App_Header">
            <h0 style={{ 'color': 'white' }}> POSITIVE   REFRAMER v1.0 </h0>
            <div className="button-container">
              <button onClick={handleOpenAbout}>?</button>
            </div>
            {showAboutWindow && <About handleClose={handleCloseAbout} />}
          </div>

          <div>
            <div className={`User_Submit ${!isSubmitting ? 'center' : 'left'}`}>
              <form onSubmit={handleSubmit}>
                <h1>Looking for a positive spin?</h1>
                <div>
                  <label>
                    <textarea className='positive_text_area' maxLength={100} placeholder='Today, I am feeling...' value={message} onChange={handleChange} />
                    <p style={{ opacity: '0.5' }}>{message.length}/100 Characters Limit</p>
                  </label>
                </div>

                <div>
                  <label htmlFor="resume-file" className="custom-file-upload">
                    <span>{fileName}</span>
                    <input className='submit_text_button' id="resume-file" name='resume' type="file" onChange={handleFileUpload} />
                  </label>
                  <StrategySelection setCurrentStrategy={setStrategy} />
                  <input className='submit_button' type="submit" value="Reframe!" />

                </div>

                {/* <div className='all_buttons_container'>
                    <label htmlFor="resume-file" className="custom-file-upload">
                      <span>{fileName}</span>
                      <input className='submit_text_button' id="resume-file" name='resume' type="file" onChange={handleFileUpload} />
                    </label>
                    <StrategySelection setCurrentStrategy={setStrategy} />
                    <input className='submit_button' type="submit" value="Reframe!" />

                  </div> */}
              </form>
            </div>

            {isSubmitting && (
              <div className="Model_Response fade-in">
                <h1>Positively reframed sentences:</h1>
                <div className='answer_area'>
                  {
                    isLoading ? (<p><img src={loadingDuck} style={{ width: "150px", height: "auto" }} /> <br></br>
                      Loading a positive spin... </p>) :
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
                          <button
                            class="submit_user_response_button"
                            role="button"
                            onClick={handleFeedBackSubmission}>Submit Feedback</button>
                        </div>

                      )
                  }

                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div >

  );
}


export default App;
