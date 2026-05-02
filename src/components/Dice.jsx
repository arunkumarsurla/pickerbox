import { useState, useRef } from "react";

const DOT_LAYOUTS = {
  1: [[false, false, false], [false, true,  false], [false, false, false]],
  2: [[true,  false, false], [false, false, false], [false, false, true ]],
  3: [[true,  false, false], [false, true,  false], [false, false, true ]],
  4: [[true,  false, true ], [false, false, false], [true,  false, true ]],
  5: [[true,  false, true ], [false, true,  false], [true,  false, true ]],
  6: [[true,  false, true ], [true,  false, true ], [true,  false, true ]],
};

export default function Dice() {
  const [num, setNum] = useState(1);
  const [rolling, setRolling] = useState(false);
  const ref = useRef(null);

  const roll = () => {
    if (rolling) return;
    setRolling(true);

    const el = ref.current;
    el.classList.remove("dice-rolling");
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add("dice-rolling");

    setTimeout(() => {
      setNum(Math.floor(Math.random() * 6) + 1);
      setRolling(false);
    }, 800);
  };

  const layout = DOT_LAYOUTS[num];

  return (
    <div className="page">
      <div className="dice-page">
        <div className="dice-headline">
          ROLL <span>THE</span>
          <br />
          DICE
        </div>
        <div className="dice-subtitle">Fortune favors the bold — take your chance</div>

        <div className="dice-layout">
          <div ref={ref} className="dice-face" onClick={roll}>
            {layout.flat().map((on, i) => (
              <div key={i} className={`dot ${on ? "" : "hidden"}`} />
            ))}
          </div>

          <div className="dice-result-num">{num}</div>
        </div>

        <div className="dice-actions">
          <button className="btn-gold" onClick={roll} disabled={rolling}>
            {rolling ? "ROLLING..." : "ROLL DICE"}
          </button>
          <div className="dice-hint">— or click the dice —</div>
        </div>
      </div>
    </div>
  );
}
