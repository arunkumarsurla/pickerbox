import React, { useState } from "react";
import Dice from "./components/Dice";
import CoinPicker from "./components/CoinPicker";
import FlipCoin from "./components/FlipCoin";

function App() {
  const [activeView, setActiveView] = useState("dice"); 

  const Header = () => {
    return (
      <nav className="header">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView("dice");
          }}
          className={activeView === "dice" ? "active" : ""}
        >
          Roll the Dice
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView("housie");
          }}
          className={activeView === "housie" ? "active" : ""}
        >
          Housie Picker
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView("coin");
          }}
          className={activeView === "coin" ? "active" : ""}
        >
          Toss Coin
        </a>
      </nav>
    );
  };

  return (
    <>
      <Header />
      {activeView === "dice" && <Dice />}
      {activeView === "housie" && <CoinPicker />}
      {activeView === "coin" && <FlipCoin />}
    </>
  );
}

export default App;
