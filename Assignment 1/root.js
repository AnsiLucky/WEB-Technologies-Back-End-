const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const bmiRoutes = require('./routes/bmiRoutes');
const historyRoutes = require('./routes/historyRoutes');

// port declaration and initialization
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

// Body parser middleware to handle POST request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Using the BMI routes from bmiRoutes.js
app.use('/bmi', bmiRoutes);

// Using the HISTORY routes from historyRoutes.js
app.use('/history', historyRoutes);

// Home route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
