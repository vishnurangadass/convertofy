import React, { useState } from "react";
import "../styles/simpleinterestcalculator.css";

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const formatINR = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const calculateInterest = (e) => {
    e.preventDefault();
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (!isNaN(P) && !isNaN(R) && !isNaN(T)) {
      const SI = (P * R * T) / 100;
      setInterest(SI.toFixed(2));
      setTotalAmount((P + SI).toFixed(2));
      const yearlyInterest = (P * R) / 100;
      const newSchedule = [];

      for (let year = 1; year <= T; year++) {
        const interestSoFar = yearlyInterest * year;
        const total = P + interestSoFar;

        newSchedule.push({
          year,
          principal: P,
          interest: interestSoFar,
          total,
        });
      }

      setSchedule(newSchedule);
    } else {
      setInterest(null);
      setTotalAmount(null);
      setSchedule([]);
    }
  };

  return (
    <div className="sicalculator-container">
      <h2 className="sicalculator-container-h2">Simple Interest Calculator</h2>
      <div className="sicalculator-box">
        <form onSubmit={calculateInterest}>
          <div className="sicalculator-input-group">
            <label className="sicalculator-label">Principal (₹)</label>
            <input
              className="sicalculator-input"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter principal amount"
              required
            />
          </div>
          <div className="sicalculator-input-group">
            <label className="sicalculator-label">Rate of Interest (%)</label>
            <input
              className="sicalculator-input"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              required
            />
          </div>
          <div className="sicalculator-input-group">
            <label className="sicalculator-label">Time (Years)</label>
            <input
              className="sicalculator-input"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time in years"
              required
            />
          </div>
          <button className="sicalculator-button" type="submit">
            Calculate
          </button>
        </form>

        {interest !== null && totalAmount !== null && (
          <div className="sicalculator-result">
            <p>
              <strong>Principal Amount:</strong>{" "}
              {formatINR(parseFloat(principal))}
            </p>
            <p>
              <strong>Interest Earned:</strong> {formatINR(interest)}
            </p>
            <p>
              <strong>Total Amount:</strong> {formatINR(totalAmount)}
            </p>
          </div>
        )}
        {schedule.length > 0 && (
          <div className="schedule-table">
            <h3>Yearly Schedule</h3>
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Principal Amount</th>
                  <th>Interest Amount</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item) => (
                  <tr key={item.year}>
                    <td>{item.year}</td>
                    <td>{formatINR(item.principal)}</td>
                    <td>{formatINR(item.interest)}</td>
                    <td>{formatINR(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleInterestCalculator;
