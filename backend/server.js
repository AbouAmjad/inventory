require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const app = express();

app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

const oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await oauthClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (e) {
    throw new Error('Invalid Google token');
  }
}

class GoogleSheets {
  constructor(spreadsheetId, sheetName) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
  }

  async getAuthClient() {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    return auth.getClient();
  }

  async getSheetData() {
    const authClient = await this.getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${this.sheetName}!A:Z`
    });
    
    if (!response.data.values || response.data.values.length === 0) {
      return { headers: [], rows: [] };
    }
    
    const [headers, ...rows] = response.data.values;
    return {
      headers,
      rows: rows.map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        return obj;
      })
    };
  }

  async updateRow(keyColumn, keyValue, updates) {
    const authClient = await this.getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const { headers } = await this.getSheetData();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${this.sheetName}!A:Z`
    });
    
    if (!response.data.values || response.data.values.length < 2) {
      throw new Error('Sheet is empty');
    }
    
    const rows = response.data.values;
    const rowIndex = rows.findIndex((row, i) => 
      i > 0 && row[headers.indexOf(keyColumn)] === keyValue
    );
    
    if (rowIndex === -1) throw new Error(`Row not found for ${keyValue}`);
    
    const rowNumber = rowIndex + 1;
    const updateRange = `${this.sheetName}!A${rowNumber}:ZZ${rowNumber}`;
    
    const currentRow = rows[rowIndex];
    const updatedRow = [...currentRow];
    
    Object.entries(updates).forEach(([key, value]) => {
      const colIndex = headers.indexOf(key);
      if (colIndex !== -1) updatedRow[colIndex] = value.toString();
    });
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [updatedRow] }
    });
  }

  async appendRow(data) {
    const authClient = await this.getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const { headers } = await this.getSheetData();
    
    const newRow = headers.map(header => 
      data[header] !== undefined ? data[header].toString() : ''
    );
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `${this.sheetName}!A:A`,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [newRow] }
    });
  }
}

app.post('/api/login', async (req, res) => {
  try {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);
    
    const personsSheet = new GoogleSheets(
      process.env.SPREADSHEET_ID_PERSONS,
      'Persons'
    );
    
    const { rows: users } = await personsSheet.getSheetData();
    const user = users.find(u => u.email === payload.email);
    
    if (!user) {
      return res.status(403).json({ 
        error: 'User not registered in system. Contact administrator.' 
      });
    }
    
    res.json({
      name: payload.name,
      email: payload.email,
      role: user.role,
      picture: payload.picture
    });
  } catch (e) {
    console.error('Login error:', e);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

app.post('/api/scan', async (req, res) => {
  try {
    const { token, qrData, action, renterId } = req.body;
    const payload = await verifyGoogleToken(token);
    
    const personsSheet = new GoogleSheets(
      process.env.SPREADSHEET_ID_PERSONS,
      'Persons'
    );
    
    const { rows: users } = await personsSheet.getSheetData();
    const employee = users.find(u => u.email === payload.email);
    
    if (!employee || !['owner', 'employee'].includes(employee.role)) {
      return res.status(403).json({ error: 'Unauthorized role' });
    }

    const [prefix, id] = qrData.split(':');
    
    if (prefix === 'ITEM') {
      let itemSheet, sheetName;
      
      if (id.startsWith('PT-')) {
        itemSheet = new GoogleSheets(process.env.SPREADSHEET_ID_POWERTOOLS, 'PowerTools');
        sheetName = 'PowerTools';
      } 
      else if (id.startsWith('CON-')) {
        itemSheet = new GoogleSheets(process.env.SPREADSHEET_ID_CONSUMABLES, 'Consumables');
        sheetName = 'Consumables';
      }
      else {
        return res.status(400).json({ error: 'Unsupported item type' });
      }
      
      const { rows: items } = await itemSheet.getSheetData();
      const item = items.find(i => i.id === id);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      if (action === 'checkout') {
        if (item.status !== 'available') {
          return res.status(400).json({ 
            error: `Tool is currently ${item.status} - cannot checkout` 
          });
        }
        
        await itemSheet.updateRow('id', id, {
          status: 'rented',
          borrower_id: renterId,
          due_date: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]
        });
      }
      else if (action === 'return') {
        await itemSheet.updateRow('id', id, {
          status: 'available',
          borrower_id: '',
          due_date: ''
        });
      }
      
      const logsSheet = new GoogleSheets(
        process.env.SPREADSHEET_ID_LOGS,
        'Logs'
      );
      
      await logsSheet.appendRow({
        timestamp: new Date().toISOString(),
        action,
        item_id: id,
        person_id: renterId || '',
        employee_id: employee.id,
        quantity: 1,
        notes: `Scanned by ${payload.email}`
      });
      
      res.json({ success: true, message: 'Action completed successfully' });
    }
    else {
      res.status(400).json({ error: 'Unsupported QR type' });
    }
  } catch (e) {
    console.error('Scan error:', e);
    res.status(500).json({ error: 'Server error: ' + e.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const { token } = req.query;
    const payload = await verifyGoogleToken(token);
    
    const personsSheet = new GoogleSheets(
      process.env.SPREADSHEET_ID_PERSONS,
      'Persons'
    );
    
    const { rows: users } = await personsSheet.getSheetData();
    const user = users.find(u => u.email === payload.email);
    
    if (!user || !['owner', 'engineer'].includes(user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const toolsSheet = new GoogleSheets(
      process.env.SPREADSHEET_ID_POWERTOOLS,
      'PowerTools'
    );
    
    const consumablesSheet = new GoogleSheets(
      process.env.SPREADSHEET_ID_CONSUMABLES,
      'Consumables'
    );
    
    const [toolsData, consumablesData] = await Promise.all([
      toolsSheet.getSheetData(),
      consumablesSheet.getSheetData()
    ]);
    
    res.json({
      power_tools: toolsData.rows,
      consumables: consumablesData.rows
    });
  } catch (e) {
    console.error('Inventory error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});