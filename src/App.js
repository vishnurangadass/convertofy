import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Home from "./components/Home";
import UnitConverter from "./components/UnitCoverter";
import EMICalculator from "./components/EMICalculator";
import darkLogo from "./assets/convertofy-new-horizontal-logo-black.png";
//import lightLogo from "./assets/convertofy-new-horizontal-logo-white.png";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import ThemeToggle from "./components/ThemeToggle";
import CaseConverter from "./components/CaseConverter";
import {
  faAngleDown,
  faAngleUp,
  faArrowUpAZ,
  faCalculator,
  faCalendarWeek,
  faCoins,
  faHashtag,
  faMoneyBills,
  faPercentage,
  faQrcode,
  faScrewdriverWrench,
  faSliders,
  faKeyboard,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

import AgeCalculator from "./components/AgeCalculator";
import WordCounter from "./components/WordCounter";
import QrCodeGenerator from "./components/QrCodeGenerator";
import SimpleInterestCalculator from "./components/SimpleInterestCalculator";
import CompoundInterestCalculator from "./components/CompoundInterestCalculator";
import InstagramHashtagGenerator from "./components/InstagramHashtagGenerator";
import UnderscoreRemover from "./components/UnderscoreRemover";

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toolData = [
    {
      category: "All Tools",
      items: [
        <Link className="App-link" to="/case-converter">
          <FontAwesomeIcon className="menuIcon" icon={faArrowUpAZ} />
          Case Converter
        </Link>,
        <Link className="App-link" to="/word-counter">
          <FontAwesomeIcon className="menuIcon" icon={faCalculator} />
          Word Counter
        </Link>,
        <Link className="App-link" to="/underscore-remover">
          <FontAwesomeIcon className="menuIcon" icon={faSquareMinus} />
          Underscore & Hyphen Remover
        </Link>,
        <Link className="App-link" to="/qr-code-generator">
          <FontAwesomeIcon className="menuIcon" icon={faQrcode} />
          QR Code Generator
        </Link>,
        <Link className="App-link" to="/instagram-hashtag-generator">
          <FontAwesomeIcon className="menuIcon" icon={faHashtag} />
          Hashtag Generator
        </Link>,
        <Link className="App-link" to="/age-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faCalendarWeek} /> Age
          Calculator
        </Link>,
        <Link className="App-link" to="/emi-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faMoneyBills} />
          EMI Calculator
        </Link>,
        <Link className="App-link" to="/simpleInterest-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faPercentage} />
          Simple Interest Calculator
        </Link>,
        <Link className="App-link" to="/compoundInterest-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faCoins} />
          Compound Interest Calculator
        </Link>,
      ],
      icon: <FontAwesomeIcon className="menuIcon" icon={faScrewdriverWrench} />,
    },
    {
      category: "Text Tools",
      items: [
        <Link className="App-link" to="/case-converter">
          <FontAwesomeIcon className="menuIcon" icon={faArrowUpAZ} />
          Case Converter
        </Link>,
        <Link className="App-link" to="/word-counter">
          <FontAwesomeIcon className="menuIcon" icon={faCalculator} />
          Word Counter
        </Link>,
        <Link className="App-link" to="/underscore-remover">
          <FontAwesomeIcon className="menuIcon" icon={faSquareMinus} />
          Underscore & Hyphen Remover
        </Link>,
      ],
      icon: <FontAwesomeIcon className="menuIcon" icon={faKeyboard} />,
    },
    {
      category: "Calculators",
      items: [
        <Link className="App-link" to="/age-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faCalendarWeek} /> Age
          Calculator
        </Link>,
        <Link className="App-link" to="/emi-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faMoneyBills} />
          EMI Calculator
        </Link>,
        <Link className="App-link" to="/simpleInterest-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faPercentage} />
          Simple Interest Calculator
        </Link>,
        <Link className="App-link" to="/compoundInterest-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faCoins} />
          Compound Interest Calculator
        </Link>,
      ],
      icon: <FontAwesomeIcon className="menuIcon" icon={faCalculator} />,
    },
    {
      category: "Miscellaneous Tools",
      items: [
        <Link className="App-link" to="/qr-code-generator">
          <FontAwesomeIcon className="menuIcon" icon={faQrcode} />
          QR Code Generator
        </Link>,
        <Link className="App-link" to="/instagram-hashtag-generator">
          <FontAwesomeIcon className="menuIcon" icon={faHashtag} />
          Hashtag Generator
        </Link>,
      ],
      icon: <FontAwesomeIcon className="menuIcon" icon={faSliders} />,
    },
  ];
  const toggleMenu = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <Router>
      <div className="App">
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
          <div className="tools-wrapper">
            {toolData.map((tool, index) => (
              <div
                key={tool.category}
                className={
                  activeIndex === index ? "menu-item-active" : "menu-item"
                }
              >
                <div className="menu-header" onClick={() => toggleMenu(index)}>
                  <div className="menu-left">
                    {activeIndex === index ? (
                      <span className="menu-icon" style={{ color: "#e31c5f" }}>
                        {tool.icon}
                      </span>
                    ) : (
                      <span className="menu-icon">{tool.icon} </span>
                    )}
                    {activeIndex === index ? (
                      <span className="menu-title" style={{ color: "#e31c5f" }}>
                        {tool.category}
                      </span>
                    ) : (
                      <span className="menu-title">{tool.category}</span>
                    )}
                  </div>
                  <div className="arrow">
                    {activeIndex === index ? (
                      <FontAwesomeIcon
                        className="headerIcon"
                        icon={faAngleUp}
                        size="2xl"
                        style={{ color: "#e31c5f" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="headerIcon"
                        icon={faAngleDown}
                        size="2xs"
                      />
                    )}
                  </div>
                </div>
                {activeIndex === index && (
                  <ul className="submenu">
                    {tool.items.map((item, subIndex) => (
                      <li key={`${tool.category}-${subIndex}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {/* <ThemeToggle /> */}
        </div>
        <aside className="content-container">
          <div className="sidebar">
            {toolData.map((tool, index) => (
              <div key={tool.category} className="menu-item">
                <div className="menu-header" onClick={() => toggleMenu(index)}>
                  <div className="menu-left">
                    {activeIndex === index ? (
                      <span className="menu-icon" style={{ color: "#e31c5f" }}>
                        {tool.icon}
                      </span>
                    ) : (
                      <span className="menu-icon">{tool.icon} </span>
                    )}
                    {activeIndex === index ? (
                      <span className="menu-title" style={{ color: "#e31c5f" }}>
                        {tool.category}
                      </span>
                    ) : (
                      <span className="menu-title">{tool.category}</span>
                    )}
                  </div>
                  <span className="arrow">
                    {activeIndex === index ? (
                      <FontAwesomeIcon
                        className="headerIcon"
                        icon={faAngleUp}
                        style={{ color: "#e31c5f" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="headerIcon"
                        icon={faAngleDown}
                      />
                    )}
                  </span>
                </div>
                {activeIndex === index && (
                  <ul className="submenu">
                    {tool.items.map((item, subIndex) => (
                      <li key={`${tool.category}-${subIndex}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
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
        <footer className="footer">
          <p>&copy; 2025 Convertofy Solutions.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
