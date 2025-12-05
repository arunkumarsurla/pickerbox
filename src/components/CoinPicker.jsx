import React, { useState, useRef } from "react";

const CoinPicker = () => {
  const sequenceNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

  const [availableNumbers, setAvailableNumbers] = useState([...sequenceNumbers]);
  const [pickedNumber, setPickedNumber] = useState(0);

  // Store previous number without triggering re-render
  const previousNumberRef = useRef(0);

  const pickNumber = () => {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers[randomIndex];

    // Store current number into ref BEFORE updating state
    previousNumberRef.current = pickedNumber;

    setPickedNumber(number);

    const newAvailable = [...availableNumbers];
    newAvailable.splice(randomIndex, 1);
    setAvailableNumbers(newAvailable);
  };

  const resetGame = () => {
    setAvailableNumbers([...sequenceNumbers]);
    setPickedNumber(0);
    previousNumberRef.current = 0; // reset ref
  };

  return (
    <div className="container">
      <div className="coin-drawer">
        Current Number: <div className="coin-number">{pickedNumber}</div>

        <button
          className="play-btn"
          onClick={pickNumber}
          disabled={availableNumbers.length === 0}
          style={{ display: availableNumbers.length === 0 ? "none" : "block" }}
        >
          Draw Number
        </button>

        <button
          className="reset-btn"
          onClick={() => {
            if (window.confirm("Are you sure you want to restart the game?")) {
              resetGame();
            }
          }}
        >
          Restart
        </button>

        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>Previous Number:</span>
          <h1 className="previous-number">{previousNumberRef.current}</h1>
        </div>
      </div>

      <div className="num-box-container">
        {sequenceNumbers.map((number) => {
          const isActive = !availableNumbers.includes(number);
          return (
            <div key={number} className={`num-box ${isActive ? "active" : ""}`}>
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinPicker;
