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

  useEffect(() => {
    localStorage.setItem("lastView", view);
  }, [view]);

  useEffect(() => {
    const handleScroll = () => {
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

      <div key={view}>
        {view === "dice" && <Dice />}
        {view === "housie" && <CoinPicker />}
        {view === "coin" && <FlipCoin />}
      </div>
    </>
  );
}
