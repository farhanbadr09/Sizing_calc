// eventHandlers.jsx
import React, { useState } from 'react';
import { validateInputs } from '../utils/validation.jsx';
import MeasurementCalculator from '../core/MeasurementCalculator.jsx';
import  confidenceCalculator  from '../core/ConfidenceCalculator.jsx';
import { createProportionRow } from './uiUpdater'; // Adjust the path accordingly
import { getConfidenceColor, generateImprovementSuggestions} from './uiUpdater.jsx';

export const CalculationHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [confidenceLevel, setConfidenceLevel] = useState(null);

  const handleCalculation = () => {
    setIsLoading(true);
    setErrors([]);
    setResults(null);
    setConfidenceScore(null);
    setConfidenceLevel(null);

    const measurements = {
      height: parseFloat(document.getElementById('height').value),
      waist: parseFloat(document.getElementById('waist').value),
      bust: parseFloat(document.getElementById('bust').value),
      bodyShape: document.getElementById('bodyShape').value,
    };

    const validationErrors = validateInputs(measurements);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    const calculator = new MeasurementCalculator();

    setTimeout(() => {
      const additionalFactors = {
        age: document.getElementById('age').value,
        bodyType: document.getElementById('bodyType').value,
        heightCategory: measurements.height
          ? calculator.getHeightCategory(measurements.height)
          : 'average',
      };

      const calculatedResults = calculator.calculateMeasurements(
        measurements,
        measurements.bodyShape,
        additionalFactors
      );

      const score = confidenceCalculator.calculateConfidence(
        { ...measurements, ...calculatedResults },
        additionalFactors
      );

      const level = confidenceCalculator.getConfidenceLevel(score);

      setResults(calculatedResults);
      setConfidenceScore(score);
      setConfidenceLevel(level);
      setIsLoading(false);
    }, 1000);
  };

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="results-container">
        <div className="font-bold text-lg mb-3" style={{ color: getConfidenceColor(confidenceScore) }}>
          Confidence Level: {confidenceLevel} ({confidenceScore}%)
        </div>
        {generateImprovementSuggestions(results)}
        <div className="proportion-analysis">
          <div className="font-bold text-lg mb-3">Proportion Analysis</div>
          {results.bust && results.waist && createProportionRow('Bust-to-Waist Ratio', (results.bust / results.waist).toFixed(2))}
          {results.hips && results.waist && createProportionRow('Hips-to-Waist Ratio', (results.hips / results.waist).toFixed(2))}
          {results.height && results.waist && createProportionRow('Height-to-Waist Ratio', (results.height / results.waist).toFixed(2))}
        </div>
      </div>
    );
  };

  return (
    <div className="calculation-handler">
      <button className="calculate-button" onClick={handleCalculation}>
        {isLoading ? 'Calculating...' : 'Calculate'}
      </button>
      {errors.length > 0 && (
        <div className="error-container">
          <div className="font-semibold text-red-500">Errors:</div>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {renderResults()}
    </div>
  );
};