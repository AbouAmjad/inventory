const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { google } = require('googleapis');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const SPREADSHEET_ID = '1rklprvrtxY6DVem_bxpPoCv-O91DsM2OimTwXHPHAfo';

const credentials = JSON.parse(fs.readFileSync('credentials.json'));
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

// ✅ Add new product
app.post('/add', async (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price)
    return res.status(400).send('Missing fields');

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[name, quantity, price, new Date().toLocaleString()]],
      },
    });
    res.send('Product added successfully!');
  } catch (err) {
    res.status(500).send('Error adding product: ' + err.message);
  }
});

// ✅ Get all products
app.get('/list', async (req, res) => {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1:D1000',
    });
    res.json(result.data.values || []);
  } catch (err) {
    res.status(500).send('Error reading sheet: ' + err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Inventory app running at http://localhost:${PORT}`)
);
