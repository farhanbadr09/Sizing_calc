import React, { useState, useEffect } from 'react';
import { calculateMeasurements } from './PrimaryCalculations'; // Correctly import the named export
import { calculateSecondaryMeasurements } from './SecondaryCalculations'; // Correctly import the named export

// This is a functional component where hooks are correctly used
const MeasurementCalculator = ({ measurements = {}, bodyShape = 'average', additionalFactors = {} }) => {
  const [results, setResults] = useState(null);

  // Function to validate and adjust results
  const validateAndAdjustResults = (results) => {
    console.log('Validating and adjusting results:', results);

    // Validate results
    Object.keys(results).forEach(key => {
      if (typeof results[key] !== 'number' || isNaN(results[key]) || results[key] < 0) {
        console.warn(`Invalid value for ${key}. Adjusting to 0.`);
        results[key] = 0;
      }
    });

    console.log('Adjusted results:', results);
  };

  // Function to calculate measurements
  const calculateMeasurements = (measurements, bodyShape, additionalFactors) => {
    console.log('Starting primary and secondary calculations...');

    // Get primary and secondary results
    const primaryResults = calculateMeasurements(measurements, bodyShape, additionalFactors);
    console.log('Primary calculation results:', primaryResults);

    const secondaryResults = calculateSecondaryMeasurements(measurements, bodyShape, additionalFactors);
    console.log('Secondary calculation results:', secondaryResults);

    // Combine results
    const combinedResults = { primaryResults, secondaryResults };
    return applyFinalAdjustments(combinedResults);  // Apply adjustments
  };

  // Function to apply final adjustments to the results
  const applyFinalAdjustments = (results) => {
    console.log('Applying final adjustments to the combined results...');
    validateAndAdjustResults(results.primaryResults);
    validateAndAdjustResults(results.secondaryResults);

    return results;
  };

  // useEffect to calculate the measurements when `measurements` or `bodyShape` changes
  useEffect(() => {
    if (!measurements || Object.keys(measurements).length === 0) {
      console.error("No valid measurements provided.");
      return;
    }

    console.log('useEffect triggered, starting calculations...');
    const calculatedResults = calculateMeasurements(measurements, bodyShape, additionalFactors);
    console.log('Final calculated results:', calculatedResults);

    setResults(calculatedResults);  // Set the results in the state
  }, [measurements, bodyShape, additionalFactors]);  // Re-run calculations if dependencies change

  // Return JSX with results or loading state
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
