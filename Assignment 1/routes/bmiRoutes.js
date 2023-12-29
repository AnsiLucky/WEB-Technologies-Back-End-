const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Array to store BMI history
let bmiHistory = [];

// Route for BMI calculator
router.route('/calculator')
  .get((req, res) => {
    res.status(400).header('Allow', 'POST').send('This method not allowed');
  })
  // POST request to calculate BMI
  .post((req, res) => {
    // Extract data from the POST request
    const { unit, height, weight, age } = req.body;
    const bmiResult = calculateBMI(unit, height, weight);

    // Store BMI calculation with timestamp
    const timestamp = new Date().toLocaleString();
    const bmiData = {
      unit,
      height,
      weight,
      age,
      bmi: bmiResult,
      timestamp,
      interpretation: getInterpretation(bmiResult), // Get BMI interpretation
    };
    bmiHistory.push(bmiData);

    res.status(200).json({ bmi: bmiResult, status: bmiData.interpretation });
  });

// Route to get BMI history
router.get('/history', (req, res) => {
  res.status(200).json(bmiHistory);
});

// Function to calculate BMI (replace this with your actual BMI calculation logic)
function calculateBMI(unit, height, weight) {
  if (unit == "inches") {
    return 703 * (weight / Math.pow(height, 2));
  }

  return weight / Math.pow(height / 100, 2);
}

// Function to get BMI interpretation (replace this with your interpretation logic)
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

module.exports = router;
