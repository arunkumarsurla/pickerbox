import React, { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "coin_picker_game_v1";

const CoinPicker = () => {
  const sequenceNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

  const [availableNumbers, setAvailableNumbers] = useState(sequenceNumbers);
  const [pickedNumber, setPickedNumber] = useState(0);
  const previousNumberRef = useRef(0);

  // ✅ Load saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (parsed && typeof parsed === "object") {
        setAvailableNumbers(
          Array.isArray(parsed.availableNumbers)
            ? parsed.availableNumbers
            : sequenceNumbers
        );

        setPickedNumber(
          typeof parsed.pickedNumber === "number"
            ? parsed.pickedNumber
            : 0
        );

        previousNumberRef.current =
          typeof parsed.previousNumber === "number"
            ? parsed.previousNumber
            : 0;
      }
    } catch (err) {
      console.error("Error loading saved game:", err);
    }
  }, []);

  // ✅ Persist state
  useEffect(() => {
    const state = {
      availableNumbers,
      pickedNumber,
      previousNumber: previousNumberRef.current,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error("Error saving game:", err);
    }
  }, [availableNumbers, pickedNumber]);

  // 🔒 Warn before closing/reloading
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const pickNumber = () => {
    if (availableNumbers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers[randomIndex];

    previousNumberRef.current = pickedNumber;
    setPickedNumber(number);

    const newAvailable = [...availableNumbers];
    newAvailable.splice(randomIndex, 1);
    setAvailableNumbers(newAvailable);
  };

  const resetGame = () => {
    setAvailableNumbers(sequenceNumbers);
    setPickedNumber(0);
    previousNumberRef.current = 0;

    // ❌ Clear persisted state
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="container">
      <div className="coin-drawer">
        <div>
          Current Number:
          <div className="coin-number">{pickedNumber}</div>
        </div>

        {availableNumbers.length > 0 && (
          <button className="play-btn" onClick={pickNumber}>
            Draw Number
          </button>
        )}

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
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <span>Previous Number:</span>
          <h1 className="previous-number">
            {previousNumberRef.current}
          </h1>
        </div>
      </div>

      <div className="num-box-container">
        {sequenceNumbers.map((number) => {
          const isActive = !availableNumbers.includes(number);

          return (
            <div
              key={number}
              className={`num-box ${isActive ? "active" : ""}`}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinPicker;
