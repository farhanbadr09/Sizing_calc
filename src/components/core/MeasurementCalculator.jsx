import React, { useState } from 'react';
import { BaseCalculator } from './BaseCalculator.jsx';
import PrimaryCalculations from './PrimaryCalculations.jsx';
import SecondaryCalculations from './SecondaryCalculations.jsx';

class MeasurementCalculator extends BaseCalculator {
  constructor() {
    super();
    this.primaryCalc = PrimaryCalculations;
    this.secondaryCalc = SecondaryCalculations;
  }

  // Validate and adjust the results, ensuring all values are numbers and >= 0
  validateAndAdjustResults(results) {
    Object.keys(results).forEach((key) => {
      if (typeof results[key] !== 'number' || isNaN(results[key]) || results[key] < 0) {
        console.warn(`Invalid value for ${key}. Adjusting to 0.`);
        results[key] = 0;
      }
    });
  }

  // Main method to calculate measurements
  calculateMeasurements(measurements, bodyShape = 'average', additionalFactors = {}) {
    // Calculate primary measurements
    const primaryResults = this.primaryCalc.calculateMeasurements(measurements, bodyShape, additionalFactors);

    // Calculate secondary measurements
    const secondaryResults = this.secondaryCalc.calculateSecondaryMeasurements(measurements, bodyShape, additionalFactors);

    // Combine primary and secondary results
    const combinedResults = {
      primaryResults,
      secondaryResults,
    };

    // Apply final adjustments to the combined results
    return this.applyFinalAdjustments(combinedResults);
  }

  // Any final adjustments before returning results
  applyFinalAdjustments(results) {
    // Placeholder for any additional logic (e.g., rounding, applying thresholds, etc.)
    return results;
  }
}

// React functional component for user interaction (UI)
const MeasurementCalculatorComponent = () => {
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    waist: '',
    bust: '',
  });
  const [results, setResults] = useState(null);
  const [bodyShape, setBodyShape] = useState('average');
  const [additionalFactors, setAdditionalFactors] = useState({});

  const handleCalculate = () => {
    const calc = new MeasurementCalculator();

    // Validate and calculate results
    const calculatedResults = calc.calculateMeasurements(measurements, bodyShape, additionalFactors);
    setResults(calculatedResults);
  };

  return (
    <div className="calculator-container">
      <h2>Measurement Calculator</h2>
      <div className="input-form">
        <label>
          Height:
          <input
            type="number"
            value={measurements.height}
            onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            value={measurements.weight}
            onChange={(e) => setMeasurements({ ...measurements, weight: e.target.value })}
          />
        </label>
        <label>
          Waist:
          <input
            type="number"
            value={measurements.waist}
            onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
          />
        </label>
        <label>
          Bust:
          <input
            type="number"
            value={measurements.bust}
            onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
          />
        </label>
        <label>
          Body Shape:
          <select
            value={bodyShape}
            onChange={(e) => setBodyShape(e.target.value)}
          >
            <option value="average">Average</option>
            <option value="hourglass">Hourglass</option>
            <option value="pear">Pear</option>
            <option value="apple">Apple</option>
            <option value="invertedTriangle">Inverted Triangle</option>
          </select>
        </label>
        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {/* Display the results if available */}
      {results && (
        <div className="results">
          <h3>Results</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MeasurementCalculatorComponent;
