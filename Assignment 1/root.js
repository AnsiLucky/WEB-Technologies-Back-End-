const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bmiRoutes = require('./routes/bmiRoutes');

const app = express();

// Body parser middleware to handle POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Using the BMI routes from bmiRoutes.js
app.use('/bmi', bmiRoutes);

// Home route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'bmiCalculator.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
