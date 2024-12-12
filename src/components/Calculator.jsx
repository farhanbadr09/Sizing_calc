import React, { useState } from 'react';

const SizeCalculator = () => {
    const [results, setResults] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bmi, setBmi] = useState(null);
    const [confidenceScore, setConfidenceScore] = useState(0);
    const [confidenceLevel, setConfidenceLevel] = useState('');
    const [sizePrediction, setSizePrediction] = useState('');
    const [proportions, setProportions] = useState('');

    const handleCalculate = () => {
        setIsLoading(true);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const waist = parseFloat(document.getElementById('waist').value);
        const bust = parseFloat(document.getElementById('bust').value);
        const bodyShape = document.getElementById('bodyShape').value;
        const age = document.getElementById('age').value;
        const bodyType = document.getElementById('bodyType').value;

        // Dummy calculation logic, replace with your actual calculation logic
        const bmiValue = weight / ((height / 39.37) ** 2); // Converting height to meters for BMI calculation
        const confidence = Math.random() * 100; // Random confidence score for illustration
        const level = confidence > 75 ? 'high' : 'low';
        const prediction = 'M'; // Placeholder for size prediction
        const proportionsResult = 'Hourglass'; // Placeholder for body proportions

        // Set results and confidence level
        setResults({ bmi: bmiValue, waist, bust });
        setBmi(bmiValue);
        setConfidenceScore(confidence);
        setConfidenceLevel(level);
        setSizePrediction(prediction);
        setProportions(proportionsResult);
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Loading Overlay */}
            {isLoading && (
                <div id="loadingOverlay" className="loading">
                    <div className="flex items-center">
                        <div className="loading-spinner"></div>
                        <div className="text-xl font-bold text-gray-700">Calculating...</div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Size Calculator</h1>

                    {/* Error Message */}
                    <div id="errorMessages" className="alert alert-error mb-6" style={{ display: errors.length > 0 ? 'block' : 'none' }}>
                        {errors.map((error, index) => (
                            <div key={index} className="text-red-500">{error}</div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Input Measurements</h2>

                            {/* Input fields */}
                            <div className="input-group">
                                <label>Height (inches)</label>
                                <input type="number" id="height" className="input-field" placeholder="Enter height" />
                            </div>

                            <div className="input-group">
                                <label>Weight (kg)</label>
                                <input type="number" id="weight" className="input-field" placeholder="Enter weight" />
                            </div>

                            <div className="input-group">
                                <label>Waist (inches)</label>
                                <input type="number" id="waist" className="input-field" placeholder="Enter waist" />
                            </div>

                            <div className="input-group">
                                <label>Bust (inches)</label>
                                <input type="number" id="bust" className="input-field" placeholder="Enter bust" />
                            </div>

                            <div className="input-group">
                                <label>Body Shape</label>
                                <select id="bodyShape" className="input-field">
                                    <option value="average">Average</option>
                                    <option value="hourglass">Hourglass</option>
                                    <option value="pear">Pear</option>
                                    <option value="apple">Apple</option>
                                    <option value="rectangle">Rectangle</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Age Group</label>
                                <select id="age" className="input-field">
                                    <option value="18-24">18-24</option>
                                    <option value="25-34">25-34</option>
                                    <option value="35-44">35-44</option>
                                    <option value="45-54">45-54</option>
                                    <option value="55+">55+</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Body Type</label>
                                <select id="bodyType" className="input-field">
                                    <option value="average">Average/Mesomorph</option>
                                    <option value="ectomorph">Slim/Ectomorph</option>
                                    <option value="endomorph">Full/Endomorph</option>
                                </select>
                            </div>

                            <button onClick={handleCalculate} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Calculate Measurements
                            </button>
                        </div>

                        {/* Results Section */}
                        {results && (
                            <div id="results" className="fade-in">
                                {/* BMI Info */}
                                {bmi && (
                                    <div id="bmi-info" className="alert mb-4">
                                        <div className="font-bold text-lg mb-2">BMI Information</div>
                                        <div id="bmi-value" className="text-xl font-bold mb-2">{bmi.toFixed(2)}</div>
                                        <div id="bmi-category" className="text-sm">{bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal' : 'Overweight'}</div>
                                    </div>
                                )}

                                {/* Primary Measurements */}
                                <div className="measurements-section">
                                    <h3 className="section-title">Primary Measurements</h3>
                                    <div className="measurement-grid">
                                        <div className="result-box">
                                            <div className="text-sm font-medium text-gray-600 mb-1">Bust</div>
                                            <div id="result-bust" className="text-xl font-bold text-gray-800">{results.bust || '-'}</div>
                                        </div>
                                        <div className="result-box">
                                            <div className="text-sm font-medium text-gray-600 mb-1">Waist</div>
                                            <div id="result-waist" className="text-xl font-bold text-gray-800">{results.waist || '-'}</div>
                                        </div>
                                        <div className="result-box">
                                            <div className="text-sm font-medium text-gray-600 mb-1">Hips</div>
                                            <div id="result-waist" className="text-xl font-bold text-gray-800">{results.hips || '-'}</div>
                                        </div>
                                    </div>
 
                                </div>
                                <div className="measurements-section">
            <h3 className="section-title">Secondary Measurements</h3>
            <div className="measurement-grid">
                <div className="result-box">
                    <div className="text-sm font-medium text-gray-600 mb-1">Shoulder Width</div>
                    <div id="result-shoulder" className="text-xl font-bold text-gray-800">-</div>
                </div>
                <div className="result-box">
                    <div className="text-sm font-medium text-gray-600 mb-1">Upper Arm</div>
                    <div id="result-upperarm" className="text-xl font-bold text-gray-800">-</div>
                </div>
                <div className="result-box">
                    <div className="text-sm font-medium text-gray-600 mb-1">Thigh</div>
                    <div id="result-thigh" className="text-xl font-bold text-gray-800">-</div>
                </div>
                <div className="result-box">
                    <div className="text-sm font-medium text-gray-600 mb-1">Inseam</div>
                    <div id="result-inseam" className="text-xl font-bold text-gray-800">-</div>
                </div>
            </div>
        </div>
                                {/* Confidence Bar */}
                                {confidenceScore && (
                                    <div id="confidence-alert" className="alert mb-4">
                                        <div className="confidence-bar">
                                            <div className="confidence-fill" style={{ width: `${confidenceScore}%` }}></div>
                                        </div>
                                    </div>
                                )}

                                {/* Size Prediction */}
                                {sizePrediction && (
                                    <div id="size-prediction" className="alert alert-info mb-4">
                                        Predicted Size: {sizePrediction}
                                    </div>
                                )}

                                {/* Body Proportions */}
                                {proportions && (
                                    <div id="proportions" className="alert alert-info">
                                        Body Proportions: {proportions}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SizeCalculator;
