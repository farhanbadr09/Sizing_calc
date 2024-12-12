import React, { useState, useEffect } from 'react';
import { bodyShapeData } from '../constants/bodyShapeData.js';

const SecondaryCalculations = ({ measurements, bodyShape, additionalFactors }) => {
  const [secondaryMeasurements, setSecondaryMeasurements] = useState({});

  useEffect(() => {
    const calculateSecondaryMeasurements = () => {
      const { height, weight, bust, waist, hips } = measurements;
      const shapeData = bodyShapeData[bodyShape] || bodyShapeData.average;
      let secondary = {};

      if (weight && height) {
        const bmi = weight / ((height / 100) ** 2);
        const adjustmentFactor = getWeightAdjustmentFactor(bmi);
        secondary = {
          shoulder: height * 0.23 * adjustmentFactor * shapeData.adjustments.shoulder,
          upperArm: weight * 0.08 * adjustmentFactor * shapeData.adjustments.upperArm,
          thigh: weight * 0.15 * adjustmentFactor * shapeData.adjustments.thigh,
          inseam: height * 0.45,
          neck: height * 0.18 * adjustmentFactor,
          underbust: height * 0.43 * adjustmentFactor,
          highHip: height * 0.41 * adjustmentFactor,
          crossBack: height * 0.23 * adjustmentFactor,
          armLength: height * 0.31,
          shoulderToWaist: height * 0.24,
        };
      } else if (height) {
        secondary = {
          shoulder: height * 0.23 * shapeData.adjustments.shoulder,
          upperArm: height * 0.08 * shapeData.adjustments.upperArm,
          thigh: height * 0.15 * shapeData.adjustments.thigh,
          inseam: height * 0.45,
          neck: height * 0.18,
          underbust: height * 0.43,
          highHip: height * 0.41,
          crossBack: height * 0.23,
          armLength: height * 0.31,
          shoulderToWaist: height * 0.24,
        };
      }

      // Apply age-based adjustments if available
      if (measurements.age) {
        const ageModifiers = getAgeBasedModifiers(getAgeGroup(measurements.age), bmi || 22);
        Object.keys(secondary).forEach(key => {
          if (ageModifiers[key]) {
            secondary[key] *= ageModifiers[key];
          }
        });
      }

      setSecondaryMeasurements(applyAdjustments(secondary, bodyShape, additionalFactors));
    };

    calculateSecondaryMeasurements();
  }, [measurements, bodyShape, additionalFactors]);

  const getWeightAdjustmentFactor = (bmi) => {
    // Example: Adjust factor based on BMI categories (placeholder)
    if (bmi < 18.5) { 
      return 0.9; // Underweight
    } else if (bmi >= 18.5 && bmi < 25) {
      return 1; // Normal weight
    } else if (bmi >= 25 && bmi < 30) {
      return 1.1; // Overweight
    } else {
      return 1.2; // Obese
    }
  };

  const getAgeGroup = (age) => {
    if (age < 25) {
      return 'youngAdult';
    } else if (age >= 25 && age < 50) {
      return 'middleAged';
    } else {
      return 'senior';
    }
  };

  const getAgeBasedModifiers = (ageGroup, bmi) => {
    let modifiers = {};

    switch (ageGroup) {
      case 'youngAdult':
        // Example: Slight adjustments for young adults
        modifiers = {
          shoulder: 1.02, 
          upperArm: 1, 
          thigh: 0.98 
        };
        break;
      case 'middleAged':
        // Example: Minor adjustments for middle-aged individuals
        modifiers = {
          shoulder: 1, 
          upperArm: 1.05, 
          thigh: 1.02 
        };
        break;
      case 'senior':
        // Example: More significant adjustments for seniors
        modifiers = {
          shoulder: 0.98, 
          upperArm: 1.1, 
          thigh: 1.05 
        };
        break;
      default:
        modifiers = {};
    }

    // Apply BMI-based adjustments within each age group (example)
    if (bmi < 18.5) { 
      Object.keys(modifiers).forEach(key => modifiers[key] *= 0.95); 
    } else if (bmi >= 25) {
      Object.keys(modifiers).forEach(key => modifiers[key] *= 1.05); 
    }

    return modifiers;
  };

  const applyAdjustments = (secondary, bodyShape, additionalFactors) => {
    // Example: Custom adjustments (placeholder)
    if (bodyShape === 'Pear') {
      secondary.hips *= 1.05; 
    } else if (bodyShape === 'Apple') {
      secondary.waist *= 1.03; 
    } 

    // Add more custom adjustment logic here

    return secondary;
  };

  return (
    <div>
      <h2>Secondary Measurements</h2>
      <ul>
        <li>Shoulder: {secondaryMeasurements.shoulder?.toFixed(2)} cm</li>
        <li>Upper Arm: {secondaryMeasurements.upperArm?.toFixed(2)} cm</li>
        <li>Thigh: {secondaryMeasurements.thigh?.toFixed(2)} cm</li>
        <li>Inseam: {secondaryMeasurements.inseam?.toFixed(2)} cm</li>
        <li>Neck: {secondaryMeasurements.neck?.toFixed(2)} cm</li>
        <li>Underbust: {secondaryMeasurements.underbust?.toFixed(2)} cm</li>
        <li>High Hip: {secondaryMeasurements.highHip?.toFixed(2)} cm</li>
        <li>Cross Back: {secondaryMeasurements.crossBack?.toFixed(2)} cm</li>
        <li>Arm Length: {secondaryMeasurements.armLength?.toFixed(2)} cm</li>
        <li>Shoulder to Waist: {secondaryMeasurements.shoulderToWaist?.toFixed(2)} cm</li>
      </ul>
    </div>
  );
};

export default SecondaryCalculations;