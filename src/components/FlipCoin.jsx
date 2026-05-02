import { useState, useRef } from "react";

export default function FlipCoin() {
  const [result, setResult] = useState("HEADS");
  const [flipping, setFlipping] = useState(false);
  const coinRef = useRef(null);

  const flip = () => {
    if (flipping) return;
    setFlipping(true);

    const el = coinRef.current;
    el.classList.remove("coin-spinning");
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add("coin-spinning");

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "HEADS" : "TAILS";
      el.style.transform = outcome === "TAILS" ? "rotateY(180deg)" : "rotateY(0deg)";
      setResult(outcome);
      setFlipping(false);
    }, 1200);
  };

  return (
    <div className="page">
      <div className="coin-page">
        <h1 className="coin-headline">
          The <em>Toss</em>
        </h1>
        <div className="coin-subtitle">Let fate decide — heads or tails</div>

        <div
          className="coin-3d"
          ref={coinRef}
          onClick={flip}
          style={{ perspectiveOrigin: "center" }}
        >
          <div className="coin-face-3d heads">HEADS</div>
          <div className="coin-face-3d tails">TAILS</div>
        </div>

        <div className="coin-result-badge">{result}</div>

        <button className="btn-gold" onClick={flip} disabled={flipping}>
          {flipping ? "FLIPPING..." : "FLIP COIN"}
        </button>
        <div className="dice-hint" style={{ marginTop: 12 }}>
          — or click the coin —
        </div>
      </div>
    </div>
  );
}
