import React, { useState } from 'react';
import { adjustmentFactors } from '../constants/adjustmentFactors'; // Constants for adjustment based on body shape and activity
import { validationRules } from '../constants/validationRules'; // Validation rules for user inputs
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
  results = validateAndAdjustResults(results, measurements, bodyShapeType, additionalFactors);
  results.size = getStandardSize(results);
  console.log('Final calculated results:', results);
  return results;
};

// Helper functions, remain inside the same file
const calculateFromWeight = (weight, height, bodyShapeType, additionalFactors) => {
  console.log('Calculating from weight:', weight);

  // Retrieve body shape ratios from bodyShapeData
  const shapeData = bodyShapeData[bodyShapeType] || {};
  const activityLevelFactor = adjustmentFactors[additionalFactors.activityLevel] || 1;

  const baseResults = {
    waist: weight * (shapeData.waistRatio || 0.4),
    bust: weight * (shapeData.bustRatio || 0.3),
    hips: weight * (shapeData.hipsRatio || 0.2),
    shoulder: weight * 0.1,
    upperArm: weight * 0.05,
    thigh: weight * 0.1,
  };

  // Apply the adjustment factor based on the body shape type or activity level
  return Object.keys(baseResults).reduce((adjustedResults, key) => {
    adjustedResults[key] = baseResults[key] * (additionalFactors[key] || activityLevelFactor);
    return adjustedResults;
  }, {});
};

const calculateFromWaist = (waist, bodyShapeType, additionalFactors) => {
  console.log('Calculating from waist:', waist);
  const shapeData = bodyShapeData[bodyShapeType] || {};
  const activityLevelFactor = adjustmentFactors[additionalFactors.activityLevel] || 1;
  
  return {
    waist: waist * (shapeData.waistRatio || 0.8) * activityLevelFactor,
    bust: waist * 0.5 * activityLevelFactor,
    hips: waist * 0.7 * activityLevelFactor,
    shoulder: waist * 0.3 * activityLevelFactor,
    upperArm: waist * 0.2 * activityLevelFactor,
    thigh: waist * 0.4 * activityLevelFactor,
  };
};

const calculateFromBust = (bust, bodyShapeType, additionalFactors) => {
  console.log('Calculating from bust:', bust);
  const shapeData = bodyShapeData[bodyShapeType] || {};
  const activityLevelFactor = adjustmentFactors[additionalFactors.activityLevel] || 1;
  
  return {
    waist: bust * 0.5 * activityLevelFactor,
    bust: bust * (shapeData.bustRatio || 1.0) * activityLevelFactor,
    hips: bust * 0.7 * activityLevelFactor,
    shoulder: bust * 0.4 * activityLevelFactor,
    upperArm: bust * 0.2 * activityLevelFactor,
    thigh: bust * 0.3 * activityLevelFactor,
  };
};

const calculateFromHeight = (height, bodyShapeType, additionalFactors) => {
  console.log('Calculating from height:', height);
  const shapeData = bodyShapeData[bodyShapeType] || {};
  const activityLevelFactor = adjustmentFactors[additionalFactors.activityLevel] || 1;
  
  return {
    waist: height * 0.2 * activityLevelFactor,
    bust: height * 0.1 * activityLevelFactor,
    hips: height * 0.2 * activityLevelFactor,
    shoulder: height * 0.3 * activityLevelFactor,
    upperArm: height * 0.1 * activityLevelFactor,
    thigh: height * 0.1 * activityLevelFactor,
  };
};

// Function for validation and adjustment based on rules
const validateAndAdjustResults = (results, measurements, bodyShapeType, additionalFactors) => {
  // Apply adjustments based on validation
  return results; // Assuming no changes for now
};

