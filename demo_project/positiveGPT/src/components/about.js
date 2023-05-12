import React from "react";

function AboutWindow({ handleClose }) {
    return (
        <div className="about-overlay">
            <div className="about-window">
                <div className="about-content">
                    <button className="about-window-close" onClick={handleClose}>X</button>
                    <div className="about-text">
                        <h1 style={{ fontSize: '100px', margin: '50px' }}> &#9786;</h1>
                        <h1 style={{ textAlign: 'left' }}>What is positive reframing?</h1>
                        <p style={{ textAlign: 'left' }}>Positive reframing is a technique used to overcome negative thoughts by replacing them with a more hopeful, alternative perspective on the situation. This tool provides suggestions on how you can reconstruct your own thoughts using proven strategies from positive pyschology. </p>

                        <h1 style={{ textAlign: 'left' }}>We draw on six main strategies...</h1>
                        <p style={{ textAlign: 'left' }}>  <span style={{ fontWeight: 'bold' }}>Growth mindset: </span>  the belief that one's abilities can be improved over time and apparent setbacks can be enhancing rather an debiliating. <br></br>
                            <span style={{ fontWeight: 'bold' }}>Impermanence: </span> the idea that negative experiences are finite or temporary and others have also experienced similar forms of adversity. <br></br>
                            <span style={{ fontWeight: 'bold' }}>Neutralizing: </span> removing or rewriting negative phrases in more neutral terms. <br></br>
                            <span style={{ fontWeight: 'bold' }}>Optimism: </span> shifting emphasis to the more positive aspects of the situation, including expectations for a bright future. <br></br>
                            <span style={{ fontWeight: 'bold' }}>Self-affirmation: </span> asserting a more holistic or expansive version of oneself by listing one's values, skills, and positive characteristics. <br></br>
                            <span style={{ fontWeight: 'bold' }}>Thankfulness: </span> an attitude which expresses more thankfulness and gratitude for the situation.</p>

                        <h1 style={{ textAlign: 'left' }}>Want to learn more?</h1>
                        <p style={{ textAlign: 'left' }}>Check out .... </p>

                        <p style={{ textAlign: 'left', opacity: '40%' }}>Created by Jeffrey Liu, Azure Zhou, Caleb Ziems, and Diyi Yang<br></br>Stanford Social and Language Technologies Lab</p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutWindow;