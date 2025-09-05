import React, { useState } from "react";
import dice_bg from "../assets/dice_bg.png";

const Dice = () => {
  const [randomNumber, setRandomNumber] = useState(6);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTimeout(() => {
      setRandomNumber(Math.floor(Math.random() * 6) + 1);
      setIsRolling(false);
    }, 800);
  };

  return (
    <div className="container">
      <div className="dice-container">
        <img
          onClick={rollDice}
          className={isRolling ? "dice-rolling" : ""}
          src={`/src/assets/dice_${randomNumber}.png`}
          alt={`Dice ${randomNumber}`}
        />
        <p>Click on Dice / Play Now to Roll</p>
        <button className="play-btn" onClick={rollDice}>
          Play Now
        </button>
      </div>
      <div>
        <img className="dice-bg" src={dice_bg} alt="Dice background" />
      </div>
    </div>
  );
};

export default Dice;
