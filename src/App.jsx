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
  const [menuOpen, setMenuOpen] = useState(false);
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
        setNavVisible(false);
        setMenuOpen(false);
      } else {
        setNavVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelect = (id) => {
    setView(id);
    setMenuOpen(false);
  };

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

        .hamburger-btn {
          position: fixed;
          top: 12px;
          right: 12px;
          z-index: 200;
          width: 40px;
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background: #222;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .hamburger-btn span {
          width: 20px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
        }

        .menu-open.app-nav {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>

      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`app-nav ${navVisible || menuOpen ? "" : "nav-hidden"} ${menuOpen ? "menu-open" : ""}`}>
        {VIEWS.map(({ id, label }) => (
          <button
            key={id}
            className={`nav-btn ${view === id ? "active" : ""}`}
            onClick={() => handleSelect(id)}
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
