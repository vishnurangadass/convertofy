import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faBroom,
  faCheck,
  faArrowUpAZ,
} from "@fortawesome/free-solid-svg-icons";

const CaseConverter = () => {
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

  // Functions for case conversion
  const handleUpperCase = () => {
    if (inputValue.length === 0) {
      setShowError("Please enter some text to convert.");
      return;
    }
    setInputValue(inputValue.toUpperCase());
  };

  // Function to handle lower case
  const handleLowerCase = () => {
    if (inputValue.length === 0) {
      setShowError("Please enter some text to convert.");
      return;
    }
    setInputValue(inputValue.toLowerCase());
  };

  // Function to handle capitalized case
  const handleCapitalizedCase = () => {
    if (inputValue.length === 0) {
      setShowError("Please enter some text to convert.");
      return;
    }
    const capitalized = inputValue
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    setInputValue(capitalized);
  };

  // Function to handle alternate case
  const handleInverseCase = () => {
    if (inputValue.length === 0) {
      setShowError("Please enter some text to convert.");
      return;
    }
    let newText = "";
    for (let i = 0; i < inputValue.length; i++) {
      if (i % 2 === 0) {
        newText += inputValue[i].toLowerCase();
      } else {
        newText += inputValue[i].toUpperCase();
      }
    }
    setInputValue(newText);
  };
  const handleAlternateCase = () => {
    if (inputValue.length === 0) {
      setShowError("Please enter some text to convert.");
      return;
    }
    let newText = "";
    for (let i = 0; i < inputValue.length; i++) {
      if (i % 2 === 0) {
        newText += inputValue[i].toUpperCase();
      } else {
        newText += inputValue[i].toLowerCase();
      }
    }
    setInputValue(newText);
  };
  const handleSentenceCase = () => {
    if (inputValue.trim().length === 0) {
      setShowError("Please enter some text to convert.");
      return;
    }

    const sentenceCase = inputValue
      .toLowerCase()
      .split(/([.?!]\s*)/) // Split by punctuation and keep the delimiter
      .map((part, index) => {
        if (index % 2 === 0) {
          // Even indices contain the sentence
          return part.charAt(0).toUpperCase() + part.slice(1);
        }
        return part; // Odd indices contain the punctuation and space
      })
      .join("");

    setInputValue(sentenceCase);
    setShowError(""); // Clear error if successful
  };

  return (
    <div className="text-tools-wrapper">
      <div className="tools-header">
        <div>
          <FontAwesomeIcon
            className="headingIcon"
            icon={faArrowUpAZ}
          />
        </div>
        <h3 className="label-big">Case Converter</h3>
      </div>
      <div>
        <div className="export-container">
          {!showCopyPopup ? (
            <span className="export-tools-child" onClick={handleCopyToClipboard}>
              <FontAwesomeIcon
                className="icon-small"
                icon={faClone}
                style={{ color: "#e31c5f" }}
              />
              <span className="label-medium">Copy</span>
            </span>
          ) : (
            <span className="export-tools-child">
              <FontAwesomeIcon
                className="icon-small"
                icon={faCheck}
                style={{ color: "#20c997" }}
              />
              <span className="label-medium" style={{ color: "#20c997" }}>
                Copied
              </span>
            </span>
          )}
          {!showClearPopup ? (
            <span className="export-tools-child" onClick={handleClear}>
              <FontAwesomeIcon
                className="icon-small"
                icon={faArrowsRotate}
                style={{ color: "#e31c5f" }}
              />
              <span className="label-medium">Clear</span>
            </span>
          ) : (
            <span className="export-tools-child">
              <FontAwesomeIcon
                className="icon-small"
                icon={faBroom}
                style={{ color: "#20c997" }}
              />
              <span className="label-medium" style={{ color: "#20c997" }}>
                Cleared
              </span>
            </span>
          )}
        </div>
        <textarea
          className="text-tools-input-box"
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
      <div className="text-tools-buttons-wrapper">
        <div className="text-tools-buttons-container">
          <button className="base-button" onClick={handleUpperCase}>
            Upper case
          </button>
          <button className="base-button" onClick={handleLowerCase}>
            Lower case
          </button>
          <button className="base-button" onClick={handleCapitalizedCase}>
            Capitalized Case
          </button>
          <button className="base-button" onClick={handleAlternateCase}>
            aLtErNaTiNg cAsE
          </button>
          <button className="base-button" onClick={handleInverseCase}>
            InVeRsE cAsE
          </button>
          <button className="base-button" onClick={handleSentenceCase}>
            Sentence case
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;
