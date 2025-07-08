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
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaBookmark,
  FaFont,
  FaImage,
  FaCss3Alt,
  FaCode,
  FaPalette,
  FaShareAlt,
  FaCog,
  FaMoneyBillAlt,
} from "react-icons/fa";
import AgeCalculator from "./components/AgeCalculator";
import WordCounter from "./components/WordCounter";
import QrCodeGenerator from "./components/QrCodeGenerator";
import SimpleInterestCalculator from "./components/SimpleInterestCalculator";  
import CompoundInterestCalculator from "./components/CompoundInterestCalculator"; 
import InstagramHashtagGenerator from "./components/InstagramHashtagGenerator";

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toolData = [
    {
      category: "Favorite Tools",
      items: ["Tool 1", "Tool 2"],
      icon: <FaBookmark />,
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

      ],
      icon: <FaFont />,
    },
    {
      category: "Calculators",
      items: [
        <Link className="App-link" to="/age-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faCalendarWeek} /> Age
          Calculator
        </Link>,
        <Link className="App-link" to="/emi-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faCalendarWeek} /> 
          EMI Calculator
        </Link>,
        <Link className="App-link" to="/simpleInterest-calculator">
          <FontAwesomeIcon className="menuIcon" icon={faCalendarWeek} /> 
          Simple Interest Calculator
        </Link>,
        <Link className="App-link" to="/compoundInterest-calculator">
          <FaMoneyBillAlt className="menuIcon" /> 
          Compound Interest Calculator
        </Link>,
      ],
      icon: <FaCss3Alt />,
    },
        {
      category: "Converters",
      items: ["Image Resizer", "Compressor", "Format Converter"],
      icon: <FaImage />,
    },
    {
      category: "Coding Tools",
      items: ["JSON Formatter", "HTML Viewer"],
      icon: <FaCode />,
    },
    {
      category: "Color Tools",
      items: ["Color Picker", "Palette Generator"],
      icon: <FaPalette />,
    },
    {
      category: "Social Media Tools",
      items: [<Link className="App-link" to="/instagram-hashtag-generator">
          <FontAwesomeIcon className="menuIcon" icon={faHashtag} />
          Hashtag Generator
        </Link>, "Post Scheduler"],
      icon: <FaShareAlt />,
    },
    {
      category: "Miscellaneous Tools",
      items: [
        <Link className="App-link" to="/qr-code-generator">
         QR Code Generator
        </Link>,
        <Link className="App-link" to="/case-converter">
          Case Converter
        </Link>,
      ],
      icon: <FaCog />,
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
            {/* <nav className="navbar">
              <Link className="App-link" to="/">
                Home
              </Link>
              <Link className="App-link" to="/converter">
                Unit Converter
              </Link>
              <Link className="App-link" to="/calculator">
                EMI Calculator
              </Link>
              <Link className="App-link" to="/case-converter">
                Case Converter
              </Link>
            </nav> */}
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
              <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
              <Route path="/simpleInterest-calculator" element={<SimpleInterestCalculator />} />
              <Route path="/compoundInterest-calculator" element={<CompoundInterestCalculator />} />
              <Route path="/instagram-hashtag-generator" element={<InstagramHashtagGenerator />} />
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
