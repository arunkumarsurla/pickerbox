import { useState, useEffect } from "react";

const STORAGE_KEY = "housie_v2";
const ALL_NUMS = Array.from({ length: 90 }, (_, i) => i + 1);

export default function HousiePicker() {
  const [available, setAvailable] = useState(ALL_NUMS);
  const [current, setCurrent] = useState(null);
  const [prev, setPrev] = useState(null);
  const [popKey, setPopKey] = useState(0);

  // Load saved state on mount
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (s.available) setAvailable(s.available);
      if (s.current) setCurrent(s.current);
      if (s.prev) setPrev(s.prev);
    } catch {}
  }, []);

  // Persist state on change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ available, current, prev })
    );
  }, [available, current, prev]);

  // Warn before closing / reloading
  useEffect(() => {
    const fn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", fn);
    return () => window.removeEventListener("beforeunload", fn);
  }, []);

  const draw = () => {
    if (!available.length) return;
    const idx = Math.floor(Math.random() * available.length);
    const n = available[idx];
    setPrev(current);
    setCurrent(n);
    setPopKey((k) => k + 1);
    setAvailable((a) => a.filter((_, i) => i !== idx));
  };

  const reset = () => {
    if (!window.confirm("Restart the game?")) return;
    setAvailable(ALL_NUMS);
    setCurrent(null);
    setPrev(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const drawn = 90 - available.length;
  const pct = drawn / 90;
  const circumference = 2 * Math.PI * 90; // r = 90

  return (
    <div className="page">
      <div className="housie-page">

        {/* ── HEADER ── */}
        <div className="housie-header">
          <div>
            <div className="label">Tambola / Housie</div>
            <div className="housie-title">
              NUMBER
              <br />
              <span>DRAW</span>
            </div>
          </div>
          <div className="housie-stats">
            <div className="stat-box">
              <div className="stat-val">{drawn}</div>
              <div className="stat-lbl">Drawn</div>
            </div>
            <div className="stat-box">
              <div className="stat-val">{available.length}</div>
              <div className="stat-lbl">Remaining</div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="housie-main">

          {/* Draw panel */}
          <div className="housie-draw-panel">
            <div className="current-number-ring">
              <svg viewBox="0 0 200 200">
                <circle className="ring-track" cx="100" cy="100" r="90" />
                <circle
                  className="ring-progress"
                  cx="100" cy="100" r="90"
                  style={{ strokeDashoffset: circumference * (1 - pct) }}
                />
              </svg>
              <div className="num-display">
                <div className="label" style={{ textAlign: "center", marginBottom: 4 }}>
                  CURRENT
                </div>
                <span key={popKey} className="big-num num-pop">
                  {current ?? "—"}
                </span>
              </div>
            </div>

            <div className="prev-row">
              <div className="label" style={{ marginBottom: 0 }}>PREV</div>
              <div className="prev-badge">{prev ?? "—"}</div>
            </div>

            <div className="housie-actions">
              {available.length > 0 ? (
                <button className="btn-gold" onClick={draw}>
                  DRAW NUMBER
                </button>
              ) : (
                <div className="all-done-banner">FULL HOUSE!</div>
              )}
              <button className="btn-red" onClick={reset}>
                RESTART
              </button>
            </div>
          </div>

          {/* Number grid */}
          <div className="housie-grid-wrap">
            <div className="label" style={{ marginBottom: 12 }}>
              ALL NUMBERS
            </div>
            <div className="housie-grid">
              {ALL_NUMS.map((n) => (
                <div
                  key={n}
                  className={`hbox ${
                    n === current
                      ? "current"
                      : !available.includes(n)
                      ? "drawn"
                      : ""
                  }`}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

