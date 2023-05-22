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

            <div className="rankings_selector" onChange={(e) => props.handleRatingChange(e.target.value, props.id)}>
                <p>Ranking: </p>
                <select id="selection-list" on>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
        </div>

    );
}

export default Suggestion_card;

