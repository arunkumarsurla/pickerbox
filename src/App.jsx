import { useState } from "react";
import Dice from "./components/Dice";
import FlipCoin from "./components/FlipCoin";
import CoinPicker from "./components/CoinPicker";
import "./styles.css";

const VIEWS = [
  { id: "dice",   label: "Roll Dice" },
  { id: "housie", label: "Housie"    },
  { id: "coin",   label: "Toss Coin" },
];

export default function App() {
  const [view, setView] = useState("dice");

  return (
    <>
      <nav className="app-nav">
        {VIEWS.map(({ id, label }) => (
          <button
            key={id}
            className={`nav-btn ${view === id ? "active" : ""}`}
            onClick={() => setView(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* key forces re-mount + fadeUp animation on tab switch */}
      <div key={view}>
        {view === "dice"   && <Dice />}
        {view === "housie" && <CoinPicker />}
        {view === "coin"   && <FlipCoin />}
      </div>
    </>
  );
}
