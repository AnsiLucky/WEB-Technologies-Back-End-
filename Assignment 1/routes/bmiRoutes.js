const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// JSON file to store BMI history
const historyFilePath = path.join(__dirname, '../db/bmiHistory.json');

// Route for BMI calculator
router.route('/calculator')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../views/bmiCalculator.html'));
  })
  // POST request to calculate BMI
  .post((req, res) => {
    // Extract data from the POST request
    const { unit, height, weight, age, sex } = req.body;
    const bmiResult = calculateBMI(unit, height, weight).toFixed(2);

    // Store BMI calculation with timestamp
    let historyJson = readHistory();
    const bmiData = {
      sex,
      age,
      unit,
      height,
      weight,
      bmi: bmiResult,
      interpretation: getInterpretation(bmiResult),
      timestamp: new Date().toLocaleString(),
    };
    historyJson.push(bmiData);
    writeHistory(historyJson);

    res.status(200).json({ bmi: bmiResult, status: bmiData.interpretation });
  });

// Function to calculate BMI
function calculateBMI(unit, height, weight) {
  if (unit == "imperial") {
    return 703 * (weight / Math.pow(height, 2));
  }

  return weight / Math.pow(height / 100, 2);
}

// Function to get BMI interpretation
function getInterpretation(bmi) {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal Range';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  }
  return 'Obese';
}

// DB functions
function writeHistory(history) {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), "utf8");
}

function readHistory() {
  try {
    const historyData = fs.readFileSync(historyFilePath, "utf8");
    return JSON.parse(historyData);
  } catch (error) {
    return [];
  }
}

module.exports = router;
