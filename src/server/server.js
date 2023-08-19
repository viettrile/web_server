// server/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// MySQL configuration
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '210101', 
  database: 'kiemnhanhang', 
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(cors());

// API endpoint to save imported data to the database
app.post('/api/saveData', (req, res) => {
  // Process and save the data from the Excel file to the corresponding tables in the database
  // Replace the following code with your actual logic to handle data and save it to the database
  const importData = req.body.importData;
  const exportData = req.body.exportData;

  // Example: Save importData to the import_product table
  const importQuery = 'INSERT INTO import_product (id_product, quantity, ...) VALUES (?, ?, ...)';
  connection.query(importQuery, [...importData], (err, result) => {
    if (err) {
      console.error('Error saving import data:', err);
      res.status(500).json({ error: 'Error saving import data' });
    } else {
      // Example: Save exportData to the export_product table
      const exportQuery = 'INSERT INTO export_product (id_product, quantity, ...) VALUES (?, ?, ...)';
      connection.query(exportQuery, [...exportData], (err, result) => {
        if (err) {
          console.error('Error saving export data:', err);
          res.status(500).json({ error: 'Error saving export data' });
        } else {
          res.status(200).json({ message: 'Data saved successfully' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
