import React, { useState } from "react";
import "../styles/Unitconverter.css";

// Unit categories
const unitCategories = ["Length", "Temperature", "Area", "Volume", "Weight", "Time"];

// Conversion units
const lengthUnits = { Meter: 1, Kilometer: 0.001, Centimeter: 100, Millimeter: 1000, Micrometer: 1e6, Nanometer: 1e9, Mile: 0.000621371, Yard: 1.09361, Foot: 3.28084, Inch: 39.3701, "Light Year": 1.057e-16 };
const areaUnits = { "Square Meter": 1, "Square Kilometer": 1e6, "Square Centimeter": 0.0001, "Square Millimeter": 0.000001, "Square Micrometer": 1e-12, Hectare: 10000, "Square Mile": 2.59e6, "Square Yard": 0.836127, "Square Foot": 0.092903, "Square Inch": 0.00064516, Acre: 4046.86 };
const volumeUnits = { "Cubic Meter": 1, "Cubic Kilometer": 1e9, "Cubic Centimeter": 1e-6, "Cubic Millimeter": 1e-9, Liter: 0.001, Milliliter: 1e-6, "Cubic Foot": 0.0283168, "Cubic Inch": 1.6387e-5, Gallon: 0.00378541, Pint: 0.000473176 };
const weightUnits = { Kilogram: 1, Gram: 0.001, Milligram: 1e-6, "Metric Ton": 1000, "Long Ton": 1016.05, "Short Ton": 907.1847, Pound: 0.453592, Ounce: 0.0283495, Carrat: 0.0002, "Atomic Mass Unit": 1.6605390666e-27 };
const timeUnits = { Second: 1, Millisecond: 1e-3, Microsecond: 1e-6, Nanosecond: 1e-9, Picosecond: 1e-12, Minute: 60, Hour: 3600, Day: 86400, Week: 604800, Month: 2629800, Year: 31557600 };

// Temperature conversion
const convertTemperature = (value, from, to) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "";

  let celsius;
  switch (from) {
    case "Celsius": celsius = num; break;
    case "Kelvin": celsius = num - 273.15; break;
    case "Fahrenheit": celsius = (num - 32) * (5 / 9); break;
    default: return "";
  }

  switch (to) {
    case "Celsius": return celsius.toFixed(2);
    case "Kelvin": return (celsius + 273.15).toFixed(2);
    case "Fahrenheit": return ((celsius * 9) / 5 + 32).toFixed(2);
    default: return "";
  }
};

// Formatting numbers
const formatNumber = (num) => {
  const parsed = parseFloat(num);
  if (isNaN(parsed)) return "-";
  return parsed.toExponential().length > 12
    ? parsed.toExponential(6)
    : parsed.toPrecision(10).replace(/\.?0+$/, "");
};

const UnitConverter = () => {
  const [activeCategory, setActiveCategory] = useState("Length");
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Meter");
  const [toValue, setToValue] = useState("");
  const [resultText, setResultText] = useState("");

  const units = {
    Length: Object.keys(lengthUnits),
    Temperature: ["Celsius", "Kelvin", "Fahrenheit"],
    Area: Object.keys(areaUnits),
    Volume: Object.keys(volumeUnits),
    Weight: Object.keys(weightUnits),
    Time: Object.keys(timeUnits),
  };

  const convert = (val, fUnit, tUnit) => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setResultText("Please enter a valid number.");
      setToValue("");
      return;
    }

    let converted;

    switch (activeCategory) {
      case "Length":
        converted = (num / lengthUnits[fUnit]) * lengthUnits[tUnit];
        break;
      case "Temperature":
        converted = convertTemperature(val, fUnit, tUnit);
        break;
      case "Area":
        converted = (num * areaUnits[fUnit]) / areaUnits[tUnit];
        break;
      case "Volume":
        converted = (num * volumeUnits[fUnit]) / volumeUnits[tUnit];
        break;
      case "Weight":
        converted = (num * weightUnits[fUnit]) / weightUnits[tUnit];
        break;
      case "Time":
        converted = (num * timeUnits[fUnit]) / timeUnits[tUnit];
        break;
      default:
        converted = "";
    }

    setToValue(converted);
    setResultText(`Result: ${num} ${fUnit} = ${converted} ${tUnit}`);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      <ul className="navbar">
        {unitCategories.map((category) => (
          <li className="nav-item" key={category}>
            <button
              className="nav-link"
              style={{
                color: activeCategory === category && "#e31c5f" ,
                cursor: "pointer",
              }}
              onClick={() => {
                setActiveCategory(category);
                setFromUnit(units[category][0]);
                setFromValue("");
                setToValue("");
                setResultText("");
              }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <div className="border p-3 mb-3">
        <div className="row mb-2">
          <div className="col">
            <label><strong>From:</strong></label>
            <input
              className="form-control mb-2"
              value={fromValue}
              onChange={(e) => {
                setFromValue(e.target.value);
                convert(e.target.value, fromUnit, units[activeCategory][0]);
              }}
            />
            <select
              className="form-select"
              size="8"
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                convert(fromValue, e.target.value, units[activeCategory][0]);
              }}
            >
              {units[activeCategory].map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div className="col">
            <label><strong>To:</strong></label>
            <input className="form-control mb-2" readOnly value={toValue} />
            <select
              className="form-select"
              size="8"
              onChange={(e) => convert(fromValue, fromUnit, e.target.value)}
            >
              {units[activeCategory].map((unit) => {
                let display = "";
                if (fromValue) {
                  switch (activeCategory) {
                    case "Temperature":
                      display = convertTemperature(fromValue, fromUnit, unit);
                      break;
                    case "Length":
                      display = formatNumber((parseFloat(fromValue) / lengthUnits[fromUnit]) * lengthUnits[unit]);
                      break;
                    case "Area":
                      display = formatNumber((parseFloat(fromValue) * areaUnits[fromUnit]) / areaUnits[unit]);
                      break;
                    case "Volume":
                      display = formatNumber((parseFloat(fromValue) * volumeUnits[fromUnit]) / volumeUnits[unit]);
                      break;
                    case "Weight":
                      display = formatNumber((parseFloat(fromValue) * weightUnits[fromUnit]) / weightUnits[unit]);
                      break;
                    case "Time":
                      display = formatNumber((parseFloat(fromValue) * timeUnits[fromUnit]) / timeUnits[unit]);
                      break;
                    default:
                      display = "";
                  }
                }

                return (
                  <option key={unit} value={unit}>
                    {unit} {display ? `(${display})` : ""}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="text-danger mt-2">
          <strong>{resultText}</strong>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
