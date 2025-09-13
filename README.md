# Retail Shop API - Customer Registration System

## Overview

This project is a Node.js Express API for customer registration in a retail shop system. It provides endpoints to register customers with validation for email addresses and credit card information, storing data in a SQLite database.

## Features

- Customer registration with comprehensive validation
- SQLite database integration for easy setup
- Input validation for:
  - Email format validation
  - Credit card number validation (exactly 12 digits)
  - CVV validation (3-4 digits)
  - Expiry date validation
  - Date of birth validation (must be 18-100 years old)
- Proper HTTP status codes (201 Created, 400 Bad Request)
- Error handling with descriptive error messages
- RESTful API design

## Project Structure

```
retail-shop-api/
├── config/
│   └── database.js      # Database configuration (SQLite)
├── middleware/
│   └── validation.js    # Input validation functions
├── routes/
│   └── customers.js     # Customer-related API endpoints
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
├── retail_shop.db       # SQLite database (created automatically)
└── README.md           # This file
```

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Postman (for testing the API)

## Installation

1. Clone or download the project files to your local machine.

2. Navigate to the project directory:
```bash
cd retail-shop-api
```

3. Install the required dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm start
```

The server will start on port 3000, and the SQLite database will be created automatically.

## API Endpoints

### POST /api/customers
Register a new customer.

**Request Body:**
```json
{
  "name": "Customer Name",
  "address": "Customer Address",
  "email": "customer@example.com",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "age": "33",
  "cardHolderName": "Card Holder Name",
  "cardNumber": "123456789012",
  "expirytDate": "12/2025",
  "cvv": "123",
  "timeStamp": "2023-05-15 10:30:00"
}
```

**Success Response (201 Created):**
```json
{
  "message": "Customer [name] has registered successfully",
  "customerId": 5
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Bad Request",
  "message": "Error description"
}
```

### GET /api/customers
Retrieve all registered customers (for testing purposes).

### GET /api/health
Check API health status.

## Validation Rules

- **Email**: Must be a valid email format (e.g., user@example.com)
- **Credit Card Number**: Exactly 12 digits (no spaces or hyphens)
- **CVV**: 3 or 4 digits
- **Expiry Date**: Must be in MM/YYYY or MM/YY format and not expired
- **Date of Birth**: Must be a valid date and customer must be 18-100 years old
- **Gender**: Must be 'male', 'female', or 'other'
- **All Fields**: Required

## Testing with Postman

1. Open Postman and create a new request
2. Set the request type to POST
3. Enter the URL: `http://localhost:3000/api/customers`
4. Set Headers:
   - Key: `Content-Type`
   - Value: `application/json`
5. In the Body tab, select "raw" and choose "JSON" from the dropdown
6. Enter your request JSON (use the format shown above)
7. Click "Send" and check the response

**Example Request:**
```json
{
  "name": "Your Full Name",
  "address": "123 Main Street, City",
  "email": "test@example.com",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "age": "33",
  "cardHolderName": "Your Name",
  "cardNumber": "123456789012",
  "expirytDate": "12/2025",
  "cvv": "123",
  "timeStamp": "2023-05-15 10:30:00"
}
```

**Note:** Replace "Your Full Name" with your actual name as required for the assessment, but use dummy data for other personal information.

## Error Handling

The API returns appropriate HTTP status codes:
- **201 Created**: Customer registered successfully
- **400 Bad Request**: Validation errors or missing required fields
- **500 Internal Server Error**: Database or server errors

## Database Schema

The customer table has the following structure:
- customerId (INTEGER, Primary Key, Auto-increment)
- name (TEXT, Not Null)
- address (TEXT, Not Null)
- email (TEXT, Unique, Not Null)
- dateOfBirth (TEXT, Not Null)
- gender (TEXT, Not Null)
- age (INTEGER, Not Null)
- cardHolderName (TEXT, Not Null)
- cardNumber (TEXT, Not Null)
- expirytDate (TEXT, Not Null)
- cvv (TEXT, Not Null)
- timeStamp (TEXT, Not Null)
- created_at (DATETIME, Default: Current Timestamp)

## Dependencies

- express: Web framework for Node.js
- sqlite3: SQLite database driver
- body-parser: Middleware for parsing request bodies

## Development

For development with auto-restart on file changes:
```bash
npm run dev
```

## Troubleshooting

1. **Port already in use**: Change the port in server.js or kill the process using port 3000
2. **Database errors**: Ensure you have write permissions in the project directory
3. **Validation errors**: Check the request body format matches the requirements

## Submission Requirements

For the assessment, submit:
1. A screenshot of a successful customer registration using Postman
2. The database.js file
3. The server.js file
4. Ensure your actual name is used in the customer name field

## Security Notes

- This is a development implementation. For production use:
  - Never store sensitive information like CVV in a real system
  - Use environment variables for configuration
  - Implement HTTPS for all communications
  - Add rate limiting to prevent abuse
  - Consider encrypting sensitive customer data

## License

This project is created for educational purposes as part of a course assessment.
