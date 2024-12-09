import React, { useState } from 'react';

const SizeCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [bust, setBust] = useState('');
  const [bodyShape, setBodyShape] = useState('average');
  const [age, setAge] = useState('18-24');
  const [bodyType, setBodyType] = useState('average');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    // Validation (for example, you can enhance the validation logic)
    if (height < 58 || height > 78 || weight < 35 || weight > 150 || waist < 23 || waist > 50 || bust < 30 || bust > 60) {
      setError('Please ensure all measurements are within the valid ranges.');
      return;
    }
    // Dummy calculations for demonstration (you can add your logic here)
    const bmi = (weight / (height * height)) * 703;
    const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal' : bmi < 29.9 ? 'Overweight' : 'Obese';

    setResults({
      bmi,
      bmiCategory,
      bust,
      waist,
      // Add other measurements here
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Size Calculator</h1>

        {error && <div className="alert alert-error mb-6 text-red-600">{error}</div>}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Input Measurements</h2>

            <div className="input-group">
              <label>Height (inches)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input-field"
                placeholder="Enter height"
              />
            </div>

            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input-field"
                placeholder="Enter weight"
              />
            </div>

            <div className="input-group">
              <label>Waist (inches)</label>
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="input-field"
                placeholder="Enter waist"
              />
            </div>

            <div className="input-group">
              <label>Bust (inches)</label>
              <input
                type="number"
                value={bust}
                onChange={(e) => setBust(e.target.value)}
                className="input-field"
                placeholder="Enter bust"
              />
            </div>

            <div className="input-group">
              <label>Body Shape</label>
              <select value={bodyShape} onChange={(e) => setBodyShape(e.target.value)} className="input-field">
                <option value="average">Average</option>
                <option value="hourglass">Hourglass</option>
                <option value="pear">Pear</option>
                <option value="apple">Apple</option>
                <option value="rectangle">Rectangle</option>
              </select>
            </div>

            <div className="input-group">
              <label>Age Group</label>
              <select value={age} onChange={(e) => setAge(e.target.value)} className="input-field">
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>

            <div className="input-group">
              <label>Body Type</label>
              <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="input-field">
                <option value="average">Average/Mesomorph</option>
                <option value="ectomorph">Slim/Ectomorph</option>
                <option value="endomorph">Full/Endomorph</option>
              </select>
            </div>

            <button onClick={handleCalculate} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Calculate Measurements
            </button>
          </div>

          {results && (
            <div className="results fade-in">
              <div className="alert mb-4">
                <div className="font-bold text-lg mb-2">BMI Information</div>
                <div className="text-xl font-bold mb-2">{results.bmi}</div>
                <div className="text-sm">{results.bmiCategory}</div>
              </div>

              <div className="measurements-section">
                <h3 className="section-title">Primary Measurements</h3>
                <div className="measurement-grid">
                  <div className="result-box">
                    <div className="text-sm font-medium text-gray-600 mb-1">Bust</div>
                    <div className="text-xl font-bold text-gray-800">{results.bust}</div>
                  </div>
                  <div className="result-box">
                    <div className="text-sm font-medium text-gray-600 mb-1">Waist</div>
                    <div className="text-xl font-bold text-gray-800">{results.waist}</div>
                  </div>
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
