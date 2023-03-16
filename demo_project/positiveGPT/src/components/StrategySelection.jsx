import React from "react";
import './StrategySelection.css';

// set current stargy and passed back to App.jsx
// at least has 5 strategie in a row
const StrategySelection = (props) => {

    const strategyList = [" Growth Mindset", "Impermanence", "Neutralizing", "Optimism", "Self-Affirmation", "Thankfulness"];
    const [currentStrategy, setCurrentStrategy] = React.useState("");

    return (
        <div className="strategies">
            {
                strategyList.map((val) => (
                    <button type="text">{val}</button>
                ))
            }
           
        </div>
    )
}

export default StrategySelection;