import React, { useState } from 'react';
import { adjustmentFactors } from '../constants/adjustmentFactors.js';
import { validationRules } from '../constants/validationRules.js';
import { bodyShapeData } from '../constants/bodyShapeData.js';

const PrimaryCalculations = () => {
    const [results, setResults] = useState(null);
    const [measurements, setMeasurements] = useState({
        weight: 70,
        height: 170,
        waist: 30,
        bust: 34,
        hips: 36,
        age: 30
    });
    const [bodyShape, setBodyShape] = useState('average');
    const [additionalFactors, setAdditionalFactors] = useState({
        activityLevel: 'moderate'
    });

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

        results = validateAndAdjustResults(results, measurements, bodyShape);
        results.size = getStandardSize(results);
        return results;
    };

    const calculateFromWeight = (weight, height, bodyShape, additionalFactors) => {
        return {
            waist: weight * 0.4,
            bust: weight * 0.3,
            hips: weight * 0.2,
            shoulder: weight * 0.1,
            upperArm: weight * 0.05,
            thigh: weight * 0.1
        };
    };

    const calculateFromWaist = (waist, bodyShape, additionalFactors) => {
        return {
            waist: waist * 0.8,
            bust: waist * 0.5,
            hips: waist * 0.7,
            shoulder: waist * 0.3,
            upperArm: waist * 0.2,
            thigh: waist * 0.4
        };
    };

    const calculateFromBust = (bust, bodyShape, additionalFactors) => {
        return {
            waist: bust * 0.5,
            bust: bust * 1.0,
            hips: bust * 0.7,
            shoulder: bust * 0.4,
            upperArm: bust * 0.2,
            thigh: bust * 0.3
        };
    };

    const calculateFromHeight = (height, bodyShape, additionalFactors) => {
        return {
            waist: height * 0.2,
            bust: height * 0.1,
            hips: height * 0.2,
            shoulder: height * 0.3,
            upperArm: height * 0.1,
            thigh: height * 0.1
        };
    };

    const handleSubmit = () => {
        const calculatedResults = calculateMeasurements(measurements, bodyShape, additionalFactors);
        setResults(calculatedResults);
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
                <select onChange={(e) => setBodyShape(e.target.value)} value={bodyShape}>
                    <option value="average">Average</option>
                    <option value="hourglass">Hourglass</option>
                    <option value="pear">Pear</option>
                    <option value="apple">Apple</option>
                </select>
            </div>
            <div>
                <label>Activity Level: </label>
                <select
                    onChange={(e) => setAdditionalFactors({ ...additionalFactors, activityLevel: e.target.value })}
                    value={additionalFactors.activityLevel}
                >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button onClick={handleSubmit}>Calculate</button>

            {results && (
                <div>
                    <h2>Calculated Results:</h2>
                    <pre>{JSON.stringify(results, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PrimaryCalculations;
