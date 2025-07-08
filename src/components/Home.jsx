import { useState } from "react";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faBroom,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { QRCodeCanvas } from "qrcode.react";
import AgeCalculator from "./AgeCalculator";
import EMICalculator from "./EMICalculator";

// import { icon } from "@fortawesome/fontawesome-svg-core";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [showClearPopup, setShowClearPopup] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [activeTab, setActiveTab] = useState("CaseConversion");
  const [teams, setTeams] = useState({ teamA: [], teamB: [] });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("danger");
  const [showAgeCalculator, setShowAgeCalculator] = useState(false);
  const [showEMICalculator, setShowEMICalculator] = useState(false);
 


  // Function to handle copy to clipboard
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
    setInputValue(inputValue.toUpperCase());
  };

  // Function to handle lower case
  const handleLowerCase = () => {
    setInputValue(inputValue.toLowerCase());
  };

  // Function to handle capitalized case
  const handleCapitalizedCase = () => {
    const capitalized = inputValue
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    setInputValue(capitalized);
  };

  // Function to handle alternate case
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

  // Functions for other tools
  const handleTrimSpace = () => {
    setInputValue(inputValue?.trim());
  };

  // Function to handle reverse
  const handleReverse = () => {
    const reversed = inputValue.split("").reverse().join("");
    setInputValue(reversed);
  };

  // Function to handle random number generation
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

  // Function to handle removing duplicates
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

  // Function to handle random selection
  const handleRandomSelection = () => {
    if (inputValue.trim() === "") {
      return (
        <div className="alert alert-danger" role="alert">
          Please enter some text!
        </div>
      );
    }
    const items = inputValue
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (items.length === 0) {
      alert("No valid items found!");
      return;
    }
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
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, n);
    setInputValue(selected.join("\n"));
  };
  // Function to handle QR code generation
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
    const lengthInput = prompt("Enter the length of each random text:");
    const textLength = parseInt(lengthInput);

    if (isNaN(textLength) || textLength <= 0) {
      alert("Please enter a valid length!");
      return;
    }
    const comboInput = prompt("Enter how many random combinations you want:");
    const comboCount = parseInt(comboInput);

    if (isNaN(comboCount) || comboCount <= 0) {
      alert("Please enter a valid number of combinations!");
      return;
    }

    // Generate random text
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

  // Function to handle team split
  const handleTeamSplit = () => {
    if (inputValue.trim() === "") {
      setAlertMessage("Please enter some names.");
      setAlertType("danger");
      return;
    }
    const names = inputValue
      .split(/[\n,]+/)
      .map((name) => name.trim())
      .filter((name) => name !== "");

    if (names.length < 2) {
      setAlertMessage("Please enter at least 2 names.");
      setAlertType("danger");
      return;
    }
    const shuffled = [...names].sort(() => 0.5 - Math.random());

    const half = Math.ceil(shuffled.length / 2);
    const teamA = shuffled.slice(0, half);
    const teamB = shuffled.slice(half);

    setTeams({ teamA, teamB });
    setAlertMessage(`Successfully split into 2 teams!`);
    setAlertType("success");
  };

  const stats = getTextStats(inputValue);

  return (
    <div className="main-container">
     

      <div className="tools-container">
        <div className="content-header">
          <div className="tools">
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

            {alertMessage && (
              <div className={`alert alert-${alertType} mt-3`} role="alert">
                {alertMessage}
              </div>
            )}
            {(teams.teamA.length > 0 || teams.teamB.length > 0) && (
              <div className="row mt-4">
                <div className="col-md-6">
                  <h5>Team A</h5>
                  <ul className="list-group">
                    {teams.teamA.map((name, index) => (
                      <li className="list-group-item" key={index}>
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Team B</h5>
                  <ul className="list-group">
                    {teams.teamB.map((name, index) => (
                      <li className="list-group-item" key={index}>
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
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

        <ul className="nav nav-tab">
          <li className="nav-item">
            <span
              className="nav-link"
              aria-current="page"
              onClick={() => setActiveTab("CaseConversion")}
              style={{
                color: activeTab === "CaseConversion" && "#e31c5f",
                cursor: "pointer",
              }}
            >
              Case Conversion
            </span>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => setActiveTab("Randoms")}
              style={{
                color: activeTab === "Randoms" && "#e31c5f",
                cursor: "pointer",
              }}
            >
              Randoms
            </span>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => setActiveTab("othertools")}
              style={{
                color: activeTab === "othertools" && "#e31c5f",
                cursor: "pointer",
              }}
            >
              Other Tools
            </span>
          </li>
        </ul>
        <div></div>
        {activeTab === "CaseConversion" && (
          <div className="sub-tools-container">
            <button className="toolBtn" onClick={handleUpperCase}>
              Upper case
            </button>
            <button className="toolBtn" onClick={handleLowerCase}>
              Lower case
            </button>
            <button className="toolBtn" onClick={handleCapitalizedCase}>
              Capitalized Case
            </button>
            <button className="toolBtn" onClick={handleAlternateCase}>
              aLtErNaTiNg cAsE
            </button>
          </div>
        )}

        {activeTab === "Randoms" && (
          <div className="sub-tools-container">
            <button className="toolBtn" onClick={handleRandomSelection}>
              Random Selection
            </button>
            <button className="toolBtn" onClick={handleRandomNumber}>
              Random Number
            </button>
            <button className="toolBtn" onClick={handleRandomText}>
              Random Text
            </button>
            <button className="toolBtn" onClick={handleTeamSplit}>
              Random Team Selection
            </button>
          </div>
        )}
        {activeTab === "othertools" && (
          <div className="sub-tools-container">
            <button className="toolBtn" onClick={handleQRCode}>
              QR Code Generator
            </button>
            <button className="toolBtn" onClick={handleTrimSpace}>
              Trim space
            </button>
            <button className="toolBtn" onClick={handleReverse}>
              Reverse
            </button>
            <button className="toolBtn" onClick={handleRemoveDuplicates}>
              RemoveDuplicates
            </button>
            <button
              className="toolBtn"
              onClick={() => setShowAgeCalculator(true)}
            >
              Age Calculator
            </button>
            <button
              className="toolBtn"
              onClick={() => setShowEMICalculator(true)}
            >
              EMI Calculator
            </button>
          </div>
        )}
        <div>{showAgeCalculator && <AgeCalculator />}</div>
        <div>{showEMICalculator && <EMICalculator />}</div>
        <div className="counts-container">
          <p
            className="count"
            style={{ marginTop: "20px", fontWeight: "bold" }}
          >
            Character Count: {stats.characterCount}
          </p>
          <p
            className="count"
            style={{ marginTop: "20px", fontWeight: "bold" }}
          >
            Word Count: {stats.wordCount}
          </p>
          <p
            className="count"
            style={{ marginTop: "20px", fontWeight: "bold" }}
          >
            Sentence Count: {stats.sentenceCount}
          </p>
          <p style={{ marginTop: "20px", fontWeight: "bold" }}>
            Line Count: {stats.lineCount}
          </p>
        </div>
        {showQRCode && (
          <div style={{ marginTop: "20px" }}>
            <QRCodeCanvas
              value={inputValue}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
