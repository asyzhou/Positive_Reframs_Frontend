import React from "react";
import './StrategySelection.css';

// set current stargy and passed back to App.jsx
// at least has 5 strategie in a row
const StrategySelection = (props) => {

    const strategyList = ["Growth", "Impermanence", "Neutralizing", "Optimism", "Self-Affirmation", "Thankfulness"];

    return (
        <div className="strategies" onChange={(e)=>props.setCurrentStrategy(e.target.value)}>
            {
                <select id="selection-list" on>
                    <option id="first-selection" value="growth">Growth</option>
                    <option value="impermanence">Impermanence</option>
                    <option value="neutralizing">Neutralizing</option>
                    <option value="optimism">Optimism</option>
                    <option value="self_affirmation">Self-Affirmation</option>
                    <option value="thankfulness">Thankfulness</option>
                </select>
            }
           
        </div>
    )
}

export default StrategySelection;