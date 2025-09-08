import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import "../styles/emicalculator.css"; // Include the CSS below in this file or import separately

const formatINR = (num) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);

const generateSchedule = (principal, annualRate, tenureYears) => {
  const months = tenureYears * 12;
  const monthlyRate = annualRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  let balance = principal;
  let totalPaid = 0;
  let schedule = [];

  for (let i = 0; i < months; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    totalPaid += principalPaid;

    const year = new Date().getFullYear() + Math.floor(i / 12);
    const month = new Date(0, i % 12).toLocaleString("default", {
      month: "short",
    });

    const yearData = schedule.find((item) => item.year === year);
    const entry = {
      month,
      principal: Math.round(principalPaid),
      interest: Math.round(interest),
      total: Math.round(emi),
      balance: Math.round(balance),
      percentagePaid: ((totalPaid / principal) * 100).toFixed(2) + "%",
    };

    if (yearData) {
      yearData.data.push(entry);
    } else {
      schedule.push({ year, data: [entry] });
    }
  }

  return { emi: Math.round(emi), schedule };
};

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [result, setResult] = useState(null);
  const [emi, setEMI] = useState("0");
  const [totalInterest, setTotalInterest] = useState("0");
  const [totalPayment, setTotalPayment] = useState("0");

  useEffect(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    const emiCalc =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPay = emiCalc * months;
    const interest = totalPay - loanAmount;

    setEMI(Math.round(emiCalc));
    setTotalInterest(Math.round(interest));
    setTotalPayment(Math.round(totalPay));
  }, [loanAmount, interestRate, loanTenure]);

  const handleCalculate = () => {
    const { emi, schedule } = generateSchedule(
      loanAmount,
      interestRate,
      loanTenure
    );
    setResult({ emi, totalInterest, totalPayment, schedule });
  };

  return (
    <div className="age-calculator-container">
      <div className="case-converter-header">
        <div>
          <FontAwesomeIcon
            className="toolIcon"
            icon={faMoneyBills}
            style={{ color: "#e31c5f" }}
          />
        </div>
        <h3>EMI Calculator</h3>
      </div>
        <div className="age-calculator-box">
        <label className="label">
          Loan Amount
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
          />
        </label>
        <label className="label">
          Interest Rate (%)
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(+e.target.value)}
          />
        </label>
        <label className="label">
          Loan Tenure (years)
          <input
            type="number"
            value={loanTenure}
            onChange={(e) => setLoanTenure(+e.target.value)}
          />
        </label>
        <button className="case-converter" onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      {result && (
        <div>
          <div className="emicalculator-result">
            <p>
              Loan EMI: <strong>₹ {emi.toLocaleString()}</strong>
            </p>
            <p>
              Total Interest Payable:{" "}
              <strong>₹ {result.totalInterest.toLocaleString()}</strong>
            </p>
            <p>
              Total Payment (Principal + Interest):{" "}
              <strong>₹ {result.totalPayment.toLocaleString()}</strong>
            </p>
          </div>

          <table className="repayment-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Principal (A)</th>
                <th>Interest (B)</th>
                <th>Total Payment (A + B)</th>
                <th>Balance</th>
                <th>Loan Paid To Date</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((yearBlock, idx) => (
                <React.Fragment key={idx}>
                  <tr className="year-row">
                    <td colSpan="6">
                      <strong>{yearBlock.year}</strong>
                    </td>
                  </tr>
                  {yearBlock.data.map((item, i) => (
                    <tr key={i}>
                      <td>{item.month}</td>
                      <td>{formatINR(item.principal)}</td>
                      <td>{formatINR(item.interest)}</td>
                      <td>{formatINR(item.total)}</td>
                      <td>{formatINR(item.balance)}</td>
                      <td>{item.percentagePaid}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
