import { useState, useEffect, useRef } from "react";
import Dice from "./components/Dice";
import FlipCoin from "./components/FlipCoin";
import CoinPicker from "./components/CoinPicker";
import "./index.css";

const VIEWS = [
  { id: "dice", label: "Roll Dice" },
  { id: "housie", label: "Housie" },
  { id: "coin", label: "Toss Coin" },
];

export default function App() {
  const [view, setView] = useState(() => {
    return localStorage.getItem("lastView") || "dice";
  });
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimer = useRef(null);

  useEffect(() => {
    localStorage.setItem("lastView", view);
  }, [view]);

  // Auto-hide nav 3 seconds after mount
  useEffect(() => {
    hideTimer.current = setTimeout(() => {
      setNavVisible(false);
    }, 3000);

    return () => clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // any scroll cancels the auto-hide timer
      clearTimeout(hideTimer.current);

      const currentY = window.scrollY;

      if (currentY <= 10) {
        setNavVisible(true);
      } else if (currentY > lastScrollY.current) {
        setNavVisible(false); // scrolling down
      } else {
        setNavVisible(true); // scrolling up
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .app-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .nav-hidden {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .full-screen-content {
          min-height: 100vh;
          width: 100%;
        }
      `}</style>

      <nav className={`app-nav ${navVisible ? "" : "nav-hidden"}`}>
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

      <div key={view} className="full-screen-content">
        {view === "dice" && <Dice />}
        {view === "housie" && <CoinPicker />}
        {view === "coin" && <FlipCoin />}
      </div>
    </>
  );
}
