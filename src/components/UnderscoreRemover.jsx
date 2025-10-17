import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faBroom,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="text-tools-wrapper">
      <div className="tools-header">
        <div>
          <FontAwesomeIcon
            className="headingIcon"
            icon={faSquareMinus}
            style={{ color: "#e31c5f" }}
          />
        </div>
         <h3 className="label-big">Underscore & Hyphen Remover</h3>
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
          <button className="base-button" onClick={handleRemoveUnderscore}>
            Remove Underscore
          </button>
          <button className="base-button" onClick={handleRemoveHyphen}>
            Remove Hyphen
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderscoreRemover;
