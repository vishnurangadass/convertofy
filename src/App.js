import "./App.css";
import "./css/style.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UnitConverter from "./components/UnitCoverter";
import EMICalculator from "./components/EMICalculator";
import AgeCalculator from "./components/AgeCalculator";
import WordCounter from "./components/WordCounter";
import QrCodeGenerator from "./components/QrCodeGenerator";
import SimpleInterestCalculator from "./components/SimpleInterestCalculator";
import CompoundInterestCalculator from "./components/CompoundInterestCalculator";
import InstagramHashtagGenerator from "./components/InstagramHashtagGenerator";
import UnderscoreRemover from "./components/UnderscoreRemover";
import CaseConverter from "./components/CaseConverter";

import darkLogo from "./assets/convertofy-new-horizontal-logo-black.png";

import {
  faAngleDown,
  faAngleUp,
  faArrowUpAZ,
  faCalculator,
  faCalendarWeek,
  faCoins,
  faMoneyBills,
  faPercentage,
  faQrcode,
  faHashtag,
  faScrewdriverWrench,
  faSliders,
  faKeyboard,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const menuRef = useRef(null);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Helper to close dropdown when clicking a menu item
  const closeMenu = () => setActiveIndex(null);

  // ✅ Tool data simplified — generates links dynamically
  const toolData = [
    {
      category: "All Tools",
      icon: faScrewdriverWrench,
      items: [
        { path: "/case-converter", icon: faArrowUpAZ, label: "Case Converter" },
        { path: "/word-counter", icon: faCalculator, label: "Word Counter" },
        {
          path: "/underscore-remover",
          icon: faSquareMinus,
          label: "Underscore & Hyphen Remover",
        },
        {
          path: "/qr-code-generator",
          icon: faQrcode,
          label: "QR Code Generator",
        },
        {
          path: "/instagram-hashtag-generator",
          icon: faHashtag,
          label: "Hashtag Generator",
        },
        {
          path: "/age-calculator",
          icon: faCalendarWeek,
          label: "Age Calculator",
        },
        {
          path: "/emi-calculator",
          icon: faMoneyBills,
          label: "EMI Calculator",
        },
        {
          path: "/simpleInterest-calculator",
          icon: faPercentage,
          label: "Simple Interest Calculator",
        },
        {
          path: "/compoundInterest-calculator",
          icon: faCoins,
          label: "Compound Interest Calculator",
        },
      ],
    },
    {
      category: "Text Tools",
      icon: faKeyboard,
      items: [
        { path: "/case-converter", icon: faArrowUpAZ, label: "Case Converter" },
        { path: "/word-counter", icon: faCalculator, label: "Word Counter" },
        {
          path: "/underscore-remover",
          icon: faSquareMinus,
          label: "Underscore & Hyphen Remover",
        },
      ],
    },
    {
      category: "Calculators",
      icon: faCalculator,
      items: [
        {
          path: "/age-calculator",
          icon: faCalendarWeek,
          label: "Age Calculator",
        },
        {
          path: "/emi-calculator",
          icon: faMoneyBills,
          label: "EMI Calculator",
        },
        {
          path: "/simpleInterest-calculator",
          icon: faPercentage,
          label: "Simple Interest Calculator",
        },
        {
          path: "/compoundInterest-calculator",
          icon: faCoins,
          label: "Compound Interest Calculator",
        },
      ],
    },
    {
      category: "Miscellaneous Tools",
      icon: faSliders,
      items: [
        {
          path: "/qr-code-generator",
          icon: faQrcode,
          label: "QR Code Generator",
        },
        {
          path: "/instagram-hashtag-generator",
          icon: faHashtag,
          label: "Hashtag Generator",
        },
      ],
    },
  ];

  const toggleMenu = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <a href="/">
              <img
                className="main-logo dark-main-logo"
                src={darkLogo}
                alt="logo"
                width={70}
                height={60}
              />
            </a>
          </div>

          {/* Tools Menu */}
          <div className="tools-wrapper" ref={menuRef}>
            {toolData.map((tool, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={tool.category}
                  className={isActive ? "menu-item-active" : "menu-item"}
                >
                  <div
                    className="menu-header"
                    onClick={() => toggleMenu(index)}
                  >
                    <div className="menu-left">
                      <FontAwesomeIcon
                        className="menuIcon"
                        icon={tool.icon}
                        style={isActive ? { color: "#e31c5f" } : {color:"ffffff"}}
                      />
                      <span
                        className="menu-title"
                      >
                        {tool.category}
                      </span>
                    </div>
                    <FontAwesomeIcon
                      className="icon-small"
                      icon={isActive ? faAngleUp : faAngleDown}
                      style={isActive ? { color: "#e31c5f" } : {color:"ffffff"}}
                    />
                  </div>

                  {isActive && (
                    <ul className="submenu">
                      {tool.items.map((item) => (
                        <li key={item.path}>
                          <Link
                            className="App-link"
                            to={item.path}
                            onClick={closeMenu} // ✅ close dropdown on click
                          >
                            <FontAwesomeIcon
                              className="menuIcon"
                              icon={item.icon}
                            />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <aside className="content-container">
          <div className="App-header">
            <Routes>
              <Route path="/" element={<CaseConverter />} />
              <Route path="/converter" element={<UnitConverter />} />
              <Route path="/emi-calculator" element={<EMICalculator />} />
              <Route path="/age-calculator" element={<AgeCalculator />} />
              <Route path="/case-converter" element={<CaseConverter />} />
              <Route path="/word-counter" element={<WordCounter />} />
              <Route
                path="/underscore-remover"
                element={<UnderscoreRemover />}
              />
              <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
              <Route
                path="/simpleInterest-calculator"
                element={<SimpleInterestCalculator />}
              />
              <Route
                path="/compoundInterest-calculator"
                element={<CompoundInterestCalculator />}
              />
              <Route
                path="/instagram-hashtag-generator"
                element={<InstagramHashtagGenerator />}
              />
            </Routes>
          </div>
        </aside>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 Convertofy Solutions.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
