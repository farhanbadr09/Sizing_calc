// MeasurementCalculator.jsx
import React, { useState, useEffect } from 'react';
import PrimaryCalculations from './PrimaryCalculations.jsx';
import SecondaryCalculations from './SecondaryCalculations.jsx';

const MeasurementCalculator = ({ measurements, bodyShape = 'average', additionalFactors = {} }) => {
  const [results, setResults] = useState(null);

  const primaryCalc = PrimaryCalculations;
  const secondaryCalc = SecondaryCalculations;

  const validateAndAdjustResults = (results) => {
    Object.keys(results).forEach(key => {
      if (typeof results[key] !== 'number' || isNaN(results[key]) || results[key] < 0) {
        console.warn(`Invalid value for ${key}. Adjusting to 0.`);
        results[key] = 0;
      }
    });
  };

  const calculateMeasurements = (measurements, bodyShape, additionalFactors) => {
    const primaryResults = primaryCalc.calculateMeasurements(measurements, bodyShape, additionalFactors);
    const secondaryResults = secondaryCalc.calculateSecondaryMeasurements(measurements, bodyShape, additionalFactors);

    const combinedResults = { primaryResults, secondaryResults };
    return applyFinalAdjustments(combinedResults);
  };

  const applyFinalAdjustments = (results) => {
    validateAndAdjustResults(results);
    return results;
  };

  useEffect(() => {
    const calculatedResults = calculateMeasurements(measurements, bodyShape, additionalFactors);
    setResults(calculatedResults);
  }, [measurements, bodyShape, additionalFactors]);

  return (
    <div>
      <h3>Measurement Calculation Results</h3>
      {results ? (
        <div>
          <h4>Primary Results</h4>
          <pre>{JSON.stringify(results.primaryResults, null, 2)}</pre>
          <h4>Secondary Results</h4>
          <pre>{JSON.stringify(results.secondaryResults, null, 2)}</pre>
        </div>
      ) : (
        <p>Calculating...</p>
      )}
    </div>
  );
};

export default MeasurementCalculator;
