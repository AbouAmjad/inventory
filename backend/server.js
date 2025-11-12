const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Google OAuth2 Client
const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Sheets setup
const sheets = google.sheets({ version: 'v4' });
const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Authorized emails (you can also store this in the spreadsheet)
const AUTHORIZED_EMAILS = new Set([
    'admin@yourcompany.com',
    // Add other authorized emails here
]);

// Verify Google ID token and check authorized emails
async function verifyTokenAndAuthorize(idToken) {
    try {
        const ticket = await oAuth2Client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const email = payload.email;
        
        // Check if email is authorized
        if (!AUTHORIZED_EMAILS.has(email)) {
            return null;
        }
        
        return {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            id_token: idToken
        };
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

// Routes
app.post('/api/auth/google', async (req, res) => {
    const { id_token } = req.body;
    
    const user = await verifyTokenAndAuthorize(id_token);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(403).json({ success: false, message: 'Unauthorized email' });
    }
});

// Get inventory items
app.get('/api/inventory', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'No authorization token' });
        }

        const client = await auth.getClient();
        
        const response = await sheets.spreadsheets.values.get({
            auth: client,
            spreadsheetId: SPREADSHEET_ID,
            range: 'Inventory!A2:D',
        });

        const items = response.data.values ? response.data.values.map((row, index) => ({
            id: index + 2, // Row number in sheets (2-based index)
            name: row[0],
            quantity: parseInt(row[1]),
            price: parseFloat(row[2]),
            timestamp: row[3]
        })) : [];

        res.json({ items });
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
});

// Add inventory item
app.post('/api/inventory', async (req, res) => {
    try {
        const { name, quantity, price } = req.body;
        const client = await auth.getClient();
        
        const timestamp = new Date().toISOString();
        const newRow = [name, quantity, price, timestamp];
        
        await sheets.spreadsheets.values.append({
            auth: client,
            spreadsheetId: SPREADSHEET_ID,
            range: 'Inventory!A2:D',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [newRow]
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// Delete inventory item
app.delete('/api/inventory/:id', async (req, res) => {
    try {
        const rowId = parseInt(req.params.id);
        const client = await auth.getClient();
        
        await sheets.spreadsheets.batchUpdate({
            auth: client,
            spreadsheetId: SPREADSHEET_ID,
            resource: {
                requests: [{
                    deleteDimension: {
                        range: {
                            sheetId: 0, // First sheet
                            dimension: 'ROWS',
                            startIndex: rowId - 1,
                            endIndex: rowId
                        }
                    }
                }]
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});