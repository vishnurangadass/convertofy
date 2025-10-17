import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../styles/emicalculator.css";

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

const COLORS = ["#00C49F", "#FF8042"];

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [result, setResult] = useState(null);
  const [emi, setEMI] = useState("0");
  const [totalInterest, setTotalInterest] = useState("0");
  const [totalPayment, setTotalPayment] = useState("0");

  useEffect(() => {
    if (!loanAmount || !interestRate || !loanTenure) return;

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
    <div className="calculator-tools-container">
      <div className="tools-header">
        <FontAwesomeIcon
          className="headingIcon"
          icon={faMoneyBills}
          style={{ color: "#e31c5f" }}
        />
         <h3 className="label-big">EMI Calculator</h3>
      </div>

      <div className="calculator-tools-box">
        <div className="input-section">
          <div className="input-content">
            <label className="label">Loan Amount (₹)</label>
            <input
              className="input-box"
              type="text"
              name="loan-amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(+e.target.value)}
              min="0"
              max="20000000"
              step="1000"
            />
          </div>

          <input
            type="range"
            min="0"
            max="20000000"
            step="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            className="slider"
          />

          <div className="slider-labels">
            <span>0</span>
            <span>25L</span>
            <span>50L</span>
            <span>75L</span>
            <span>100L</span>
            <span>125L</span>
            <span>150L</span>
            <span>175L</span>
            <span>200L</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="input-section">
          <div className="input-content">
            <label className="label">Interest Rate (%)</label>
            <input
              className="input-box"
              type="text"
              name="interest-rate"
              value={interestRate}
              onChange={(e) => setInterestRate(+e.target.value)}
              min="1"
              max="20"
              step="0.1"
            />
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(+e.target.value)}
            className="slider"
          />
          <div className="slider-labels">
            <span>1%</span>
            <span>5%</span>
            <span>10%</span>
            <span>15%</span>
            <span>20%</span>
          </div>
        </div>
        <div className="input-section">
          <div className="input-content">
            <label className="label">Loan Tenure (Years)</label>
            <input
              className="input-box"
              type="text"
              name="loan-tenure"
              value={loanTenure}
              onChange={(e) => setLoanTenure(+e.target.value)}
              min="1"
              max="30"
            />
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={loanTenure}
            onChange={(e) => setLoanTenure(+e.target.value)}
            className="slider"
          />
          <div className="slider-labels">
            <span>1Y</span>
            <span>5Y</span>
            <span>10Y</span>
            <span>20Y</span>
            <span>30Y</span>
          </div>
        </div>

        <button className="base-button" onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      {result && (
        <div>
          <div className="emicalculator-result">
            <div className="result-container">
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
            <div className="result-chart">
              <PieChart width={250} height={250}>
                <Pie
                  dataKey="value"
                  data={[
                    { name: "Principal", value: loanAmount },
                    { name: "Interest", value: result.totalInterest },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  label
                >
                  <Cell key="cell-principal" fill={COLORS[0]} />
                  <Cell key="cell-interest" fill={COLORS[1]} />
                </Pie>
                <Tooltip
                  formatter={(value) => formatINR(value)}
                  contentStyle={{ fontSize: "13px" }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </div>
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
