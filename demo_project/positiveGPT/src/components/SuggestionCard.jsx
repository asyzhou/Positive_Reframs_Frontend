import React from "react";
import ReactDOM from "react-dom";
import "./SuggestionCard.css";
import star from "../assets/star.png";

const Suggestion_card = (props) => {

    const starList = [1, 2, 3, 4, 5];
    const [rating, setRating] = React.useState(0);

    const handleStarHover = (index) => {
        setRating(index);
    }


    return (
        <div className="suggestion_card">
            <div>
                <p className="suggestion_card_description">{props.text}</p>
            </div>
            <div id="1" className="stars_container">
                {
                    starList.map((val) => (
                        <div className="suggestion_card_image_container">
                            <img key={val} 
                            className={`suggestion_card_image ${val <= rating ? "yellow" : "default_color"}`} 
                            src={star} alt="suggestion_card_image" onMouseOver={() => handleStarHover(val)} />
                        </div>
                    ))
                }
            </div>
            <div>
                <p>Ratings: {rating}</p>
            </div>
        </div>
        
    );
}

export default Suggestion_card;

