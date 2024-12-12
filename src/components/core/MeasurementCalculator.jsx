import React, { useState, useEffect } from 'react';
import { BaseCalculator } from './BaseCalculator';
import PrimaryCalculations from './PrimaryCalculations';
import SecondaryCalculations from './SecondaryCalculations';

const MeasurementCalculator = ({ measurements, bodyShape = 'average', additionalFactors = {} }) => {
  const [results, setResults] = useState(null);

  // Validate and adjust results if any measurement is invalid
  const validateAndAdjustResults = (results) => {
    Object.keys(results).forEach(key => {
      if (typeof results[key] !== 'number' || isNaN(results[key]) || results[key] < 0) {
        console.warn(`Invalid value for ${key}. Adjusting to 0.`);
        results[key] = 0;
      }
    });
  };

  // Calculate measurements
  const calculateMeasurements = () => {
    // Calculate primary measurements
    const primaryResults = PrimaryCalculations.calculateMeasurements(measurements, bodyShape, additionalFactors);
    
    // Calculate secondary measurements
    const secondaryResults = SecondaryCalculations.calculateSecondaryMeasurements(measurements, bodyShape, additionalFactors);
    
    // Combine primary and secondary results
    const combinedResults = {
      primaryResults,
      secondaryResults
    };
    
    // Apply final adjustments and return
    validateAndAdjustResults(combinedResults);
    return combinedResults;
  };

  useEffect(() => {
    const calculatedResults = calculateMeasurements();
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
