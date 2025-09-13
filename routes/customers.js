// routes/customers.js
const express = require('express');
const Customer = require('../models/customer');
const { validateCustomerRegistration } = require('../middleware/validation');

const router = express.Router();

// POST /api/customers - Register a new customer
router.post('/', validateCustomerRegistration, async (req, res) => {
    try {
        // Check if email already exists
        const existingCustomer = await Customer.findByEmail(req.body.email);
        
        if (existingCustomer) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Email address is already registered'
            });
        }

        // Create new customer
        const result = await Customer.create(req.body);
        
        // Success response
        res.status(201).json({
            message: result.message,
            customerId: result.customerId
        });

    } catch (error) {
        console.error('Database error:', error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                error: 'Bad Request',
                message: 'Email address is already registered'
            });
        } else {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Failed to register customer due to a database error'
            });
        }
    }
});

// GET /api/customers - Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json({
            count: customers.length,
            customers
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve customers'
        });
    }
});

// GET /api/customers/:id - Get customer by ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        
        if (!customer) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Customer not found'
            });
        }
        
        res.json(customer);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve customer'
        });
    }
});

module.exports = router;