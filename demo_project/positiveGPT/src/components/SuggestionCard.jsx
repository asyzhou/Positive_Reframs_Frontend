import React from "react";
import ReactDOM from "react-dom";
import "./SuggestionCard.css";

const Suggestion_card = (props) => {
    return (
        <div className="suggestion_card">
            <div>
                <p className="suggestion_card_description">{props.text}</p>
            </div>
            <div>
                <p>1/5 Ratings</p>
            </div>
        </div>
        
    );
}

export default Suggestion_card;

