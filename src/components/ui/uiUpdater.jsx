import React, { useState, useEffect } from 'react';
import { validateProportions } from '../utils/validation.js';

const UIUpdater = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [confidenceLevel, setConfidenceLevel] = useState(null);

  useEffect(() => {
    // Handle loading state
    if (isLoading) {
      document.getElementById('loadingOverlay').style.display = 'flex';
      document.getElementById('results').style.display = 'none';
      document.getElementById('errorMessages').style.display = 'none';
    } else {
      document.getElementById('loadingOverlay').style.display = 'none';
    }
  }, [isLoading]);

  useEffect(() => {
    // Handle errors
    if (errors.length > 0) {
      const errorElement = document.getElementById('errorMessages');
      errorElement.innerHTML = errors.map((error) => (
        <div key={error} className="flex items-center mb-1">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div>{error}</div>
        </div>
      ));
      errorElement.style.display = 'block';
    } else {
      errorElement.style.display = 'none';
    }
  }, [errors]);

  useEffect(() => {
    // Handle results
    if (results) {
      document.getElementById('results').style.display = 'block';

      // Update primary measurements
      updatePrimaryMeasurements(results.primaryResults);

      // Update secondary measurements
      updateSecondaryMeasurements(results.secondaryResults);

      // Update confidence display
      updateConfidenceDisplay(confidenceScore, confidenceLevel, results.measurements);

      // Update size prediction
      updateSizePrediction(results.primaryResults);

      // Update proportions and warnings
      updateProportionsAndWarnings(results.primaryResults, results.measurements);
    }
  }, [results, confidenceScore, confidenceLevel]);

  // Helper functions
  const updatePrimaryMeasurements = (results) => {
    const measures = ['bust', 'waist', 'hips'];
    measures.forEach((measure) => {
      const element = document.getElementById(`result-${measure}`);
      element.textContent = results[measure] ? `${results[measure].toFixed(1)}"` : '-';
      animateValue(element, results[measure]);
    });
  };

  const updateSecondaryMeasurements = (results) => {
    const measures = ['shoulder', 'upperarm', 'thigh', 'inseam'];
    measures.forEach((measure) => {
      const element = document.getElementById(`result-${measure}`);
      const value = measure === 'upperarm' ? results.upperArm : results[measure];
      element.textContent = value ? `${value.toFixed(1)}"` : '-';
      animateValue(element, value);
    });
  };

  const updateConfidenceDisplay = (score, level, measurements) => {
    const confidenceAlert = document.getElementById('confidence-alert');
    confidenceAlert.className = `alert ${level.class} mb-4`;

    let content = (
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-bold text-lg">{level.text}</div>
          <div className="text-sm mt-1">{level.description}</div>
        </div>
        <div className="text-3xl font-bold">{score}%</div>
      </div>
    );

    content += (
      <div className="confidence-bar">
        <div
          className="confidence-fill"
          style={{ width: `${score}%`, backgroundColor: getConfidenceColor(score) }}
        />
      </div>
    );

    if (score < 90) {
      content += generateImprovementSuggestions(measurements);
    }

    confidenceAlert.innerHTML = content;
  };

  const getConfidenceColor = (score) => {
    if (score >= 90) return '#10B981'; // Green
    if (score >= 75) return '#3B82F6'; // Blue
    if (score >= 60) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const generateImprovementSuggestions = (measurements) => {
    let suggestions = (
      <div className="mt-4 bg-white bg-opacity-50 rounded-lg p-3">
        <div className="font-semibold mb-2">To improve accuracy:</div>
        <ul className="list-disc pl-5 space-y-1">
          {(!measurements.height && <li>Add height measurement</li>)}
          {(!measurements.bust && <li>Add bust measurement</li>)}
          {(!measurements.waist && <li>Add waist measurement</li>)}
          {measurements.bodyShape === 'average' && (
            <li>Specify a more precise body shape</li>
          )}
        </ul>
      </div>
    );
    return suggestions;
  };

  const updateSizePrediction = (results) => {
    const sizePrediction = document.getElementById('size-prediction');
    sizePrediction.innerHTML = (
      <div>
        <div className="font-bold text-lg mb-2">Size Prediction</div>
        <div className="text-2xl font-bold mb-2">{results.size || 'M'}</div>
        <div className="text-sm">Based on your measurements and body proportions</div>
      </div>
    );
  };

  const updateProportionsAndWarnings = (results, measurements) => {
    // Update proportions analysis
    const proportions = document.getElementById('proportions');
    let proportionText = (
      <div className="font-bold text-lg mb-3">Proportion Analysis</div>
    );

    if (results.bust && results.waist) {
      const bustToWaist = (results.bust / results.waist).toFixed(2);
      proportionText += createProportionRow('Bust-to-Waist Ratio', bustToWaist);
    }
    if (results.hips && results.waist) {
      const hipsToWaist = (results.hips / results.waist).toFixed(2);
      proportionText += createProportionRow('Hips-to-Waist Ratio', hipsToWaist);
    }
    if (measurements.height && results.waist) {
      const heightToWaist = (measurements.height / results.waist).toFixed(2);
      proportionText += createProportionRow('Height-to-Waist Ratio', heightToWaist);
    }

    proportions.innerHTML = proportionText;

    // Update warnings
    const warnings = validateProportions({ ...measurements, ...results });
    const warningsElement = document.getElementById('warnings');

    if (warnings.length > 0) {
      warningsElement.className = 'alert alert-warning mb-4';
      warningsElement.innerHTML = (
        <div>
          <div className="font-bold text-lg mb-2">Proportion Warnings</div>
          <ul className="list-disc pl-5 space-y-1">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <div className="text-sm mt-2 italic">
            These warnings can be measurement errors or unique body proportions.
          </div>
        </div>
      );
      warningsElement.style.display = 'block';
    } else {
      warningsElement.style.display = 'none';
    }

  static createProportionRow(label, value) {
    return (
      <div className="flex justify-between items-center mb-2 bg-white bg-opacity-50 rounded p-2">
        <span className="font-medium">{label}</span>
        <span className="font-bold">{value}</span>
      </div>
    );
  }

  static animateValue(element, value) {
    if (!value) return;

    const start = 0;
    const duration = 1000;
    const startTimestamp = performance.now();

    const updateValue = (currentTimestamp) => {
      const elapsed = currentTimestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = (progress * value).toFixed(1);
      element.textContent = `${currentValue}"`;

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }
}