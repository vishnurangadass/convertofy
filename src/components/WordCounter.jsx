import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faBroom,
  faCalculator,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/wordcounter.css";

const WordCounter = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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
  const getTextStats = (text) => {
    const characterCount = text?.length;
    const wordCount =
      text?.trim() === "" ? 0 : text?.trim().split(/\s+/).length;
    const sentenceCount = text?.split(/[.!?]+/).filter(Boolean).length;
    const lineCount = text?.split("\n").length;

    return { characterCount, wordCount, sentenceCount, lineCount };
  };
  const stats = getTextStats(inputValue);
  return (
    <div className="case-converter-wrapper">
      <div className="case-converter-header">
        <div>
          <FontAwesomeIcon
            className="toolIcon"
            icon={faCalculator}
            style={{ color: "#e31c5f" }}
          />
        </div>
        <h3>Word Counter</h3>
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
              <span className="headerTool"  style={{ color: "#20c997" }}>
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
        <div className="display-card">
          <div className="card1">
            <span>{stats.characterCount}</span>
            <p className="small">
              {stats.characterCount <= 1 ? "Letter" : "Letters"}
            </p>
            <div className="go-corner"></div>
          </div>
          <div className="card1">
            <span>{stats.wordCount}</span>
            <p className="small">{stats.wordCount <= 1 ? "Word" : "Words"}</p>
            <div className="go-corner"></div>
          </div>
          <div className="card1">
            <span>{stats.sentenceCount}</span>
            <p className="small">
              {stats.sentenceCount <= 1 ? "Sentence" : "Sentences"}
            </p>
            <div className="go-corner"></div>
          </div>
          <div className="card1">
            <span>{stats.lineCount}</span>
            <p className="small">{stats.lineCount <= 1 ? "Line" : "Lines"}</p>
            <div className="go-corner"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
