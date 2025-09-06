import React, { useState } from "react";

export default function FlipCoin() {
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState("HEADS");

  const flipCoin = () => {
    if (flipping) return;
    setFlipping(true);

    setTimeout(() => {
      const outcomes = ["HEADS", "TAILS"];
      const random = Math.floor(Math.random() * outcomes.length);
      setResult(outcomes[random]);
      setFlipping(false);
    }, 800);
  };

  return (
    <div className="coin-container">
      <h1>Flip A Coin</h1>
      <p>Flip coin to toss a coin and get a random result!</p>
      <div className={`coin ${flipping ? "flip" : ""}`}>
        <div className="coin-face front">{!flipping ? result : "HEADS"}</div>
        <div className="coin-face back">{!flipping ? result : "TAILS"}</div>
      </div>

      <button className="play-btn" onClick={flipCoin}>
        Flip Coin
      </button>
    </div>
  );
}
