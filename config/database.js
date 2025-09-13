// config/database.js
const mysql = require('mysql2');

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'retail_shop_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create the customer table if it doesn't exist
const createCustomerTable = () => {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS customer (
            customerId INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address TEXT NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            dateOfBirth DATE NOT NULL,
            gender ENUM('male', 'female', 'other') NOT NULL,
            age INT NOT NULL,
            cardHolderName VARCHAR(100) NOT NULL,
            cardNumber CHAR(12) NOT NULL,
            expirytDate VARCHAR(7) NOT NULL,
            cvv CHAR(3) NOT NULL,
            timeStamp DATETIME NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    pool.query(createTableSQL, (err) => {
        if (err) {
            console.error('Error creating customer table:', err);
        } else {
            console.log('Customer table ready');
        }
    });
};

// Promise-based query method for async/await usage
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    pool,
    query,
    createCustomerTable
};