// Function to get standard size based on results
const getStandardSize = (results) => {
  // This could be based on weight/height ratio or other factors
  return 'M';  // Example: returning 'M' for Medium size
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
        <label>Age: </label>
        <input
          type="number"
          value={measurements.age}
          onChange={(e) => setMeasurements({ ...measurements, age: e.target.value })}
        />
      </div>
      <button onClick={handleSubmit}>Calculate</button>

      {errors.length > 0 && (
        <div>
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={{ color: 'red' }}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {results && (
        <div>
          <h3>Results</h3>
          <p>Waist: {results.waist}</p>
          <p>Bust: {results.bust}</p>
          <p>Hips: {results.hips}</p>
          <p>import React, { useState } from 'react';
import { adjustmentFactors } from '../constants/adjustmentFactors.js';
import { validationRules } from '../constants/validationRules.js';
import { bodyShapeData } from '../constants/bodyShapeData.js';

const PrimaryCalculations = () => {
  const [measurements, setMeasurements] = useState({
    waist: 0,
    bust: 0,
    hips: 0,
    shoulder: 0,
    upperArm: 0,
    thigh: 0,
    weight: 0,
    height: 0,
    age: 0,
  });

  const [results, setResults] = useState({});
  
  const applyAdjustments = (calculations, bodyShape, additionalFactors) => {
    if (bodyShape === 'hourglass') {
      calculations.hips *= 1.05;
      calculations.bust *= 1.05;
      calculations.waist *= 0.95;
    } else if (bodyShape === 'pear') {
      calculations.hips *= 1.1;
      calculations.waist *= 1.02;
    }

    if (additionalFactors.age && additionalFactors.age > 50) {
      calculations.thigh *= 0.95;
      calculations.hips *= 0.97;
    }

    if (additionalFactors.activityLevel === 'high') {
      calculations.upperArm *= 1.1;
      calculations.thigh *= 1.1;
    }

    return calculations;
  };

  const validateAndAdjustResults = (results, measurements, bodyShape) => {
    const requiredKeys = ['waist', 'bust', 'hips', 'shoulder', 'upperArm', 'thigh'];
    requiredKeys.forEach(key => {
      if (results[key] === undefined || results[key] === null) {
        console.warn(`Missing value for ${key}. Setting default value.`);
        results[key] = measurements[key] || 0;
      }
    });

    if (bodyShape === 'hourglass') {
      results.waist *= 0.95;
    } else if (bodyShape === 'pear') {
      results.hips *= 1.1;
    }

    if (results.waist < 50) {
      results.waist = Math.max(results.waist, 55);
    }

    if (measurements.age && measurements.age > 50) {
      results.thigh *= 0.95;
    }

    return results;
  };

  const getStandardSize = (measurements) => {
    const { waist, bust, hips } = measurements;

    if (waist <= 28 && bust <= 34 && hips <= 36) {
      return 'S';
    } else if (waist <= 32 && bust <= 38 && hips <= 40) {
      return 'M';
    } else if (waist <= 36 && bust <= 42 && hips <= 44) {
      return 'L';
    } else {
      return 'XL';
    }
  };

  const calculateMeasurements = (measurements, bodyShape = 'average', additionalFactors = {}) => {
    let results = {};
    let weightedResults = {};
    let totalWeight = 0;

    if (measurements.weight && measurements.height) {
      const weightBased = calculateFromWeight(measurements.weight, measurements.height, bodyShape, additionalFactors);
      Object.entries(weightBased).forEach(([key, value]) => {
        weightedResults[key] = (weightedResults[key] || 0) + value * 0.4;
      });
      totalWeight += 0.4;
    }

    if (measurements.waist) {
      const waistBased = calculateFromWaist(measurements.waist, bodyShape, additionalFactors);
      Object.entries(waistBased).forEach(([key, value]) => {
        weightedResults[key] = (weightedResults[key] || 0) + value * 0.3;
      });
      totalWeight += 0.3;
    }

    if (measurements.bust) {
      const bustBased = calculateFromBust(measurements.bust, bodyShape, additionalFactors);
      Object.entries(bustBased).forEach(([key, value]) => {
        weightedResults[key] = (weightedResults[key] || 0) + value * 0.15;
      });
      totalWeight += 0.15;
    }

    if (measurements.height) {
      const heightBased = calculateFromHeight(measurements.height, bodyShape, additionalFactors);
      Object.entries(heightBased).forEach(([key, value]) => {
        weightedResults[key] = (weightedResults[key] || 0) + value * 0.15;
      });
      totalWeight += 0.15;
    }

    if (totalWeight > 0) {
      Object.keys(weightedResults).forEach(key => {
        results[key] = weightedResults[key] / totalWeight;
      });
    }

    if (measurements.height && measurements.weight && additionalFactors.age) {
      const correlations = calculateHeightWeightAgeCorrelations(measurements.height, measurements.weight, additionalFactors.age);
      
      Object.keys(results).forEach(key => {
        if (correlations.measurementModifiers[key]) {
          results[key] *= correlations.measurementModifiers[key];
        }
      });
      
      if (results.height) {
        results.height *= correlations.heightAdjustment;
      }
    }

    results = validateAndAdjustResults(results, measurements, bodyShape);
    results.size = getStandardSize(results);
    return results;
  };

  const calculateHeightWeightAgeCorrelations = (height, weight, age) => {
    const bmi = weight / ((height / 100) ** 2);
    const ageGroup = getAgeGroup(age);

    return {
      expectedWeight: calculateExpectedWeight(height, ageGroup),
      weightAdjustment: getWeightAdjustment(bmi, ageGroup),
      heightAdjustment: getHeightAgeAdjustment(ageGroup),
      measurementModifiers: getAgeBasedModifiers(ageGroup, bmi),
    };
  };

  const getAgeGroup = (age) => {
    if (age < 25) return 'young';
    if (age < 45) return 'middle';
    if (age < 65) return 'mature';
    return 'senior';
  };

  const calculateExpectedWeight = (height, ageGroup) => {
    const baseWeight = (height - 100) * 0.9;
    const ageModifier = {
      young: 0.98,
      middle: 1.0,
      mature: 1.02,
      senior: 1.03,
    }[ageGroup];
    
    return baseWeight * ageModifier;
  };

  const getWeightAdjustment = (bmi, ageGroup) => {
    const ageBmiModifier = {
      young: { min: 18.5, max: 24 },
      middle: { min: 19, max: 25 },
      mature: { min: 20, max: 26 },
      senior: { min: 21, max: 27 },
    }[ageGroup];

    return calculateBmiAdjustment(bmi, ageBmiModifier);
  };

  const calculateBmiAdjustment = (bmi, range) => {
    if (bmi < range.min) {
      return 0.95 + (bmi - range.min) * 0.01;
    }
    if (bmi > range.max) {
      return 1.05 + (bmi - range.max) * 0.015;
    }
    return 1.0;
  };

  const getHeightAgeAdjustment = (ageGroup) => {
    return {
      young: 1.0,
      middle: 0.995,
      mature: 0.99,
      senior: 0.985,
    }[ageGroup];
  };

  const getAgeBasedModifiers = (ageGroup, bmi) => {
    const baseModifiers = {
      young: { bust: 1.0, waist: 1.0, hips: 1.0, shoulder: 1.0, upperArm: 1.0, thigh: 1.0 },
      middle: { bust: 1.02, waist: 1.03, hips: 1.02, shoulder: 0.99, upperArm: 1.02, thigh: 1.02 },
      mature: { bust: 1.03, waist: 1.05, hips: 1.03, shoulder: 0.98, upperArm: 1.03, thigh: 1.03 },
      senior: { bust: 1.04, waist: 1.06, hips: 1.04, shoulder: 0.97, upperArm: 1.04, thigh: 1.04 },
    }[ageGroup];

    return Object.fromEntries(
      Object.entries(baseModifiers).map(([key, value]) => [key, value * (bmi > 30 ? 1.1 : 1)])
    );
  };

  return (
    <div>
      <h1>Primary Calculations</h1>
      <button onClick={() => {
        const calculatedResults = calculateMeasurements(measurements);
        setResults(calculatedResults);
      }}>
        Calculate
      </button>
      <div>
        <h2>Results:</h2>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
};

export default PrimaryCalculations;
Shoulder: {results.shoulder}</p>
          <p>Upper Arm: {results.upperArm}</p>
          <p>Thigh: {results.thigh}</p>
          <p>Size: {results.size}</p>
        </div>
      )}
    </div>
  );
};

export default PrimaryCalculations;
