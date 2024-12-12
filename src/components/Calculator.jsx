import React, { useState, useEffect } from "react";

const SizeCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [bust, setBust] = useState("");
  const [bodyShape, setBodyShape] = useState("average");
  const [age, setAge] = useState("18-24");
  const [bodyType, setBodyType] = useState("average");
  const [isLoading, setIsLoading] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(0); 
  const [errorMessage, setErrorMessage] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [calculatedMeasurements, setCalculatedMeasurements] = useState({});

  useEffect(() => {
    // Calculate BMI if height and weight are available
    if (height && weight) {
      const heightInMeters = height * 0.0254; // Convert inches to meters
      const bmi = weight / (heightInMeters * heightInMeters);
      setBmi(bmi.toFixed(2));

      // Determine BMI category
      if (bmi < 18.5) {
        setBmiCategory("Underweight");
      } else if (bmi >= 18.5 && bmi < 25) {
        setBmiCategory("Normal");
      } else if (bmi >= 25 && bmi < 30) {
        setBmiCategory("Overweight");
      } else {
        setBmiCategory("Obese");
      }
    }
  }, [height, weight]);

  const handleCalculate = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setResultsVisible(false);

    // Basic input validation
    if (!height || !weight || !waist || !bust) {
      setErrorMessage("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call or complex calculation logic
      const calculatedData = await calculateMeasurements(
        height,
        weight,
        waist,
        bust,
        bodyShape,
        age,
        bodyType
      );

      setCalculatedMeasurements(calculatedData);
      setResultsVisible(true);
    } catch (error) {
      console.error("Error calculating measurements:", error);
      setErrorMessage("An error occurred while calculating measurements.");
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for calculation logic (replace with actual implementation)
  const calculateMeasurements = async (
    height,
    weight,
    waist,
    bust,
    bodyShape,
    age,
    bodyType
  ) => {
    // Your complex calculation logic here
    // ...

    return {
      bust: "34",
      waist: "28",
      hips: "36",
      shoulder: "16",
      upperArm: "12",
      thigh: "22",
      inseam: "32",
      // ... other calculated values
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          Size Calculator
        </h1>

        <div
          id="errorMessages"
          className={`alert alert-error mb-6 ${errorMessage ? "" : "hidden"}`}
        >
          {errorMessage}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Input Measurements
            </h2>

            {/* Input fields */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Input Measurements
              </h2>

              <div className="input-group">
                <label>Height (inches)</label>
                <div className="text-sm text-gray-500 mb-1">
                  Valid range: 58-78 inches
                </div>
                <input
                  type="number"
                  id="height"
                  className="input-field"
                  placeholder="Enter height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Weight (kg)</label>
                <div className="text-sm text-gray-500 mb-1">
                  Valid range: 35-150 kg
                </div>
                <input
                  type="number"
                  id="weight"
                  className="input-field"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Waist (inches)</label>
                <div className="text-sm text-gray-500 mb-1">
                  Valid range: 23-50 inches
                </div>
                <input
                  type="number"
                  id="waist"
                  className="input-field"
                  placeholder="Enter waist"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Bust (inches)</label>
                <div className="text-sm text-gray-500 mb-1">
                  Valid range: 30-60 inches
                </div>
                <input
                  type="number"
                  id="bust"
                  className="input-field"
                  placeholder="Enter bust"
                  value={bust}
                  onChange={(e) => setBust(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Body Shape</label>
                <select
                  id="bodyShape"
                  className="input-field"
                  value={bodyShape}
                  onChange={(e) => setBodyShape(e.target.value)}
                >
                  <option value="average">Average</option>
                  <option value="hourglass">Hourglass</option>
                  <option value="pear">Pear</option>
                  <option value="apple">Apple</option>
                  <option value="rectangle">Rectangle</option>
                </select>
              </div>

              <div className="input-group">
                <label>Age Group</label>
                <select
                  id="age"
                  className="input-field"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                >
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>

              <div className="input-group">
                <label>Body Type</label>
                <select
                  id="bodyType"
                  className="input-field"
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                >
                  <option value="average">Average/Mesomorph</option>
                  <option value="ectomorph">Slim/Ectomorph</option>
                  <option value="endomorph">Full/Endomorph</option>
                </select>
              </div>
            </div>

            <button
              id="calculateButton"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleCalculate}
            >
              Calculate Measurements
            </button>
          </div>

          <div
            id="results"
            className={`fade-in ${resultsVisible ? "" : "hidden"}`}
          >
            {/* BMI Information */}
            <div id="bmi-info" className={`alert mb-4 ${bmi ? "" : "hidden"}`}>
              <div className="font-bold text-lg mb-2">BMI Information</div>
              <div id="bmi-value" className="text-xl font-bold mb-2">
                {bmi}
              </div>
              <div id="bmi-category" className="text-sm">
                {bmiCategory}
              </div>
            </div>

            <div className="measurements-section">
              <h3 className="section-title">Primary Measurements</h3>
              <div className="measurement-grid">
                <div className="result-box">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Bust
                  </div>
                  <div
                    id="result-bust"
                    className="text-xl font-bold text-gray-800"
                  >
                    {calculatedMeasurements.bust || "-"}
                  </div>
                </div>
                <div className="result-box">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Waist
                  </div>
                  <div
                    id="result-waist"
                    className="text-xl font-bold text-gray-800"
                  >
                    {calculatedMeasurements.waist || "-"}
                  </div>
                </div>
                <div className="result-box">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Hips
                  </div>
                  <div
                    id="result-hips"
                    className="text-xl font-bold text-gray-800"
                  >
                    {calculatedMeasurements.hips || "-"}
                  </div>
                </div>
              </div>
            </div>

            <div className="measurements-section">
              <h3 className="section-title">Secondary Measurements</h3>
              <div className="measurement-grid">
                <div className="result-box">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Shoulder Width
                  </div>
                  <div
                    id="result-shoulder"
                    className="text-xl font-bold text-gray-800"
                  >
                    {calculatedMeasurements.shoulder || "-"}
                  </div>
                </div>
                <div className="result-box">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Upper Arm
                  </div>
                  <div
                    id="result-upperarm"
                    className="text-xl font-bold text-gray-800"
                  >
                    {calculatedMeasurements.upperArm || "-"}
                  </div>
                </div>
                <div className="result-box">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Thigh
                  </div>
                  <div
                    id="result-thigh"
                    className="text-xl font-bold text-gray-800"
                  >
                    {calculatedMeasurements.thigh || "-"}
                  </div>
                </div>
                <div className="result-box">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Inseam
                  </div>
                  <div
                    id="result-inseam"
                    className="text-xl font-bold text-gray-800"
                  >
                    {calculatedMeasurements.inseam || "-"}
                  </div>
                </div>
              </div>
            </div>
            <div id="confidence-alert" className="alert mb-4">
              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${confidenceLevel}%` }}
                ></div>
              </div>
              <p>Confidence Level: {confidenceLevel}%</p>
            </div>

            <div
              id="warnings"
              className="alert alert-warning mb-4"
              style={{ display: warnings.length > 0 ? "block" : "none" }}
            >
              <h5>Warnings:</h5>
              <ul>
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>

            <div id="size-prediction" className="alert alert-info mb-4">
              <h5>Recommended Size:</h5>
              <p>{recommendedSize}</p>
            </div>

            <div id="proportions" className="alert alert-info">
              <h5>Body Proportions:</h5>
              <p>{bodyProportions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeCalculator;
