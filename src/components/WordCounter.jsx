import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faBroom,
  faCalculator,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="text-tools-wrapper">
      <div className="tools-header">
        <div>
          <FontAwesomeIcon
            className="headingIcon"
            icon={faCalculator}
            style={{ color: "#e31c5f" }}
          />
        </div>
         <h3 className="label-big">Word Counter</h3>
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
              <span className="label-medium"  style={{ color: "#20c997" }}>
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
        <div className="display-card">
          <div className="word-counter-card">
            <span>{stats.characterCount}</span>
            <p className="small">
              {stats.characterCount <= 1 ? "Letter" : "Letters"}
            </p>
            <div className="word-counter-go-corner"></div>
          </div>
          <div className="word-counter-card">
            <span>{stats.wordCount}</span>
            <p className="small">{stats.wordCount <= 1 ? "Word" : "Words"}</p>
            <div className="word-counter-go-corner"></div>
          </div>
          <div className="word-counter-card">
            <span>{stats.sentenceCount}</span>
            <p className="small">
              {stats.sentenceCount <= 1 ? "Sentence" : "Sentences"}
            </p>
            <div className="word-counter-go-corner"></div>
          </div>
          <div className="word-counter-card">
            <span>{stats.lineCount}</span>
            <p className="small">{stats.lineCount <= 1 ? "Line" : "Lines"}</p>
            <div className="word-counter-go-corner"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
