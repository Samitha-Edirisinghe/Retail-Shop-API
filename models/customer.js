// models/customer.js
const { query } = require('../config/database');

class Customer {
    // Create a new customer
    static async create(customerData) {
        const {
            name, address, email, dateOfBirth, gender, age,
            cardHolderName, cardNumber, expirytDate, cvv, timeStamp
        } = customerData;

        const sql = `
            INSERT INTO customer 
            (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expirytDate, cvv, timeStamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        try {
            const result = await query(sql, [
                name, address, email, dateOfBirth, gender, age,
                cardHolderName, cardNumber, expirytDate, cvv, timeStamp
            ]);
            
            return {
                customerId: result.insertId,
                message: `Customer ${name} has registered successfully`
            };
        } catch (error) {
            throw error;
        }
    }

    // Find customer by email
    static async findByEmail(email) {
        const sql = 'SELECT * FROM customer WHERE email = ?';
        try {
            const results = await query(sql, [email]);
            return results[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Find customer by ID
    static async findById(customerId) {
        const sql = 'SELECT customerId, name, email, dateOfBirth, gender FROM customer WHERE customerId = ?';
        try {
            const results = await query(sql, [customerId]);
            return results[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Get all customers (for testing purposes)
    static async findAll() {
        const sql = 'SELECT customerId, name, email FROM customer ORDER BY createdAt DESC';
        try {
            const results = await query(sql);
            return results;
        } catch (error) {
            throw error;
        }
    }

    // Update customer information
    static async update(customerId, updateData) {
        const fields = Object.keys(updateData);
        const values = Object.values(updateData);
        
        if (fields.length === 0) {
            throw new Error('No fields to update');
        }
        
        const setClause = fields.map(field => `${field} = ?`).join(', ');
        const sql = `UPDATE customer SET ${setClause} WHERE customerId = ?`;
        
        try {
            const result = await query(sql, [...values, customerId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Delete customer
    static async delete(customerId) {
        const sql = 'DELETE FROM customer WHERE customerId = ?';
        try {
            const result = await query(sql, [customerId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Customer;