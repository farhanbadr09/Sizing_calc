import React, { useState } from 'react';
import { adjustmentFactors } from '../constants/adjustmentFactors';  // Constants for adjustment based on body shape and activity
import { validationRules } from '../constants/validationRules';  // Validation rules for user inputs
import { bodyShapeData } from '../constants/bodyShapeData'; // Corrected import for bodyShapeData

// Function outside the component to make it exportable
export const calculateMeasurements = (measurements, bodyShapeType = 'average', additionalFactors = {}) => {
  let results = {};
  let weightedResults = {};
  let totalWeight = 0;

  console.log('Starting calculations with measurements:', measurements);

  // Weight-based calculations
  if (measurements.weight && measurements.height) {
    const weightBased = calculateFromWeight(measurements.weight, measurements.height, bodyShapeType, additionalFactors);
    console.log('Weight-based calculations:', weightBased);
    Object.entries(weightBased).forEach(([key, value]) => {
      weightedResults[key] = (weightedResults[key] || 0) + value * 0.4;
    });
    totalWeight += 0.4;
  }

  // Waist-based calculations
  if (measurements.waist) {
    const waistBased = calculateFromWaist(measurements.waist, bodyShapeType, additionalFactors);
    console.log('Waist-based calculations:', waistBased);
    Object.entries(waistBased).forEach(([key, value]) => {
      weightedResults[key] = (weightedResults[key] || 0) + value * 0.3;
    });
    totalWeight += 0.3;
  }

  // Bust-based calculations
  if (measurements.bust) {
    const bustBased = calculateFromBust(measurements.bust, bodyShapeType, additionalFactors);
    console.log('Bust-based calculations:', bustBased);
    Object.entries(bustBased).forEach(([key, value]) => {
      weightedResults[key] = (weightedResults[key] || 0) + value * 0.15;
    });
    totalWeight += 0.15;
  }

  // Height-based calculations
  if (measurements.height) {
    const heightBased = calculateFromHeight(measurements.height, bodyShapeType, additionalFactors);
    console.log('Height-based calculations:', heightBased);
    Object.entries(heightBased).forEach(([key, value]) => {
      weightedResults[key] = (weightedResults[key] || 0) + value * 0.15;
    });
    totalWeight += 0.15;
  }

  // Average the weighted results
  if (totalWeight > 0) {
    Object.keys(weightedResults).forEach((key) => {
      results[key] = weightedResults[key] / totalWeight;
    });
  }

  // Adjust results based on validation and apply adjustments
  results = validateAndAdjustResults(results, measurements, bodyShapeType);
  results.size = getStandardSize(results);
  console.log('Final calculated results:', results);
  return results;
};

// Helper functions, remain inside the same file
const calculateFromWeight = (weight, height, bodyShapeType, additionalFactors) => {
  console.log('Calculating from weight:', weight);
  return {
    waist: weight * 0.4,
    bust: weight * 0.3,
    hips: weight * 0.2,
    shoulder: weight * 0.1,
    upperArm: weight * 0.05,
    thigh: weight * 0.1,
  };
};

const calculateFromWaist = (waist, bodyShapeType, additionalFactors) => {
  console.log('Calculating from waist:', waist);
  return {
    waist: waist * 0.8,
    bust: waist * 0.5,
    hips: waist * 0.7,
    shoulder: waist * 0.3,
    upperArm: waist * 0.2,
    thigh: waist * 0.4,
  };
};

const calculateFromBust = (bust, bodyShapeType, additionalFactors) => {
  console.log('Calculating from bust:', bust);
  return {
    waist: bust * 0.5,
    bust: bust * 1.0,
    hips: bust * 0.7,
    shoulder: bust * 0.4,
    upperArm: bust * 0.2,
    thigh: bust * 0.3,
  };
};

const calculateFromHeight = (height, bodyShapeType, additionalFactors) => {
  console.log('Calculating from height:', height);
  return {
    waist: height * 0.2,
    bust: height * 0.1,
    hips: height * 0.2,
    shoulder: height * 0.3,
    upperArm: height * 0.1,
    thigh: height * 0.1,
  };
};

// Your PrimaryCalculations component remains as is
const PrimaryCalculations = () => {
  const [results, setResults] = useState(null);
  const [measurements, setMeasurements] = useState({
    weight: 70,
    height: 170,
    waist: 30,
    bust: 34,
    hips: 36,
    age: 30,
  });
  const [bodyShapeType, setBodyShapeType] = useState('average');
  const [additionalFactors, setAdditionalFactors] = useState({
    activityLevel: 'moderate',
  });
  const [errors, setErrors] = useState([]);

  // Validate inputs using validationRules
  const validateInputs = (measurements) => {
    const errors = [];

    for (let key in validationRules) {
      if (measurements[key]) {
        const value = measurements[key];
        const rule = validationRules[key];

        if (value < rule.min || value > rule.max) {
          errors.push(rule.message);
        }
      } else {
        errors.push(`${key} is required`);
      }
    }

    return errors;
  };

  // Handle the form submission to trigger the calculation
  const handleSubmit = () => {
    console.log('Handling form submission...');
    const validationErrors = validateInputs(measurements);
    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      setErrors(validationErrors);  // Display errors to the user
    } else {
      console.log('Validation passed, proceeding with calculations...');
      const calculatedResults = calculateMeasurements(measurements, bodyShapeType, additionalFactors);
      setResults(calculatedResults);
    }
  };

  return (
    <div>
      <h1>Primary Calculations</h1>
      <div>
        <label>Weight: </label>
        <input
          type="number"
          value={measurements.weight}
          onChange={(e) => setMeasurements({ ...measurements, weight: e.target.value })}
        />
      </div>
      <div>
        <label>Height: </label>
        <input
          type="number"
          value={measurements.height}
          onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
        />
      </div>
      <div>
        <label>Waist: </label>
        <input
          type="number"
          value={measurements.waist}
          onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
        />
      </div>
      <div>
        <label>Bust: </label>
        <input
          type="number"
          value={measurements.bust}
          onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
        />
      </div>
      <div>
        <label>Hips: </label>
        <input
          type="number"
          value={measurements.hips}
          onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          value={measurements.age}
          onChange={(e) => setMeasurements({ ...measurements, age: e.target.value })}
        />
      </div>
      <div>
        <label>Body Shape: </label>
        <select onChange={(e) => setBodyShapeType(e.target.value)} value={bodyShapeType}>
          {Object.keys(bodyShapeData).map((shape, idx) => (
            <option key={idx} value={shape}>
              {shape}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {errors.length > 0 && <ul>{errors.map((err, idx) => <li key={idx}>{err}</li>)}</ul>}
        {results && (
          <div>
            <h2>Calculated Results:</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryCalculations;
