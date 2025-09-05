import React, { useState } from "react";
import Dice from "./components/Dice";
import CoinPicker from "./components/CoinPicker";

function App() {
  const [showDice, setShowDice] = useState(true);

  const Header = () => {
    return (
      <nav className="header">
        <a
          href="#"
          onClick={() => {
            setShowDice(true);
          }}
          className={showDice ? "active" : ""}
        >
         Roll the Dice
        </a>
        <a
          href="#"
          onClick={() => {
            setShowDice(false);
          }}
          className={!showDice ? "active" : ""}
        >
          Housie Picker
        </a>
      </nav>
    );
  };

  return (
    <>
      <Header />
      {showDice ? <Dice /> : <CoinPicker />}
    </>
  );
}

export default App;
