import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faBroom,
  faCheck,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

const InstagramHashtagGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [hashtags, setHashtags] = useState([]);
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

  const generateHashtags = (input) => {
    const words = input
      .split(",")
      .map((word) => word.trim().toLowerCase().replace(/\s+/g, ""))
      .filter(Boolean);

    const generated = [];

    words.forEach((word) => {
      generated.push(
        `#${word}`,
        `#${word}life`,
        `#insta${word}`,
        `#${word}daily`,
        `#${word}vibes`,
        `#${word}love`,
        `#${word}gram`
      );
    });

    // Remove duplicates and limit to 15
    const unique = Array.from(new Set(generated)).sort(
      () => 0.5 - Math.random()
    );
    setHashtags(unique.slice(0, 15));
  };

  const handleGenerate = () => {
    generateHashtags(inputValue);
  };

  return (
    <div className="case-converter-wrappe">
      <div className="case-converter-header">
        <div>
          <FontAwesomeIcon
            className="toolIcon"
            icon={faHashtag}
            style={{ color: "#e31c5f" }}
          />
        </div>
        <h3>Hashtag Generator</h3>
      </div>
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
        rows={3}
        placeholder="Enter inputValue (e.g., travel, sunset, beach)"
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
      <button className="case-converter" onClick={handleGenerate}>
        Generate Hashtags
      </button>

      {hashtags.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Generated Hashtags:</h2>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramHashtagGenerator;
