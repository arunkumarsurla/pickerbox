import React, { useState, useRef } from "react";

export default function FlipCoin() {
  const [result, setResult] = useState("HEADS");
  const [isFlipping, setIsFlipping] = useState(false);

  const coinRef = useRef(null);

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);

    const outcomes = ["HEADS", "TAILS"];
    const finalResult = outcomes[Math.floor(Math.random() * 2)];

    // 1) Add spin animation
    coinRef.current.classList.add("flip-spin");

    setTimeout(() => {
      // 2) Stop spin animation
      coinRef.current.classList.remove("flip-spin");

      // 3) Apply final rotation to show correct side
      if (finalResult === "HEADS") {
        coinRef.current.style.transform = "rotateY(0deg)";
      } else {
        coinRef.current.style.transform = "rotateY(180deg)";
      }

      setResult(finalResult);
      setIsFlipping(false);
    }, 1200); // matches animation
  };

  return (
    <div className="coin-container">
      <h1>Flip A Coin</h1>
      <p>Click the button to flip and get a random result!</p>

      <div className="coin" ref={coinRef}>
        <div className="coin-face front">HEADS</div>
        <div className="coin-face back">TAILS</div>
      </div>

      <h2 className="result-text">{result}</h2>

      <button className="play-btn" disabled={isFlipping} onClick={flipCoin}>
        {isFlipping ? "Flipping..." : "Flip Coin"}
      </button>
    </div>
  );
}
