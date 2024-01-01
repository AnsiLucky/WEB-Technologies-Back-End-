const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// JSON file to store BMI history
const historyFilePath = path.join(__dirname, '../db/bmiHistory.json');

function readHistory() {
  try {
    const historyData = fs.readFileSync(historyFilePath, "utf8");
    return JSON.parse(historyData);
  } catch (error) {
    return [];
  }
}

// Route to get BMI history
router.route('/history')
.get((req, res) => {
  res.sendFile(path.join(__dirname, '../views/history.html'));
})
.post((req, res) => {
  try {
    res.status(200).json(readHistory());
  } catch (error) {
    console.log(error);
    res.send("The error occurs");
  }
});

module.exports = router;