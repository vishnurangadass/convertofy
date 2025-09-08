import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faBroom,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/caseconverter.css";

const UnderscoreRemover = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [showClearPopup, setShowClearPopup] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        setShowCopyPopup(true);
        setTimeout(() => {
          setShowCopyPopup(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Function to handle clear input
  const handleClear = () => {
    setInputValue("");
    setShowClearPopup(true);
    setTimeout(() => {
      setShowClearPopup(false);
    }, 3000);
  };

  const handleRemoveUnderscore = () => {
  if (inputValue.length === 0) {
    setShowError("Please enter some text to convert.");
    return;
  }

  const capitalized = inputValue
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ")
    .map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

  setInputValue(capitalized);
};
const handleRemoveHyphen = () => {
  if (inputValue.length === 0) {
    setShowError("Please enter some text to convert.");
    return;
  }

  const capitalized = inputValue
    .replace(/-/g, " ") // Replace underscores with spaces
    .split(" ")
    .map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

  setInputValue(capitalized);
};

  return (
    <div className="case-converter-wrapper">
      <div className="case-converter-header">
        <div>
          <FontAwesomeIcon
            className="toolIcon"
            icon={faSquareMinus}
            style={{ color: "#e31c5f" }}
          />
        </div>
        <h3>Underscore & Hyphen Remover</h3>
      </div>
      <div>
        <div className="export-container">
          {!showCopyPopup ? (
            <span className="tools-child" onClick={handleCopyToClipboard}>
              <FontAwesomeIcon
                className="headerIcon"
                icon={faClone}
                style={{ color: "#e31c5f" }}
              />
              <span className="headerTool">Copy</span>
            </span>
          ) : (
            <span className="tools-child">
              <FontAwesomeIcon
                className="headerIcon"
                icon={faCheck}
                style={{ color: "#20c997" }}
              />
              <span className="headerTool" style={{ color: "#20c997" }}>
                Copied
              </span>
            </span>
          )}
          {!showClearPopup ? (
            <span className="tools-child" onClick={handleClear}>
              <FontAwesomeIcon
                className="headerIcon"
                icon={faArrowsRotate}
                style={{ color: "#e31c5f" }}
              />
              <span className="headerTool">Clear</span>
            </span>
          ) : (
            <span className="tools-child">
              <FontAwesomeIcon
                className="headerIcon"
                icon={faBroom}
                style={{ color: "#20c997" }}
              />
              <span className="headerTool" style={{ color: "#20c997" }}>
                Cleared
              </span>
            </span>
          )}
        </div>
        <textarea
          className="case-converter-input-box"
          type="text"
          placeholder="Use me to convert you wish..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            border: `2px solid ${isFocused ? "#e31c5f" : "#ccc"}`,
            padding: "10px",
            borderRadius: "6px",
            transition: "border-color 0.3s ease",
            outline: "none",
          }}
        />
        {showError && <span className="error-message">{showError}</span>}
      </div>
      <div className="case-converter-container">
        <div className="case-converter-tools-container">
          <button className="case-converter" onClick={handleRemoveUnderscore}>
            Remove Underscore
          </button>
          <button className="case-converter" onClick={handleRemoveHyphen}>
            Remove Hyphen
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderscoreRemover;
