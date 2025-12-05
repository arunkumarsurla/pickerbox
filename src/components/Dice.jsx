import React, { useState } from "react";
import dice_bg from "../assets/dice_bg.png";
import dice1 from "../assets/dice_1.png";
import dice2 from "../assets/dice_2.png";
import dice3 from "../assets/dice_3.png";
import dice4 from "../assets/dice_4.png";
import dice5 from "../assets/dice_5.png";
import dice6 from "../assets/dice_6.png";

const Dice = () => {
  const [randomNumber, setRandomNumber] = useState(6);
  const [isRolling, setIsRolling] = useState(false);

  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

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
          loading="eager"
          onClick={rollDice}
          className={isRolling ? "dice-rolling" : ""}
          src={diceImages[randomNumber - 1]}
          alt={`Dice ${randomNumber}`}
        />

        <p>Click on Dice / Play Now to Roll</p>
        <button className="play-btn" onClick={rollDice}>
          Play Now
        </button>
      </div>

      <div>
        <img loading="lazy" className="dice-bg" src={dice_bg} alt="Dice background" />
      </div>
    </div>
  );
};

export default Dice;
