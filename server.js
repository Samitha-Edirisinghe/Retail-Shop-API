// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { createCustomerTable } = require('./config/database');
const customerRoutes = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database table
createCustomerTable();

// Routes
app.use('/api/customers', customerRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        message: 'API is running successfully',
        timestamp: new Date().toISOString()
    });
});

// Handle undefined routes
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        message: 'The requested API endpoint does not exist'
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: 'An unexpected error occurred on the server'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/api/health`);
});

module.exports = app;