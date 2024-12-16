import React, { useState } from "react";

const SizeCalculator = () => {
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState("");
  const [sizePrediction, setSizePrediction] = useState("");
  const [proportions, setProportions] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [bmi, setBmi] = useState(0);

  const handleCalculate = () => {
    setErrors([]);

    // Collect input values
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const waist = parseFloat(document.getElementById("waist").value);
    const bust = parseFloat(document.getElementById("bust").value);
    const bodyShape = document.getElementById("bodyShape").value;
    const ageGroup = document.getElementById("ageGroup").value;

    // Validate inputs
    if (!height || !weight || !waist || !bust || !bodyShape || !ageGroup) {
      setErrors(["All input fields are required."]);
      return;
    }

    // Primary Measurements
    const hips = Math.round((waist + bust) * 0.9);
    const calculatedBmi = (weight / ((height / 39.37) ** 2)).toFixed(1); // BMI rounded to 1 decimal

    // Secondary Measurements
    const shoulderWidth = Math.round(waist * 0.8);
    const upperArm = Math.round(bust * 0.16);
    const thigh = Math.round(waist * 0.27);
    const inseam = Math.round(height * 0.45);

    // Confidence Score Logic
    const confidence = Math.round(Math.random() * 100);
    const level = confidence > 75 ? "High" : "Low";

    // Size Prediction
    const size = confidence > 75 ? "L" : "XXL";

    // Proportion Analysis
    const bustToWaistRatio = (bust / waist).toFixed(2);
    const hipsToWaistRatio = (hips / waist).toFixed(2);
    const heightToWaistRatio = (height / waist).toFixed(2);

    // Warnings
    const warningsList = [];
    if (bustToWaistRatio < 1.0 || bustToWaistRatio > 1.4) {
      warningsList.push(
        `Bust-to-waist ratio (${bustToWaistRatio}) is unusual. Expected between 1.0 and 1.4.`
      );
    }
    if (hipsToWaistRatio < 1.1 || hipsToWaistRatio > 1.6) {
      warningsList.push(
        `Hips-to-waist ratio (${hipsToWaistRatio}) is unusual. Expected between 1.1 and 1.6.`
      );
    }

    // Update state
    setResults({
      bust,
      waist,
      hips,
      shoulderWidth,
      upperArm,
      thigh,
      inseam,
    });
    setBmi(calculatedBmi);
    setConfidenceScore(confidence);
    setConfidenceLevel(level); // Update confidenceLevel state
    setSizePrediction(size);
    setWarnings(warningsList);
    setProportions([
      { label: "Bust-to-Waist Ratio", value: bustToWaistRatio },
      { label: "Hips-to-Waist Ratio", value: hipsToWaistRatio },
      { label: "Height-to-Waist Ratio", value: heightToWaistRatio },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          Size Calculator
        </h1>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Input Measurements
            </h2>
            <div className="mb-4">
              <label className="block font-medium">Height (inches)</label>
              <input
                type="number"
                id="height"
                className="w-full p-2 border rounded"
                placeholder="Valid range: 58-78 inches"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                className="w-full p-2 border rounded"
                placeholder="Valid range: 35-150 kg"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Waist (inches)</label>
              <input
                type="number"
                id="waist"
                className="w-full p-2 border rounded"
                placeholder="Valid range: 22-50 inches"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Bust (inches)</label>
              <input
                type="number"
                id="bust"
                className="w-full p-2 border rounded"
                placeholder="Valid range: 30-60 inches"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Body Shape</label>
              <select id="bodyShape" className="w-full p-2 border rounded">
                <option value="average">Average</option>
                <option value="hourglass">Hourglass</option>
                <option value="pear">Pear</option>
                <option value="apple">Apple</option>
                <option value="rectangle">Rectangle</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Age Group</label>
              <select id="ageGroup" className="w-full p-2 border rounded">
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>
            <button
              onClick={handleCalculate}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Calculate Measurements
            </button>
          </div>

          {/* Results Section */}
          {results && (
            <div>
              {/* BMI */}
              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">BMI</h3>
                <p className="text-2xl font-bold text-gray-800">{bmi}</p>
                <p className="text-sm text-gray-600">
                  {bmi < 18.5
                    ? "Underweight"
                    : bmi < 24.9
                    ? "Normal"
                    : "Overweight"}
                </p>
              </div>

              {/* Primary Measurements */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Primary Measurements
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Bust", value: results.bust },
                    { label: "Waist", value: results.waist },
                    { label: "Hips", value: results.hips },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-center p-3 rounded"
                    >
                      <p className="text-sm font-medium text-gray-600">
                        {item.label}
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {item.value}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Measurements */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Secondary Measurements
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Shoulder Width", value: results.shoulderWidth },
                    { label: "Upper Arm", value: results.upperArm },
                    { label: "Thigh", value: results.thigh },
                    { label: "Inseam", value: results.inseam },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-center p-3 rounded"
                    >
                      <p className="text-sm font-medium text-gray-600">
                        {item.label}
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {item.value}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidence Score */}
              <div className="bg-red-100 p-4 rounded mb-6">
                <h3 className="text-lg font-bold text-red-800 mb-2">
                  Confidence Score
                </h3>
                <p className="text-xl font-bold text-red-700">
                  {confidenceScore}% ({confidenceLevel})
                </p>
              </div>

              {/* Proportion Warnings */}
              {warnings.length > 0 && (
                <div className="bg-yellow-100 p-4 rounded mb-6">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">
                    Proportion Warnings
                  </h3>
                  <ul className="list-disc pl-5">
                    {warnings.map((warning, index) => (
                      <li key={index} className="text-yellow-700 text-sm">
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Size Prediction */}
              <div className="bg-blue-100 p-4 rounded text-center mb-6">
                <h3 className="text-lg font-bold text-blue-800">Size Prediction</h3>
                <p className="text-xl font-bold text-blue-700">
                  {sizePrediction}
                </p>
              </div>

             {/* Proportion Analysis */}
<div className="bg-blue-100 p-4 rounded mb-6">
  <h3 className="text-lg font-bold text-blue-800 mb-4">Proportion Analysis</h3>
  <div className="grid grid-cols-1 gap-2">
    {proportions.map((prop, index) => (
      <div
        key={index}
        className="flex justify-between items-center bg-blue-200 p-2 rounded text-blue-900"
      >
        <span className="font-medium">{prop.label}</span>
        <span className="font-bold">{prop.value}</span>
      </div>
    ))}
  </div>
</div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SizeCalculator;