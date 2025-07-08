import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
  faBroom,
  faCheck,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";

const QrCodeGenerator = () => {
  const [showQRCode, setShowQRCode] = useState(false);
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
    setShowQRCode(false);
    setTimeout(() => {
      setShowClearPopup(false);
    }, 3000);
  };
  const handleQRCode = () => {
    if (inputValue.trim() === "") {
      alert("Please enter some text to generate QR Code!");
      return;
    }
    setShowQRCode(true);
  };
  return (
    <div>
      <div className="case-converter-header">
        <div>
          <FontAwesomeIcon
            className="toolIcon"
            icon={faQrcode}
            style={{ color: "#e31c5f" }}
          />
        </div>
        <h3>Qr Code Generator</h3>
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
                style={{ color: "#1F7D53" }}
              />
              <span className="headerTool" style={{ color: "#1F7D53" }}>
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
        <button className="case-converter" onClick={handleQRCode}>
          QR Code Generator
        </button>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
