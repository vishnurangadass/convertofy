import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import "../styles/agecalculator.css";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [ageDate, setAgeDate] = useState("");
  const [result, setResult] = useState("");

  const calculateAge = () => {
    if (!dob || !ageDate) return;

    const birthDate = new Date(dob);
    const givenDate = new Date(ageDate);

    let years = givenDate.getFullYear() - birthDate.getFullYear();
    let months = givenDate.getMonth() - birthDate.getMonth();
    let days = givenDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(
        givenDate.getFullYear(),
        givenDate.getMonth(),
        0
      ).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setResult(`Your Age is ${years} years ${months} months ${days} days`);
  };

  return (
    <div className="age-calculator-container">
      <div className="case-converter-header">
        <div>
          <FontAwesomeIcon
            className="toolIcon"
            icon={faCalculator}
            style={{ color: "#e31c5f" }}
          />
        </div>
        <h3>Age Calculator</h3>
      </div>
      <div className="age-calculator-wrapper">
        <div className="age-calculator-box">
          <div>
            <label className="label">Date Of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Age at date</label>
            <input
              type="date"
              value={ageDate}
              onChange={(e) => setAgeDate(e.target.value)}
            />
          </div>
          <button className="case-converter" onClick={calculateAge}>
            Calculate
          </button>
        </div>
        {result && (
          <div className="result-box">
            <span>{result}</span>
            <div className="result-go-corner"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AgeCalculator;
