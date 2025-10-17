import React, { useState } from 'react';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('1');
  const [compoundInterest, setCompoundInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const formatINR = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);

  const calculateCompoundInterest = (e) => {
    e.preventDefault();

    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const N = parseInt(frequency);

    if (!isNaN(P) && !isNaN(R) && !isNaN(T) && !isNaN(N)) {
      const A = P * Math.pow(1 + R / N, N * T);
      const CI = A - P;
      setTotalAmount(A);
      setCompoundInterest(CI);
    } else {
      setCompoundInterest(null);
      setTotalAmount(null);
    }
  };

  return (
    <div className="cicalculator-container">
       <h3 className="label-big">Compound Interest Calculator</h3>
      <div className="cicalculator-box">
      <form onSubmit={calculateCompoundInterest}>
        <div className="cicalculator-input-group">
          <label className='cicalculator-label'>Principal (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter principal amount"
            required
          />
        </div>

        <div className="cicalculator-input-group">
          <label className='cicalculator-label'>Rate of Interest (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter rate"
            required
          />
        </div>

        <div className="cicalculator-input-group">
          <label className='cicalculator-label'>Time (Years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time"
            required
          />
        </div>

        <div className="cicalculator-input-group">
          <label className='cicalculator-label'>Compounded</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
            <option value="1">Annually</option>
            <option value="2">Semi-Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <button className='cicalculator-button' type="submit">Calculate</button>
      </form>

      {compoundInterest !== null && totalAmount !== null && (
        <div className="cicalculator-result">
          <p><strong>Principal Amount:</strong> {formatINR(parseFloat(principal))}</p>
          <p><strong>Compound Interest:</strong> {formatINR(compoundInterest)}</p>
          <p><strong>Total Amount:</strong> {formatINR(totalAmount)}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
