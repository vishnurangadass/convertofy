import React, { useState } from "react";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { QRCodeCanvas } from "qrcode.react";
import logo from "../assets/convertofy-horizontal.png"

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [activeTab, setActiveTab] = useState("randomText");

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleUpperCase = () => {
    setInputValue(inputValue.toUpperCase());
  };

  const handleLowerCase = () => {
    setInputValue(inputValue.toLowerCase());
  };

  const handleCapitalizedCase = () => {
    const capitalized = inputValue
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    setInputValue(capitalized);
  };

  const handleAlternateCase = () => {
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

  const handleTrimSpace = () => {
    setInputValue(inputValue?.trim());
  };

  const handleReverse = () => {
    const reversed = inputValue.split("").reverse().join("");
    setInputValue(reversed);
  };

  const handleRandomNumber = () => {
    const digitsInput = prompt("How many digits per number do you need?");
    const digits = parseInt(digitsInput);

    if (isNaN(digits) || digits <= 0) {
      alert("Please enter a valid positive number for digits!");
      return;
    }

    const combinationsInput = prompt("How many combinations do you need?");
    const combinations = parseInt(combinationsInput);

    if (isNaN(combinations) || combinations <= 0) {
      alert("Please enter a valid positive number for combinations!");
      return;
    }

    const randomNumbersList = [];

    for (let i = 0; i < combinations; i++) {
      let number = "";
      for (let j = 0; j < digits; j++) {
        number += Math.floor(Math.random() * 10);
      }
      randomNumbersList.push(number);
    }

    setInputValue(randomNumbersList.join(", "));
  };

  const handleRemoveDuplicates = () => {
    const wordsArray = inputValue?.trim().split(/\s+/);
    const uniqueWords = [...new Set(wordsArray)];
    setInputValue(uniqueWords.join(" "));
  };

  const getTextStats = (text) => {
    const characterCount = text?.length;
    const wordCount =
      text?.trim() === "" ? 0 : text?.trim().split(/\s+/).length;
    const sentenceCount = text?.split(/[.!?]+/).filter(Boolean).length;
    const lineCount = text?.split("\n").length;

    return { characterCount, wordCount, sentenceCount, lineCount };
  };

  const handleRandomSelection = () => {
    if (inputValue.trim() === "") {
      alert("Please enter some text!");
      return;
    }

    // Split input into an array (assuming separated by new lines or commas)
    const items = inputValue
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (items.length === 0) {
      alert("No valid items found!");
      return;
    }

    // Ask user how many they want
    const userInput = prompt(
      `There are ${items.length} items. How many random selections you want?`
    );
    const n = parseInt(userInput);

    if (isNaN(n) || n <= 0) {
      alert("Please enter a valid number!");
      return;
    }

    if (n > items.length) {
      alert(`You can't select more than ${items.length} items!`);
      return;
    }

    // Randomly pick 'n' items
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, n);
    setInputValue(selected.join("\n"));
  };
  const handleQRCode = () => {
    if (inputValue.trim() === "") {
      alert("Please enter some text to generate QR Code!");
      return;
    }
    setShowQRCode(true);
  };
  const handleRandomText = () => {
    if (inputValue.trim() === "") {
      alert("Please enter some characters to generate from!");
      return;
    }

    const characters = inputValue.split("").filter((c) => c.trim() !== "");

    // Ask for length
    const lengthInput = prompt("Enter the length of each random text:");
    const textLength = parseInt(lengthInput);

    if (isNaN(textLength) || textLength <= 0) {
      alert("Please enter a valid length!");
      return;
    }

    // Ask for combinations
    const comboInput = prompt("Enter how many random combinations you want:");
    const comboCount = parseInt(comboInput);

    if (isNaN(comboCount) || comboCount <= 0) {
      alert("Please enter a valid number of combinations!");
      return;
    }

    const generateRandomText = () => {
      let result = "";
      for (let i = 0; i < textLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    };

    const generatedTexts = [];
    for (let i = 0; i < comboCount; i++) {
      generatedTexts.push(generateRandomText());
    }
    setInputValue(generatedTexts.join("\n"));
  };

  const stats = getTextStats(inputValue);

  return (
    <div className="main-container">
      <div className="header">
        <img
          className="main-logo"
          src={logo}
          alt="logo"
          width={100}
          height={100}
        />
        <div className="tools">
          <span className="tools-child" onClick={handleCopyToClipboard}>
            {" "}
            <FontAwesomeIcon icon={faClone} style={{ color: "#e31c5f" }} />
            <span>Copy</span>
          </span>
          <span className="tools-child" onClick={handleClear}>
            {" "}
            <FontAwesomeIcon
              icon={faArrowsRotate}
              style={{ color: "#e31c5f" }}
            />
            <span>Clear</span>
          </span>
        </div>
      </div>
      <div className="tools-container">

        {showPopup && (
          <div
          className="toast align-items-center text-white bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Copied!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
        )}
        <textarea
          className="main-input-box"
          type="text"
          placeholder="Use me to convert you wish........."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowQRCode(false);
          }}
        />
        <div>
          <button
            onClick={() => setActiveTab("CaseConversion")}
            style={{
              // padding: "10px 20px",
              // marginRight: "10px",
              backgroundColor:
                activeTab === "CaseConversion" ? "#007bff" : "#ccc",
              color: activeTab === "CaseConversion" ? "white" : "black",
              border: "#000000",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Case Conversion
          </button>
          <button
            onClick={() => setActiveTab("Randoms")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "Randoms" ? "#007bff" : "#ccc",
              color: activeTab === "Randoms" ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Randoms
          </button>
          <button
            onClick={() => setActiveTab("othertools")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "othertools" ? "#007bff" : "#ccc",
              color: activeTab === "othertools" ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Other Tools
          </button>
        </div>
        {/* Tab Content */}
        {activeTab === "CaseConversion" && (
          <div className="tools-container">
            <button onClick={handleUpperCase}>Upper case</button>
            <button onClick={handleLowerCase}>Lower case</button>
            <button onClick={handleCapitalizedCase}>Capitalized Case</button>
            <button onClick={handleAlternateCase}>aLtErNaTiNg cAsE</button>
          </div>
        )}

        {activeTab === "Randoms" && (
          <div className="tools-container">
            <button onClick={handleRandomSelection}>Random Selection</button>
            <button onClick={handleRandomNumber}>Random Number</button>
            <button onClick={handleRandomText}>Random Text</button>
          </div>
        )}
        {activeTab === "othertools" && (
          <div className="tools-container">
            <button onClick={handleQRCode}>QR Code Generator</button>
            <button onClick={handleTrimSpace}>Trim space</button>
            <button onClick={handleReverse}>Reverse</button>
            <button onClick={handleRemoveDuplicates}>RemoveDuplicates</button>
          </div>
        )}

        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Character Count: {stats.characterCount} | Word Count:{" "}
          {stats.wordCount} | Sentence Count: {stats.sentenceCount} | Line
          Count: {stats.lineCount}
        </p>
        {showQRCode && (
          <div style={{ marginTop: "20px" }}>
            <QRCodeCanvas
              value={inputValue}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H" // High error correction
              includeMargin={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
